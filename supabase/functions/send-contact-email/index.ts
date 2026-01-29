import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

// Rate limit settings
const RATE_LIMIT_MAX_REQUESTS = 5; // Max requests per time window
const RATE_LIMIT_WINDOW_HOURS = 1; // Time window in hours

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  company?: string;
  telegram?: string;
  teams?: string;
  message: string;
}

// Escape HTML to prevent XSS attacks
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Get client IP from request headers
function getClientIP(req: Request): string {
  // Try various headers that might contain the real IP
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(",")[0].trim();
  }
  
  const realIP = req.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }
  
  // Fallback to a hash of user-agent + other headers for some uniqueness
  const userAgent = req.headers.get("user-agent") || "unknown";
  return `ua-${userAgent.substring(0, 50)}`;
}

// Check rate limit for an IP address
async function checkRateLimit(supabase: any, ipAddress: string): Promise<{ allowed: boolean; remaining: number }> {
  const windowStart = new Date();
  windowStart.setHours(windowStart.getHours() - RATE_LIMIT_WINDOW_HOURS);
  
  // Count recent requests from this IP
  const { count, error } = await supabase
    .from("contact_rate_limits")
    .select("*", { count: "exact", head: true })
    .eq("ip_address", ipAddress)
    .gte("created_at", windowStart.toISOString());
  
  if (error) {
    console.error("Rate limit check error:", error);
    // On error, allow the request but log it
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS };
  }
  
  const requestCount = count || 0;
  const remaining = Math.max(0, RATE_LIMIT_MAX_REQUESTS - requestCount);
  
  return {
    allowed: requestCount < RATE_LIMIT_MAX_REQUESTS,
    remaining
  };
}

// Record a request for rate limiting
async function recordRequest(supabase: any, ipAddress: string): Promise<void> {
  const { error } = await supabase
    .from("contact_rate_limits")
    .insert({ ip_address: ipAddress });
  
  if (error) {
    console.error("Failed to record rate limit:", error);
  }
  
  // Occasionally clean up old entries (1% chance per request)
  if (Math.random() < 0.01) {
    await supabase.rpc("cleanup_old_rate_limits");
  }
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      throw new Error("Email service is not configured");
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error("Supabase credentials not configured");
      throw new Error("Service configuration error");
    }

    // Create Supabase client with service role for rate limiting
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    // Get client IP and check rate limit
    const clientIP = getClientIP(req);
    const { allowed, remaining } = await checkRateLimit(supabase, clientIP);
    
    if (!allowed) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json",
            "Retry-After": "3600",
            "X-RateLimit-Remaining": "0"
          } 
        }
      );
    }

    const { name, email, company, telegram, teams, message }: ContactRequest = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize all user inputs to prevent XSS
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = company ? escapeHtml(company) : "";
    const safeTelegram = telegram ? escapeHtml(telegram) : "";
    const safeTeams = teams ? escapeHtml(teams) : "";
    const safeMessage = escapeHtml(message);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Partnerstar Contact <onboarding@resend.dev>",
        to: ["partners@partnerstar.com"],
        subject: `New Partnership Inquiry from ${safeName}`,
        html: `
          <h2>New Partnership Inquiry</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          ${safeCompany ? `<p><strong>Company/Website:</strong> ${safeCompany}</p>` : ""}
          ${safeTelegram ? `<p><strong>Telegram:</strong> ${safeTelegram}</p>` : ""}
          ${safeTeams ? `<p><strong>Microsoft Teams:</strong> ${safeTeams}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${safeMessage.replace(/\n/g, "<br>")}</p>
        `,
        reply_to: email,
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Resend API error:", errorData);
      throw new Error("Failed to send email");
    }

    // Record this request for rate limiting (only on success)
    await recordRequest(supabase, clientIP);

    const data = await res.json();
    console.log("Email sent successfully:", data);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      { 
        status: 200, 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json",
          "X-RateLimit-Remaining": String(remaining - 1)
        } 
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send email" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
