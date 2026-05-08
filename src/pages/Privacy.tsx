import { useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Privacy = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Privacy Policy | Partnerstar";
    const meta = document.querySelector('meta[name="description"]');
    const previousDesc = meta?.getAttribute("content") ?? "";
    meta?.setAttribute(
      "content",
      "Partnerstar privacy policy — how we collect, use, and protect affiliate data under GDPR."
    );
    return () => {
      document.title = previousTitle;
      if (previousDesc) meta?.setAttribute("content", previousDesc);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-6xl text-foreground mb-8">
              PRIVACY <span className="text-gradient-gold">POLICY</span>
            </h1>

            <div className="prose prose-invert prose-lg max-w-none space-y-8">
              <section>
                <h2 className="font-display text-3xl text-foreground mb-4">Introduction</h2>
                <p className="text-muted-foreground">
                  Partnerstar (referred to below as "we", "our", "us") operates an affiliate
                  marketing program that promotes online gaming brands operated by third-party
                  partner companies. "You", "your", and/or "Affiliate" means the individual or
                  entity that has agreed to promote those brands in return for commission, in
                  accordance with the Partnerstar Affiliate Terms and Conditions.
                </p>
                <p className="text-muted-foreground">
                  This Privacy Policy describes how we collect, use, and protect your personal
                  information when you apply for the affiliate program, use the Partnerstar
                  Affiliate website, and earn commissions through us. We do not operate the
                  partner casino or sports-betting platforms ourselves; data of end-players
                  referred to those platforms is processed by the operator of each respective
                  platform under that operator's own privacy policy.
                </p>
                <p className="text-muted-foreground">
                  Read this notice carefully alongside our Affiliate Terms and Conditions. By
                  applying for the program or using our affiliate platform, you agree to this
                  Privacy Policy.
                </p>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">What Information Do We Collect?</h3>

                <div className="bg-card/50 rounded-lg p-6 mb-6 border border-border/50">
                  <h4 className="font-display text-xl text-foreground mb-3">Affiliate Application & Account</h4>
                  <div className="space-y-4 text-muted-foreground">
                    <div>
                      <p className="font-semibold text-foreground mb-2">Collected Data:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Identity details: first name, last name, date of birth, country of residence, business / company name (where applicable)</li>
                        <li>Contact details: email address, phone number, postal address, messaging handles (Telegram, Skype)</li>
                        <li>Tax & compliance: tax identification number, VAT number, KYC documents (government ID, proof of address)</li>
                        <li>Payout method: bank account / IBAN, e-wallet account, or cryptocurrency wallet address</li>
                        <li>Marketing channel details: websites, social handles, traffic sources, GEOs targeted</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">Purpose & Legal Basis:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>To set up, manage, and operate your affiliate account (contract — GDPR Art. 6(1)(b))</li>
                        <li>To process commission payments (contract & legal obligation — Art. 6(1)(b)/(c))</li>
                        <li>To verify identity and comply with anti-fraud, AML, and tax obligations (legal obligation — Art. 6(1)(c))</li>
                        <li>To prevent fraudulent or abusive use of the program (legitimate interest — Art. 6(1)(f))</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">Retention:</p>
                      <p>For the duration of the affiliate relationship and for the period required by applicable tax and AML laws thereafter (typically up to 7 years).</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card/50 rounded-lg p-6 mb-6 border border-border/50">
                  <h4 className="font-display text-xl text-foreground mb-3">Cookies & Technical Data</h4>
                  <div className="space-y-4 text-muted-foreground">
                    <div>
                      <p className="font-semibold text-foreground mb-2">Collected Data:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Device & browser information (browser type, operating system, language, screen resolution)</li>
                        <li>Connection data (IP address, approximate geo-location, access times)</li>
                        <li>Behavioural analytics (pages viewed, time spent, clicks, traffic source, referrals)</li>
                        <li>Tracking identifiers used to attribute referred players to your affiliate account</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">Cookie categories used on this site:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li><strong>Strictly necessary</strong> — session management, security, and login</li>
                        <li><strong>Functional</strong> — remembering preferences (language, region)</li>
                        <li><strong>Analytics</strong> — understanding how affiliates use the platform (placed only with your consent in the EEA / UK)</li>
                        <li><strong>Affiliate attribution</strong> — tracking referred player conversions to credit your account (essential to operating the program)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">Purpose & Legal Basis:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>To improve the platform, troubleshoot, and conduct analytics (consent and legitimate interest — Art. 6(1)(a)/(f))</li>
                        <li>To attribute referred player activity to your affiliate account (contract — Art. 6(1)(b))</li>
                        <li>To detect fraud and abuse (legitimate interest — Art. 6(1)(f))</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">Retention:</p>
                      <p>Session cookies expire when you close your browser. Persistent cookies expire between 30 days and 24 months depending on category.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">Managing cookies:</p>
                      <p>
                        Where required by law (EEA, UK, and similar jurisdictions), we ask for your consent before placing non-essential cookies.
                        You can withdraw your consent at any time via your browser settings or by contacting us. Note that disabling
                        affiliate-attribution cookies may prevent us from correctly tracking commissions on referrals you generate.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card/50 rounded-lg p-6 border border-border/50">
                  <h4 className="font-display text-xl text-foreground mb-3">Email & Communications</h4>
                  <div className="space-y-4 text-muted-foreground">
                    <div>
                      <p className="font-semibold text-foreground mb-2">Collected Data:</p>
                      <p>Records of correspondence (email, support tickets, messaging-app conversations), feedback you provide, and any other information you voluntarily share with us in support of your affiliate activity.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">Purpose & Legal Basis:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>To respond to your enquiries and operate the program (contract — Art. 6(1)(b))</li>
                        <li>To send you operational updates about the program (legitimate interest — Art. 6(1)(f))</li>
                        <li>To send marketing communications about new offers and brands (consent — Art. 6(1)(a); you may withdraw consent at any time)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">Retention:</p>
                      <p>For the duration of the affiliate relationship plus a reasonable archival period (typically 3 years) for dispute resolution.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">How Is Your Information Processed?</h3>
                <p className="text-muted-foreground">
                  Your personal information may be shared with the following categories of recipients, only to the extent necessary for the purposes set out above and under appropriate contractual and security safeguards:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                  <li>Other Partnerstar group entities involved in operating the affiliate program</li>
                  <li>The third-party affiliate-tracking platform we work with (ReferOn) — used to attribute referrals and calculate commissions</li>
                  <li>Payment processors and financial institutions used to pay your commissions</li>
                  <li>KYC/AML verification providers</li>
                  <li>IT, hosting, and infrastructure providers</li>
                  <li>Auditors, accountants, and professional advisers</li>
                  <li>Regulators, tax authorities, courts, and law-enforcement agencies where required by law</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  All processors are bound by data-processing agreements that meet the requirements of applicable data-protection law, preserving your rights at all times.
                </p>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Your Responsibility for Players You Refer</h3>
                <p className="text-muted-foreground">
                  Where you collect personal information from end-users (for example, leads or subscribers on your own marketing assets) before they sign up with a partner brand, you are responsible for ensuring that any onward transfer to us or to the partner brand is carried out lawfully — including obtaining all necessary consents and providing required notices. You agree to indemnify us against any claims, damages, or costs arising from your breach of this obligation.
                </p>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Information Disclosure</h3>
                <p className="text-muted-foreground mb-4">
                  We will not sell your personal information. We may disclose your data only in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>With your consent, where consent is the legal basis</li>
                  <li>To service providers and processors acting on our instructions, under a data-processing agreement</li>
                  <li>Where necessary to perform our contract with you (e.g., to pay commissions)</li>
                  <li>To comply with legal obligations, court orders, subpoenas, or lawful regulatory requests</li>
                  <li>To investigate, prevent, or take action regarding fraud, abuse, or violations of our Terms</li>
                  <li>In connection with a corporate transaction (merger, acquisition, asset sale), under appropriate confidentiality safeguards</li>
                </ul>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Security</h3>
                <p className="text-muted-foreground">
                  We implement appropriate technical and organisational measures to protect your personal information from unauthorised access, alteration, disclosure, or destruction. These include encryption in transit (TLS), encryption at rest for sensitive fields, access controls and least-privilege principles, multi-factor authentication for administrative access, audit logging, and ongoing security awareness training for staff.
                </p>
                <p className="text-muted-foreground mt-4">
                  All employees and processors with access to your data are bound by confidentiality obligations under applicable data-protection and privacy laws.
                </p>
                <p className="text-muted-foreground mt-4">
                  In the event of a personal data breach that is likely to result in a high risk to your rights and freedoms, we will notify you without undue delay and notify the competent supervisory authority within 72 hours of becoming aware of the breach, as required by GDPR Article 33.
                </p>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Protection of Minors</h3>
                <p className="text-muted-foreground">
                  The Partnerstar affiliate program is intended only for adults aged 18 or over. We do not knowingly collect personal information from anyone under the age of 18. If we become aware that we have collected such information, we will delete it without delay. If you believe a minor has provided us with personal information, please contact us so we can investigate.
                </p>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Your Rights</h3>
                <p className="text-muted-foreground mb-6">
                  Under GDPR and equivalent laws, you have the following rights regarding your personal data. We will respond to verified requests within 30 days; this period may be extended by a further 60 days for complex or numerous requests, in which case we will inform you of the extension within the initial 30 days.
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-display text-xl text-foreground mb-2">Right of Access</h4>
                    <p className="text-muted-foreground">
                      You can request a copy of the personal data we hold about you and information about how we process it.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-display text-xl text-foreground mb-2">Right to Rectification</h4>
                    <p className="text-muted-foreground">
                      You can ask us to correct inaccurate or incomplete data we hold about you.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-display text-xl text-foreground mb-2">Right to Erasure ("Right to be Forgotten")</h4>
                    <p className="text-muted-foreground">
                      You can request the deletion of your personal data, subject to legal retention obligations (for example, tax, AML, or accounting records that we are legally required to keep).
                    </p>
                  </div>

                  <div>
                    <h4 className="font-display text-xl text-foreground mb-2">Right to Restrict Processing</h4>
                    <p className="text-muted-foreground">
                      In certain circumstances, you can ask us to limit the way we use your personal data — for example, while we verify the accuracy of data you have contested.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-display text-xl text-foreground mb-2">Right to Data Portability</h4>
                    <p className="text-muted-foreground">
                      You can ask to receive the personal data you have provided to us in a structured, commonly used, machine-readable format, or to have it transmitted directly to another controller where technically feasible.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-display text-xl text-foreground mb-2">Right to Object</h4>
                    <p className="text-muted-foreground">
                      You can object to processing based on legitimate interests, and you have an absolute right to object to direct marketing (including profiling for marketing purposes) at any time.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-display text-xl text-foreground mb-2">Right to Withdraw Consent</h4>
                    <p className="text-muted-foreground">
                      Where processing is based on your consent, you can withdraw it at any time. Withdrawal does not affect the lawfulness of processing performed before the withdrawal.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-display text-xl text-foreground mb-2">Right to Lodge a Complaint</h4>
                    <p className="text-muted-foreground">
                      You have the right to lodge a complaint with the data-protection supervisory authority in your country of residence if you believe our processing of your data infringes data-protection law.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-display text-xl text-foreground mb-2">No Automated Decision-Making</h4>
                    <p className="text-muted-foreground">
                      We do not make decisions producing legal or similarly significant effects about you based solely on automated processing, including profiling. Where we use automated systems for fraud detection or analytics, the outputs are reviewed by human staff before any consequential decision is taken.
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground mt-6">
                  To exercise any of these rights, contact us using the details below. To protect your data, we may need to verify your identity before responding (for example, by asking you to confirm details associated with your affiliate account).
                </p>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">International Transfers</h3>
                <p className="text-muted-foreground">
                  Your personal information may be transferred to, and processed in, countries outside your country of residence, including outside the European Economic Area / United Kingdom. Where this happens, we ensure an appropriate level of protection through one or more of the following safeguards:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                  <li>European Commission adequacy decisions</li>
                  <li>Standard Contractual Clauses (2021) approved by the European Commission, plus the UK International Data Transfer Addendum where applicable</li>
                  <li>Other lawful transfer mechanisms permitted under applicable law</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  You can request a copy of the safeguards we use by contacting us.
                </p>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Policy Changes</h3>
                <p className="text-muted-foreground">
                  We may amend this Privacy Policy from time to time. Where changes are material, we will provide reasonable advance notice (typically by email to the address on your affiliate account or by prominent notice on this page) before the changes take effect. Continued use of the program after the effective date constitutes acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">How to Contact Us</h3>
                <p className="text-muted-foreground">
                  For privacy-related questions or to exercise any of the rights above, please contact us at <a href="mailto:privacy@partnerstar.com" className="text-primary hover:underline">privacy@partnerstar.com</a>.
                </p>
                <p className="text-muted-foreground mt-4">
                  If you believe we have not adequately addressed your concern, you have the right to contact the data-protection supervisory authority in your country of residence.
                </p>
              </section>

              <section className="mt-12 pt-8 border-t border-border">
                <p className="text-muted-foreground text-sm">
                  This privacy policy was last revised on May 8, 2026.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
