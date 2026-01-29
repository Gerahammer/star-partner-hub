-- Create a rate limiting table for tracking contact form submissions
CREATE TABLE IF NOT EXISTS public.contact_rate_limits (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    ip_address text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create an index for faster IP lookups
CREATE INDEX idx_contact_rate_limits_ip_created ON public.contact_rate_limits (ip_address, created_at DESC);

-- Enable RLS but allow the edge function (service role) to manage it
ALTER TABLE public.contact_rate_limits ENABLE ROW LEVEL SECURITY;

-- No public access - only service role can access this table
-- The edge function uses service role key so it can bypass RLS

-- Create a function to clean up old rate limit entries (older than 1 hour)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    DELETE FROM public.contact_rate_limits 
    WHERE created_at < now() - interval '1 hour';
END;
$$;