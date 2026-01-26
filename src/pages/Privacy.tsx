import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Privacy = () => {
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
                  Partnerstar, referred below as "we", "our", "us", represents the affiliate marketing program and provides marketing services to a number of brands operated by its Group, or the relevant company in the Group as the case may be. "You", "your", and/or "affiliate" means the individual or entity that has agreed to promote us in return for commission on the players that are referred to us in accordance with Partnerstar's terms and conditions.
                </p>
                <p className="text-muted-foreground">
                  We have put together this privacy policy to help you understand how we collect, use and protect your information and those of the players referred by you to us for the purpose of operating our online casino and sports betting services. You should read this notice carefully in conjunction with our terms and conditions for use of this site or any other sites operated by us to make informed decisions. By visiting our websites or by registering an account through our Services, you hereby agree to this Privacy Policy.
                </p>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">What Information Do We Collect?</h3>
                
                <div className="bg-card/50 rounded-lg p-6 mb-6 border border-border/50">
                  <h4 className="font-display text-xl text-foreground mb-3">Affiliate Application</h4>
                  <div className="space-y-4 text-muted-foreground">
                    <div>
                      <p className="font-semibold text-foreground mb-2">Collected Data:</p>
                      <p>Personal Information and registration details:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Specific details about you (first and last name, email address, gender, birthdate, physical address, phone number, occupation, etc)</li>
                        <li>Payment details (credit card number, e-wallet account or bank account details)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">Reason:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>To maintain our relationship with you</li>
                        <li>To set up, manage and update your account</li>
                        <li>To provide and operate the Services (such as for payment processing)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">Retention:</p>
                      <p>As long as required to manage the relationship</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card/50 rounded-lg p-6 mb-6 border border-border/50">
                  <h4 className="font-display text-xl text-foreground mb-3">Cookies</h4>
                  <div className="space-y-4 text-muted-foreground">
                    <div>
                      <p className="font-semibold text-foreground mb-2">Collected Data:</p>
                      <p>Non-Personal Information:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Technical information provided by your device (software and hardware information, type of browser and operating system, language preference, screen resolution, access time and the domain name of the website from which you linked to the Services)</li>
                        <li>Analytics information (e.g. pages viewed, the amount of time spent on particular pages, online browsing, clicks, actions, time stamps, alerts, geo-location etc.)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">Reason:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>To improve our website, the user experience, troubleshooting errors and bugs</li>
                        <li>To conduct analytics, statistical and research purposes</li>
                        <li>To provide you with a responsible affiliate marketing environment</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">Retention:</p>
                      <p>As long as required to fulfil the purposes</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card/50 rounded-lg p-6 border border-border/50">
                  <h4 className="font-display text-xl text-foreground mb-3">Email & Communications</h4>
                  <div className="space-y-4 text-muted-foreground">
                    <div>
                      <p className="font-semibold text-foreground mb-2">Collected Data:</p>
                      <p>Information which you provide us voluntarily, such as records of correspondence we have with you via email or additional information you share through your use of the Services.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">Reason:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>To communicate with you and keep you informed of our latest updates</li>
                        <li>To market our Services and serve you relevant advertisements</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">Retention:</p>
                      <p>For the duration of the relationship</p>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mt-6">
                  We collect personal information when you and/or your referred players use our online gambling services, join our affiliate program, make customer enquiries, register for information or other services, or when you respond to us. The types of personal information we may collect include your name and email address, home address, telephone number, debit/credit card data and other information collected upon registration or through online surveys or questionnaires.
                </p>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">How Is Your Information Processed?</h3>
                <p className="text-muted-foreground">
                  Your and/or your referred players' information may be disclosed for processing to any other companies within the Group and their employees; any third party service providers who use your personal information to provide services to us – such as: payment service providers, marketing service providers, data verifiers and financial institutions, to the extent necessary for the completion of payments, joint marketing campaigns, facilitate the opening of new accounts, and fraud prevention for services provided through our website; or any auditors or contractors or other advisers auditing any of the Group's business processes.
                </p>
                <p className="text-muted-foreground mt-4">
                  Any processing performed by any recipients will be governed by the necessary data processing agreement in the form and substance required by applicable law, thereby preserving your rights under applicable data protection laws.
                </p>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Your Responsibility Towards Referred Players</h3>
                <p className="text-muted-foreground">
                  If you yourself receive and process personal information from players that you subsequently refer to us then you shall ensure that they have given their express consent to such transfer to us and this personal information is processed and transferred from you to us in accordance with relevant laws but in any event under terms no less stringent than those set out herein. You agree to indemnify us against all claims and associated costs brought against and suffered by us due to your breach of this clause.
                </p>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Information Disclosure</h3>
                <p className="text-muted-foreground mb-4">
                  We ensure that your and/or your referred players' information will not be disclosed to government institutions or authorities unless:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>We have your written consent to share such personally identifiable information with third parties</li>
                  <li>We require your personally identifiable information to provide the services that you have requested</li>
                  <li>We respond to subpoenas, court orders or legal process</li>
                  <li>We find that your actions on our websites violate our terms of service or any usage guidelines for specific services</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  In addition, we reserve the right to disclose and transfer your personal data to our respective payment settlement service providers and financial institutions.
                </p>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Security</h3>
                <p className="text-muted-foreground">
                  Keeping your data safe is our main obligation. Internal access to all data is limited and strictly monitored. We have implemented suitable security policies, rules and technical measures to protect and safeguard the personal data under our control from unauthorized access, improper use or disclosure, unauthorized modification, unlawful destruction or accidental loss.
                </p>
                <p className="text-muted-foreground mt-4">
                  All our employees and data processors who have access to and are associated with the processing of your personal information are obliged to respect the confidential nature of your information pursuant to applicable data protection and privacy laws.
                </p>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Cookies</h3>
                <p className="text-muted-foreground">
                  We may send you a permanent cookie when you register with us. A cookie is a small file that can be placed on your computer hard disk for record-keeping purposes. Cookies can help us recognize you when you next visit our website, note the advertisements you click on and the other sites you enter via a link from our website. This allows us to tailor the service we provide to your preferences.
                </p>
                <p className="text-muted-foreground mt-4">
                  You are not obliged to accept a cookie from us or from any other website. You can modify your browser so that it will not accept cookies. Please consult the "Help" section of your browser for instructions on how to do so correctly. However, for legitimate security reasons, we may refuse access to specific website content unless you accept the use of a cookie or similar device.
                </p>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Protection of Minors</h3>
                <p className="text-muted-foreground">
                  The services provided on this website are not intended for or directed to minors or persons under the age of legal consent. Any person who provides their information to us represents to us that they are 18 years of age or over the age of legal consent in their jurisdiction. We reserve the right to access and verify any personal information submitted by or collected from referred players. If we become aware that a minor has attempted to or has submitted personal information via this website, we may not accept this information and may take steps to remove such information from our records.
                </p>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Your Rights</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-display text-xl text-foreground mb-2">Information Access</h4>
                    <p className="text-muted-foreground">
                      You are entitled to fill in a data subject access request. This means you have the right to demand a copy of your personal data that we keep. You may request updates and modifications in your Personal Data (for instance, if you think that your Personal Information is inaccurate, you may request an update or complete removal).
                    </p>
                  </div>

                  <div>
                    <h4 className="font-display text-xl text-foreground mb-2">Right to Be Forgotten</h4>
                    <p className="text-muted-foreground">
                      You can request a complete removal of any of your Personal Data. Please note that this does not clear us from responsibility to fulfill the compulsory retention periods under other laws.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-display text-xl text-foreground mb-2">Right to Opt-Out</h4>
                    <p className="text-muted-foreground">
                      You have the right to opt out easily by clicking the respective section in the footer of our communications or by contacting our support team.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-display text-xl text-foreground mb-2">Data Portability</h4>
                    <p className="text-muted-foreground">
                      You are entitled to receive personal information in a machine-readable format that you have volunteered. This allows you to obtain and reuse your information in various services for your own purposes.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-display text-xl text-foreground mb-2">Right to Object</h4>
                    <p className="text-muted-foreground">
                      In certain cases, you can object to the processing of your personal data. You also have the right to object to direct marketing (including profiling) use of your personal information.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Transfer Outside the European Union</h3>
                <p className="text-muted-foreground">
                  It may be necessary to transfer your personal information to other companies located in countries outside the European Union. This may happen if any of our servers or members of the Group are located or based outside the European Union, if you use our services while visiting countries outside the European Union, or if we transfer your personal information to such companies for purposes regarding which you will receive advance notice.
                </p>
                <p className="text-muted-foreground mt-4">
                  The data protection, privacy and other laws of these non-European Union countries may not be as comprehensive and in these instances, we will take steps to ensure that a similar level of protection is given to your information.
                </p>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Policy Changes</h3>
                <p className="text-muted-foreground">
                  We reserve the right to amend or modify this Privacy Policy at any time and in response to changes in applicable data protection and privacy legislation. If we change our Privacy Policy, we will post the changes on this page, and may place notices on other pages of the website, so that you may be aware of the information we collect and how we use it at all times. Continued use of the service will signify that you agree to any such changes made, so please check this page regularly.
                </p>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">How to Contact Us</h3>
                <p className="text-muted-foreground">
                  If you have any general questions about the Services or the information that we collect about you and how we use it, please contact us via email at <a href="mailto:privacy@partnerstar.com" className="text-primary hover:underline">privacy@partnerstar.com</a>.
                </p>
                <p className="text-muted-foreground mt-4">
                  We will make an effort to reply within a reasonable timeframe. Please feel free to reach out to us at any time. If you are unsatisfied with our response, you can reach out to the applicable data protection supervisory authority.
                </p>
              </section>

              <section className="mt-12 pt-8 border-t border-border">
                <p className="text-muted-foreground text-sm">
                  This privacy policy was last revised on January 26th, 2026.
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
