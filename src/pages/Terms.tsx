import { useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Terms = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Affiliate Terms & Conditions | Partnerstar";
    const meta = document.querySelector('meta[name="description"]');
    const previousDesc = meta?.getAttribute("content") ?? "";
    meta?.setAttribute(
      "content",
      "Partnerstar affiliate program — full terms and conditions including commission, payment, fraud, and data-processing terms."
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
              TERMS & <span className="text-gradient-gold">CONDITIONS</span>
            </h1>

            <div className="prose prose-invert prose-lg max-w-none space-y-8">
              <section>
                <h2 className="font-display text-3xl text-foreground mb-4">Partnerstar Affiliate Program Agreement</h2>
                
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Introduction</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>This Affiliate Program Agreement (the "<strong className="text-foreground">Affiliate Agreement</strong>" or "<strong className="text-foreground">Agreement</strong>") incorporates: (i) the terms and conditions set out below (including without limitation the Schedule below); and (ii) the terms of any agreed upon IO (as defined below).</li>
                  <li>It is important that you read and understand these terms and conditions set out below and the terms of any agreed upon IO.</li>
                  <li>By ticking the box indicating your acceptance of the terms and conditions in this Agreement ("<strong className="text-foreground">Agreement Acceptance</strong>"), you are agreeing to the terms and conditions of this Affiliate Agreement.</li>
                  <li>If you have any questions regarding the Affiliate Program or this Affiliate Agreement, please email us at <a href="mailto:affiliates@partnerstar.com" className="text-primary hover:underline">affiliates@partnerstar.com</a></li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Definitions and Interpretation</h3>
                <p className="text-muted-foreground mb-4">In this Agreement, the following expressions shall have the respective meanings assigned to them:</p>
                
                <div className="space-y-4 text-muted-foreground">
                  <p><strong className="text-foreground">Additional Payments</strong> means, if and as applicable, the Flat Fee and/or the Listing Fee.</p>
                  <p><strong className="text-foreground">Administrative Fees</strong> means any administrative fees charged by the Company relating to the Affiliate Program.</p>
                  <p><strong className="text-foreground">Affiliate, you or your</strong> means the person, company or other entity which you detail in the Application Form.</p>
                  <p><strong className="text-foreground">Affiliate Account</strong> means the account which you have with the Affiliate Program which you can access through the Affiliate Program Site.</p>
                  <p><strong className="text-foreground">Affiliate Program</strong> means the Partnerstar affiliate program operated by the Company and made available through the Affiliate Program Site.</p>
                  <p><strong className="text-foreground">Affiliate Program Site</strong> means the website located at <strong className="text-primary">https://partnerstar.com/</strong></p>
                  <p><strong className="text-foreground">Agreement Acceptance</strong> as defined in Section 1.3.</p>
                  <p><strong className="text-foreground">Application Form</strong> means the application form in order to register for participation in the Affiliate Program made available through the Affiliate Program Site.</p>
                  <p><strong className="text-foreground">Application Approval</strong> as defined in Section 3.7.</p>
                  <p><strong className="text-foreground">Affiliate Site or Affiliate Sites</strong> means the websites, mobile applications which you own and operate or Sent Marketing, which you detail in your Application Form or which is agreed to in an IO or a Negotiated Plan (solely for the avoidance of doubt for the duration of the IO or Negotiated Plan, as applicable).</p>
                  <p><strong className="text-foreground">Affiliate Payments</strong> means, if and as applicable, the Revenue Share Commission, CPA Commission, Hybrid Commission, Fixed Fee, Listing Fee and/or Sub Affiliate Fee that the Affiliate is to receive.</p>
                  <p><strong className="text-foreground">Applicable Laws</strong> means all applicable laws, directives, regulations, marketing guidelines, rules, mandatory codes of practice or conduct, standards, judgments, judicial orders, ordinances and decrees imposed by law or any competent governmental or regulatory authority or agency.</p>
                  <p><strong className="text-foreground">Back Office</strong> means the software which is used by the Company to manage the Affiliate Program.</p>
                  <p><strong className="text-foreground">Bonuses</strong> means any credits, bonus, bonus points or other promotional amounts.</p>
                  <p><strong className="text-foreground">CPA Commission</strong> means if and as applicable, a fixed payment amount, that the Affiliate is to receive, for each person who during the term of the relevant IO or Negotiated Plan (as applicable): (i) becomes a Customer on a Promoted Site in accordance with the terms of the Agreement; (ii) makes a minimum real money deposit of an amount as determined in such IO or as agreed in a Negotiated Plan on such Promoted Site; and (iii) wagers a minimum amount as determined in such IO or as agreed in a Negotiated Plan on such Promoted Site.</p>
                  <p><strong className="text-foreground">Commission</strong> means if and as applicable, the Revenue Share Commission, CPA Commission and/or Hybrid Commission that the Affiliate is to receive.</p>
                  <p><strong className="text-foreground">Company, us, we or our</strong> means the company operating the affiliate program.</p>
                  <p><strong className="text-foreground">Customer</strong> means a person who is not located in the Prohibited Territories, who has directly entered a Promoted Site through the Marketing Materials placed on an Affiliate Site and is identified by us as being sent by the Affiliate through the Tracking Link, and such person during the term of the Agreement: (a) registers an account with the Operator for such Promoted Site; (b) has not previously opened an account with the Operator; (c) has had their account registration details validated by the Operator; and (d) complies with any other relevant criteria set out in this Agreement, an IO, or as agreed in a Negotiated Plan (as applicable).</p>
                  <p><strong className="text-foreground">Cut Off Date</strong> as defined in Section 8.14.</p>
                  <p><strong className="text-foreground">Deductible Costs</strong> means any third party fees (including without limitation, licensing fees, progressive jackpot contributions, transaction fees, game royalties, payment processing fees, end-user verification and validation fees, software royalties, any game content fees) incurred by the Company, any Group Company and/or the Operator and any amounts incurred by the Company, any Group Company and/or the Operator due to Fraud.</p>
                  <p><strong className="text-foreground">e-Privacy Directive</strong> means Privacy and Electronic Communications Directive 2002/58/EC (and respective local implementing laws) concerning the processing of personal data and the protection of privacy in the electronic communications sector.</p>
                  <p><strong className="text-foreground">Fixed Fee</strong> means if and as applicable, a fixed amount that the Affiliate is to receive as agreed in an IO or Negotiated Plan which shall only apply during the term of the relevant IO or Negotiated Plan (as applicable).</p>
                  <p><strong className="text-foreground">Fixed Fee Payment</strong> means a pro rata amount of the Fixed Fee for the number of days which have elapsed from when the then applicable payment of the Fixed Fee has become relevant until the Cut Off Date or Jurisdiction Cut Off Date (as applicable).</p>
                  <p><strong className="text-foreground">Fraud</strong> means any fraudulent or abusive act determined by us, any Group Company or the Operator (regardless of whether any such action has resulted in any type of harm or damage) which includes but is not limited to: (i) any actual or attempted bonus abuse by the Customer; (ii) your, or a third party's encouragement of bonus abuse by a Customer; (iii) a chargeback executed by a Customer in relation to their deposit; (iv) any collusion by a Customer; (v) the opening of an Affiliate Account in breach of the terms of this Agreement; (vi) the offering or providing by you or any third party of any unauthorised incentives; (vii) the offering or providing by you or any third party of any cashback; (viii) Spam Traffic; (ix) any actual or attempted act by you or a Customer which breaches Applicable Laws; (x) any act by you or a Customer which is intended to defraud us, any Group Company or any Operator; (xi) a person who registers with the Promoted Site using a VPN, a proxy server, or who shares the same IP Pool; (xii) any attempt by you to artificially increase the amount of Customers or Commission payable to you; or (xiii) any use by a Customer of any software program, robot or external aid, which is endowed with artificial intelligence, to play on a Promoted Site.</p>
                  <p><strong className="text-foreground">GDPR</strong> has the meaning given to it in Section 18.3.</p>
                  <p><strong className="text-foreground">Guidelines</strong> means the guidelines we may, at our sole and absolute discretion, provide to you by email or which may be made available on the Affiliate Program Site (as may be amended from time to time).</p>
                  <p><strong className="text-foreground">Group Company or Group Companies</strong> means any entity directly or indirectly controlling, controlled by, or under common control with the Company.</p>
                  <p><strong className="text-foreground">Hybrid Commission</strong> means if and as applicable, payment that the Affiliate is to receive based on a combination of CPA Commission and Revenue Share Commission with respect to each Customer which becomes payable once the criteria of Customer with respect to the CPA Commission has been fulfilled.</p>
                  <p><strong className="text-foreground">Intellectual Property Rights</strong> means any and all intellectual property rights, of all types or nature whatsoever, including, without limitation, patent, copyright, design rights, trademarks, trade dress, data base rights, applications for any of the above, moral rights, know-how, trade secrets, domain names, URLs, trade names, or any other intellectual or industrial property rights.</p>
                  <p><strong className="text-foreground">IO or Insertion Order</strong> means an insertion order which is signed by the Company's and the Affiliate's authorised representatives, which lasts for specific duration and which may contain a different Commission to that of the Standard Commission.</p>
                  <p><strong className="text-foreground">IP Pool</strong> means a network with multiple IP addresses.</p>
                  <p><strong className="text-foreground">Jurisdiction Cut Off Date</strong> as defined in Section 8.15.</p>
                  <p><strong className="text-foreground">Legal Age or Legally of Age</strong> means the higher of: (i) 18 years of age; and (ii) the legal age for real money gambling in the jurisdiction you are located in.</p>
                  <p><strong className="text-foreground">Listing Fee</strong> means if and as applicable, a one-time fixed amount that the Affiliate is to receive following signature of an IO or following a Negotiated Plan coming into effect, with respect to the Affiliate displaying the Marketing Materials in a certain position on an Affiliate Site as agreed in an IO or a Negotiated Plan (as applicable).</p>
                  <p><strong className="text-foreground">Marketing Materials</strong> means the online marketing materials (such as banner advertisements, button links and text links) which contain the Tracking Links provided by us or made available for your use through the Affiliate Program Site in order to market and promote a Promoted Site on the Affiliate Site.</p>
                  <p><strong className="text-foreground">Marks</strong> as defined in Section 11.2.</p>
                  <p><strong className="text-foreground">Negotiated Plan</strong> means if and as applicable, a different Commission to that of the Standard Commission and/or a different Commission payment amount which the Affiliate is to receive and which may include additional commercial terms which lasts for a defined period of time, provided that such agreement by us is recorded through the Back Office.</p>
                  <p><strong className="text-foreground">Net Revenue</strong> means in a calendar month with respect to the Promoted Site on which individuals became Customers in relation to a Revenue Share Commission or a Hybrid Commission, the aggregate of such Customers real money bets on non-sports products or sports products (as applicable) on such Promoted Site less: (1) monies paid out to such Customers as winnings; (2) Bonuses granted to such Customers; (3) Deductible Costs; (4) any returned transactions or any uncollected revenue attributable to such Customers; (5) Administrative Fees; (6) charges levied by electronic payment or credit card organisations; (7) monies which are attributed to Fraud; (8) stakes returned to such Customers; (9) bad debts in respect of such Customers; and (10) any licensing fees, applicable gaming taxes, duties or similar mandatory payments imposed by any authority.</p>
                  <p><strong className="text-foreground">Operator</strong> means the operator and/or owner of the Promoted Site.</p>
                  <p><strong className="text-foreground">Payment Method</strong> as defined in Section 8.5.</p>
                  <p><strong className="text-foreground">Personal Data</strong> means any information which could be used, either directly or by employing additional means, to identify a natural person, and that is processed by the Recipient in the context of the performance of the Agreement.</p>
                  <p><strong className="text-foreground">Prohibited Territories or Prohibited Territory</strong> shall include the following jurisdictions until we notify you otherwise: Afghanistan, Belarus, Bulgaria, Central African Republic, Cuba, Cyprus, Democratic Republic of Congo, Ethiopia, Hong Kong, Iran, Israel, Lebanon, Libya, Mali, Malta, Nicaragua, Myanmar, North Korea, Russia, Somalia, South Sudan, Sudan and Darfur, Syria, United States of America, Uganda, United Kingdom, Ukraine, Venezuela, Yemen and Zimbabwe. Prohibited Territories also includes any other jurisdictions from which a Promoted Site does not accept end users and any further jurisdictions notified to you by us from time to time.</p>
                  <p><strong className="text-foreground">Promoted Site or Promoted Sites</strong> means a website or application which is promoted through the Affiliate Program and which is promoted through the Marketing Materials which you use.</p>
                  <p><strong className="text-foreground">Regulator</strong> means any governmental, regulatory and administrative authorities, agencies, commissions, boards, bodies and officials or other regulatory body or agency that has jurisdiction over the Company, any Group Company or any Operator.</p>
                  <p><strong className="text-foreground">Relatives</strong> means spouse, partner, parent, child or sibling.</p>
                  <p><strong className="text-foreground">Revenue Share Commission</strong> means if and as applicable, a percentage of the Net Revenue as detailed on the Affiliate Program Site that the Affiliate is to receive for each Customer.</p>
                  <p><strong className="text-foreground">Sent Marketing</strong> means any form of sent electronic marketing communications, which includes but is not limited to WhatsApp, Telegram, email, SMS and push notification.</p>
                  <p><strong className="text-foreground">Spam Traffic</strong> means any deposits, revenue or traffic generated at a Promoted Site or in the Customer's account on a Promoted Site through illegal means or in bad faith. Spam Traffic includes but is not limited to spam and false advertising.</p>
                  <p><strong className="text-foreground">Sub-Affiliate</strong> means a person or entity which is referred by you via a sub affiliate tracking link provided by us to you, to the Affiliate Program and which is approved by us to participate in the Affiliate Program.</p>
                  <p><strong className="text-foreground">Sub Affiliate Fee</strong> as defined in Section 19.5.</p>
                  <p><strong className="text-foreground">Tracking Link</strong> means a tracking URL through which we track the number of Customers, directed to the respective Promoted Sites by you.</p>
                </div>

                <div className="mt-6 space-y-3 text-muted-foreground">
                  <p>Any phrase introduced by the terms "including", "include", "in particular" or any similar expression shall be construed as illustrative and shall not limit the sense of the words preceding those terms.</p>
                  <p>If any provision in a definition is a substantive provision conferring rights or imposing obligations on any party, notwithstanding that it is only in the definition clause, effect shall be given to it as if it were a substantive provision in the body of the Agreement.</p>
                  <p>The headings in this Agreement are for ease of reference only and shall not affect its construction.</p>
                  <p>In this Agreement, if the context so requires, references to the singular shall include the plural and vice versa.</p>
                </div>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Application Form and Becoming a Member of the Affiliate Program</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>To become a member of the Affiliate Program, you must complete the Application Form.</li>
                  <li>You must ensure that the Application Form includes all the information requested by us. If the information provided is incomplete or inaccurate, this may result in a delay in the review of your Application Form or a rejection of your application to join the Affiliate Program.</li>
                  <li>If you are a person, participation in the Affiliate Program is only permitted if you are Legally of Age or older. If you are an entity, you can have no one working for you who is below the Legal Age.</li>
                  <li>It is at our sole discretion whether to accept your Application Form and accept you to the Affiliate Program, and we shall not have any liability to you or to anyone else in relation to a rejected Application Form. We have no obligation to provide any reason for rejecting your Application Form.</li>
                  <li>We will notify you by email as to whether or not your Application Form has been approved and you have been accepted to the Affiliate Program.</li>
                  <li>In the event we reject your Application Form and your participation in the Affiliate Program, the Agreement will immediately terminate. You shall have no right to appeal any decision by the Company to reject your Application Form.</li>
                  <li>You shall not market or promote the Promoted Sites until we have notified you by email that your Application Form and your participation in the Affiliate Program has been approved ("<strong className="text-foreground">Application Approval</strong>"). We shall not be liable to pay you any Affiliate Payments which you accrue prior to Application Approval.</li>
                  <li>The Company reserves at any time to request further documentation and information from you (including but not limited to documents such as identity card, proof of address, certificate of incorporation, certificate of registered address, certificate of good standing and certificates proving good financial standing). If deemed necessary, the Company may request that copies of any documents are notarised by a Public Notary.</li>
                  <li>In the event that any of the information provided by you to us is out of date or becomes incorrect, you must immediately change such details through the Affiliate Account.</li>
                  <li>The Affiliate Account is solely for your own benefit. You shall not allow any third party to use your account, password or identity and you shall be fully liable for any activities undertaken on your account. You shall take all steps to ensure that such details are not revealed to any third party. If you suspect that the Affiliate Account has been accessed or misused by a third party, you shall inform us immediately.</li>
                  <li>We may request at any time that you provide us with documentation as determined by us which verifies all your beneficiaries and payment details. We shall not be liable to pay you any Affiliate Payments until verification of your beneficiaries and payment information is completed to our satisfaction. If at any time you fail such verification, we may terminate the Agreement immediately.</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Your Use of the Marketing Materials</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>From the Application Approval until such time as your membership of the Affiliate Program terminates, you may only use the Marketing Materials to market and promote the Promoted Sites on the Affiliate Sites in accordance with the terms of this Agreement.</li>
                  <li>You shall only use the most up to date Marketing Materials to promote the Promoted Sites.</li>
                  <li>You shall not alter, modify or amend the Marketing Materials which includes without limitation the Tracking Links, unless we provide our prior written approval. Without derogating from any of our other rights and remedies, if you make any alterations, modifications or amendments without our prior written approval, we may render the Tracking Link inoperative.</li>
                  <li>Your use of the Marketing Materials must comply with Applicable Laws.</li>
                  <li>You shall not use the Marketing Materials on any Affiliate Site which breaches Applicable Laws.</li>
                  <li>You shall not use the Marketing Materials on any Affiliate Site which infringes third party Intellectual Property Rights.</li>
                  <li>We may request that you change the positioning of the Marketing Materials, cease using the Marketing Materials, or use different Marketing Materials and you must immediately comply with such request.</li>
                  <li>You shall not provide the Marketing Materials to any third party.</li>
                  <li>You agree that you will cooperate fully with the Company in order to establish and maintain the Marketing Materials which includes without limitation the Tracking Links.</li>
                  <li>We may at any time and at our sole discretion amend our tracking system and reporting format and we may provide you a notice by email to that effect.</li>
                  <li>If your use of any Marketing Materials including without limitation the Tracking Links is not in compliance with the terms of this Agreement, we may take such measures as to deactivate such Marketing Material or the Tracking Link contained therein.</li>
                  <li>The parties may from time to time agree upon an Insertion Order.</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Your Marketing of the Promoted Sites and Your Affiliate Sites</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>You undertake to immediately comply with (as may be amended from time to time by us) the Guidelines and any additional policies, instructions, terms and conditions which we may provide you by email or which may be made available on the Affiliate Program Site.</li>
                  <li>You shall comply with all Applicable Laws and the Affiliate Sites shall comply with all Applicable Laws.</li>
                  <li>You undertake that you shall be the owner and operator of the Affiliate Sites.</li>
                  <li>The Affiliate Sites shall not infringe third party Intellectual Property Rights.</li>
                  <li>You will immediately adhere to any instructions provided by us relating to the marketing of the Promoted Sites.</li>
                  <li>The Affiliate Sites must not be designed to appeal or appeal to individuals that are below the Legal Age.</li>
                  <li>The Affiliate Sites must not be designed to distribute, distribute or promote any spyware, adware, trojans, viruses, worms, spybots, keyloggers or any other form of unwanted threats.</li>
                  <li>The Affiliate Sites must not contain any content which the Company deems to be unlawful, harmful, threatening, defamatory, obscene, or harassing which includes without limitation: (i) "hard" or "soft" adult content, pornographic content or sexually explicit content (collectively and individually the "<strong className="text-foreground">Excluded Content</strong>"); (ii) content that is discriminatory in any way, including on the basis of gender, race, religion, disability or sexual orientation; (iii) content which is offensive, profane, hateful, threatening, harmful, defamatory, libellous or harassing; or (iv) violent content.</li>
                  <li>You will not, nor will any entity on your behalf or with your permission or authority, market or promote a Promoted Site to any person located in the Prohibited Territories with respect to such Promoted Site and no person located in any Prohibited Territories shall be included in the definition of Customer.</li>
                  <li>In addition to your use of Marketing Material, subject to our prior written consent, from time to time, you may promote the Promoted Sites by publishing bonus codes for special offers/promotions. All such use and publishing of the bonus codes must be carried out in accordance with the Agreement and Applicable Laws.</li>
                  <li>You shall at all times, market and promote the Promoted Sites: (i) in accordance with Applicable Laws; (ii) in a manner which does not infringe third party Intellectual Property Rights; and (iii) only to persons above the Legal Age.</li>
                  <li>You shall at all times market and promote the Promoted Sites in a socially responsible manner. Without derogating from the foregoing, you must never market and promote any of the Promoted Sites in a manner which: (i) portrays, condones or encourages behaviour that is socially irresponsible or which can lead to social or emotional harm; (ii) claims that gambling is free of the risks of financial losses; (iii) promotes behaviour that objectively leads to financial harm; (iv) provides false or unrealistic information about the probability of gambling winnings or returns; (v) suggests that skill can influence the outcome of a game of pure chance; (vi) suggests that it is possible to gamble anonymously or without holding an account with an online gambling operator; (vii) targets or specifically appeals to those under the age of 18; (viii) shows, condones or encourages criminal or antisocial behaviour; (ix) condones or encourages anti-social behaviour; (x) suggests gambling is an important part of an individual's life and can be a resolution to personal, professional or educational problems; (xi) claims that gambling can lead to social success or enhancement of personal qualities or that gambling can improve a person's self-esteem; (xii) promotes gambling as an alternative to employment, or a financial investment or a solution to financial problems; (xiii) implies that gambling is more important than family, friends, professional or educational obligations; (xiv) exploits the susceptibilities, aspirations, credulity, inexperience or lack of knowledge of people or vulnerable persons; (xv) contains content that gambling could lead to sexual success or enhanced attractiveness; or (xvi) suggests or applies peer pressure to gamble or that abstention from gambling is disparaging.</li>
                  <li>Subject to Sections 11.5 and 11.6, with respect to the Promoted Sites you may carry out keyword bidding and Pay Per Click advertising.</li>
                  <li>You agree that you are responsible for the operation of the Affiliate Sites and the content of the Affiliate Sites including without limitation the accuracy and completeness of such content.</li>
                  <li>Except for your use of the Marketing Materials, the Affiliate Sites will not contain any content or materials of the Promoted Sites or copy or resemble the look and feel of the Promoted Sites.</li>
                  <li>You shall not advertise the Promoted Sites in any way not approved in advance by us.</li>
                  <li>You shall not market or promote the Promoted Sites by any Sent Marketing unless agreed in an IO or Negotiated Plan and only for the duration of the IO or Negotiated Plan (as applicable).</li>
                  <li>In the event that a Listing Fee is applicable, you shall ensure at all times that the Marketing Materials are displayed in the relevant position on the Affiliate Site as agreed in an IO or Negotiated Plan (as applicable).</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Your Electronic Marketing of the Promoted Sites</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>In the event that we agree in any IO or Negotiated Plan that you may use Sent Marketing, you represent and warrant that all such Sent Marketing and all your direct channels' marketing activities comply with the requirements of this Agreement including without limitation this Section and Applicable Laws for any promotion of the Promoted Site through Sent Marketing.</li>
                  <li>You agree that you are solely responsible for your own actions towards the Customers, ensuring that all activities of your Sent Marketing, comply with all Applicable Laws, privacy laws, GDPR and e-Privacy Directive and do not infringe any such legislation.</li>
                  <li>You warrant and represent that the Sent Marketing:
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>is clear and unambiguous that you are advertising the Promoted Site and not any third parties, their products and/or their sites as well as that any advertising is sent from you and not the Company, its Group Companies or the Operator;</li>
                      <li>includes a clear and unambiguous identifiable reference that the Sent Marketing is a commercial communication;</li>
                      <li>is not sent to individuals below the Legal Age;</li>
                      <li>includes true name in the "From" field of any email and not a sales pitch or marketing message. Any such correspondence must clearly identify you as the communication's sender and you shall not attempt to or falsify or disguise or try to hide your identity in any way;</li>
                      <li>includes a function of "opt-out" or "unsubscribe" as well as contains a valid operative email address to which the recipient of such Sent Marketing can respond to unsubscribe or opt-out future promotions;</li>
                      <li>contains a link to a privacy policy;</li>
                      <li>where you wish to engage any third parties to provide any such Sent Marketing, you shall bear all the responsibility for ensuring such third parties comply with the same requirements of this Agreement and with any Applicable Laws.</li>
                    </ul>
                  </li>
                  <li>Before sending the Sent Marketing you agree to obtain the recipient's prior opt-in consent, this means that the recipient has taken an affirmative action to indicate their consent to accepting electronic marketing communications, such consent must be freely given, specific, informed and affirmative.</li>
                  <li>Any Sent Marketing linked to the Promoted Sites must use a valid and working unsubscribed link to the Sent Marketing. You acknowledge and accept that any Sent Marketing, related to the Promoted Sites must comply with marketing guidelines and Applicable Laws.</li>
                  <li>You must maintain an accurate and up-to-date record of opt-out request of any recipient who requested and indicated, by whatever means, their refusal to receiving electronic marketing communications.</li>
                  <li>You must ensure that you have performed suppression of your mailing lists to exclude any individuals that are self-excluded from any gambling platform which includes without limitation any gambling websites or applications or any other individuals who should not receive any marketing materials relating to Promoted Sites.</li>
                  <li>If you receive a complaint from a recipient of any Sent Marketing you have initiated, you agree to promptly notify us within 24 hours.</li>
                  <li>In the event that we receive any complaint, request or inquiry from a recipient of any Sent Marketing or a competent authority in relation to your Sent Promotion or practices or compliance with GDPR or any other Applicable Laws, if we request, you agree to provide us with full information regarding the corresponding recipient of the Sent Marketing, including but not limited to the source and way of your obtaining their personal data, proof of that recipient's opt-in consent and any other details that we find related and require. You agree to respond to every such request within 5 days from the receipt of our request.</li>
                  <li>You hereby authorize us to provide information about you, as the Data Controller responsible for the compliance with GDPR with respect to the processing of personal data of the recipients of the Sent Marketing, as well as assist us in providing any relevant information to any person who has filed a complaint with us and/or any competent authority.</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Commission</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>From the Application Approval, the default Revenue Share Commission shall apply to the Customers sent by you in accordance with this Agreement ("<strong className="text-foreground">Standard Commission</strong>").</li>
                  <li>From time to time, we may agree with you a Negotiated Plan that is different from the Standard Commission, at which point the Standard Commission is suspended for the duration of the Negotiated Plan. For the duration of the Negotiated Plan, we shall not be liable to pay you any Commission with respect to any Customers which you have generated prior to the Negotiated Plan coming into force. Following the Negotiated Plan's termination or expiration, the Standard Commission shall apply to all Customers.</li>
                  <li>If a Negotiated Plan has been agreed to by the Company, we may also agree with you an IO at which point the Negotiated Plan is suspended for the duration of the IO. Following the IO's termination or expiration, the Negotiated Commission shall apply to the Customers.</li>
                  <li>Notwithstanding the above:
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>if we agree in a Negotiated Plan and/or in an IO to pay you solely a CPA Commission with respect to any Customers, once the CPA Commission has been paid with respect to such Customers, we shall not be liable to pay you any further Commission with respect to such Customers;</li>
                      <li>if we agree in a Negotiated Plan and/or an IO to pay you a Hybrid Commission with respect to any Customers, once the CPA Commission component of the Hybrid Commission has been paid, we shall not be liable to pay you any further CPA Commission with respect to such Customers;</li>
                      <li>if we agree in a Negotiated Plan and/or an IO to pay you a Hybrid Commission with respect to any Customers, if a person begins the process of becoming a Customer and does not fulfil the criteria of Customer with respect to the CPA Commission component during the duration of the Negotiated Plan and/or an IO (as applicable), we shall not be liable to pay you any Commission with respect to such person.</li>
                    </ul>
                  </li>
                  <li>Any amendment to an IO and/or Negotiated Plan shall not apply retroactively to any Customers generated during the duration IO and/or Negotiated Plan prior to such amendment coming into effect.</li>
                  <li>Furthermore, we may agree with you Additional Payments through an IO and/or Negotiated Plan.</li>
                  <li>For the avoidance of doubt, the terms of an IO and/or Negotiated Plan shall not survive the termination or expiration of the IO or Negotiated Plan (as applicable).</li>
                  <li>The Affiliate undertakes that it shall not become a Customer and the Affiliate shall not be liable to receive any Commission with respect to such. If the Affiliate is a person, the Affiliate shall not be liable to receive any Commission with respect to any of its Relatives becoming a Customer. Furthermore, if the Affiliate is an entity, the directors, officers and employees of such entity and any Relatives of such individuals shall not be eligible to become Customers.</li>
                  <li>You acknowledge and agree that our measurements and calculations in relation to the number of Customers and the calculation of Commission and Sub Affiliate Fee shall be final and any further review of those figures shall be at our own discretion.</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Payment</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>All Affiliate Payments shall be paid to you in Euros. We have no liability to pay any currency conversion charges or any charges associated with the transfer of money to your Payment Method.</li>
                  <li>We shall make the number of Customers, Commission and Sub Affiliate Fee generated in accordance with this Agreement in the then current calendar month and any Additional Payments which may be applicable for payment in the following month available to you through the Affiliate Program Website. In order to allow accurate tracking, reporting, and the calculation of the Customers and Commission, the Marketing Materials including the Tracking Links must be properly formatted.</li>
                  <li>If the total amount of the Affiliate Payments is less than EUR 100 for any calendar month, the balance will be transferred to the next calendar month's Affiliate Payments until the total amount becomes EUR 100 or higher.</li>
                  <li>Unless otherwise agreed in any IO and subject to the terms of this Agreement and your full compliance with your obligations hereunder the Commission and Sub Affiliate Fee shall be paid to you following the end of each calendar month, subject to you providing us with an invoice for the correct amount of Commission and Sub Affiliate Fee generated in such calendar month. We shall settle any such undisputed invoice within 20 days following our receipt of an undisputed invoice.</li>
                  <li>We shall pay the Affiliate Payments to the payment method you select on the Application Form ("<strong className="text-foreground">Payment Method</strong>"). If we are unable to pay the Affiliate Payments to your Payment Method as you have either entered incorrect or incomplete payment information and the Affiliate Payments is not paid to you or is paid to a different account, we will have no liability whatsoever with regards to such non-payment.</li>
                  <li>If we are unable to pay the Affiliate Payments to your Payment Method, we may deduct from the Affiliate Payments a reasonable amount to reflect the required investigation and additional work including without limitation the administrative burden created by you having provided incorrect or incomplete details.</li>
                  <li>If for 6 consecutive calendar months, we are unable to transfer to you the Affiliate Payments to your Payment Method because of any incomplete or incorrect payment details, or for any other reason beyond our control, we may retain any such Affiliate Payments and will no longer be liable to pay such to you.</li>
                  <li>If a Negotiated Plan is applicable to you, we reserve the right to amend the Commission scheme and/or Commission amount by which you will be paid, as well as the qualification criteria for which the Commission is to be paid. We shall solely proceed with any such amendment after informing you of the change and the date that the change will come into effect.</li>
                  <li>We may retain any Affiliate Payments which has been generated in breach of any of the terms of this Agreement.</li>
                  <li>Any Affiliate Payments payable to you under this Agreement is subject to the Company actually receiving the applicable payment from the Operator with respect to the Affiliate Payments.</li>
                  <li>With respect to any amount owed to you under this Agreement, you shall be liable for any taxation and charges, duties, imposts, contributions, levies or liabilities payable on such amount in any jurisdiction and the monies paid to you under this Agreement shall be inclusive of all such amounts. We may deduct and withhold from any monies due to you, and to pay over to the relevant tax authorities, any amount on account of taxes, in accordance with our obligations under Applicable Laws.</li>
                  <li>We apply a No Negative Carry Over Policy with respect to a Revenue Share Commission and the Revenue Share Commission component in a Hybrid Commission. The No Negative Carry Over Policy means that if the aggregate amount of Net Revenue in any calendar month is negative, the Revenue Share Commission or the Revenue Share Commission component in a Hybrid Commission (as applicable) will be set to zero for such calendar month. However, if a negative balance with respect to the Net Revenue is attributable to Fraud or breach of this Agreement, we reserve the right to apply the negative amount from any Affiliate Payments which would be payable to you in the future until such time as the negative balance has been fully set-off.</li>
                  <li>We reserve the right to set-off any amounts which you owe to us from the Affiliate Payments payable to you. Furthermore, we reserve the right to set-off from any payments which we owe to you from any of your liability to us, including any allegations we have against you arising out of your breach of this Agreement or any other agreement between us and you.</li>
                  <li>In the event that a Promoted Site ceases to form part of the Affiliate Program, we shall not be liable to pay you any Affiliate Payments with respect to such Promoted Site following the date that the Promoted Site ceases to form part of the Affiliate Program ("<strong className="text-foreground">Cut Off Date</strong>").</li>
                  <li>In the event that a jurisdiction does not fall under the definition of Prohibited Territories at Agreement Acceptance with respect to a Promoted Site and then such jurisdiction falls under the definition of Prohibited Territories with respect to a Promoted Site during the term of this Agreement, from such date ("<strong className="text-foreground">Jurisdiction Cut Off Date</strong>"), we shall not be liable to pay you any Commission in relation to any Customer which registered from such jurisdiction or is located in such jurisdiction with respect to the Promoted Site.</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Fraud</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>We reserve the right to review for possible Fraud, regardless of whether such Fraud may be on the part of any Customer or on your part.</li>
                  <li>In the event that we investigate for Fraud any such investigation shall not take longer than 90 days. Furthermore, in the event that we investigate for Fraud, we may suspend your Account.</li>
                  <li>Without derogating from Section 13.4, in the event we suspend your Account:
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>we may withhold all Commission and Sub Affiliate Fee which is owed to you but which has not been paid to you prior to the suspension;</li>
                      <li>no Commission and Sub Affiliate Fee shall be generated during such period of suspension;</li>
                      <li>if there is an IO and/or Negotiated Plan in force at any time during the period of suspension and any Additional Payments become due and payable, we shall not be liable to pay you any Affiliate Payments; and</li>
                      <li>you must immediately cease marketing and promoting the Promoted Sites which includes without limitation ceasing to use the Marketing Materials during such period of suspension.</li>
                    </ul>
                  </li>
                  <li>Once we have completed our review for Fraud, we may lift the suspension of your Account and in such event:
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>you may begin to use the Marketing Materials to market and promote the Promoted Sites;</li>
                      <li>we shall pay you any Commission which is owed to you but which has not been paid to you prior to the suspension and which does not relate to Fraud;</li>
                      <li>we may retain any Commission relating to Fraud;</li>
                      <li>we shall pay you any Sub Affiliate Fee which is owed to you but which has not been paid to you prior to the suspension;</li>
                      <li>if there is an IO and/or Negotiated Plan in force, following such period of suspension, the IO and/or Negotiated Plan (as applicable) shall continue on its terms.</li>
                    </ul>
                  </li>
                  <li>Any incidence of Fraud is a breach of the Agreement by you.</li>
                  <li>We reserve the right to set-off any amounts already received by you which are related to Fraud from any future Affiliate Payments payable to you.</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Additional Restrictions</h3>
                <p className="text-muted-foreground mb-4">You shall <strong className="text-foreground">NOT</strong>, nor shall you permit, assist or encourage any third party to:</p>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>alter, redirect or in any way interfere with the operation or accessibility of the Promoted Sites or any pages thereof;</li>
                  <li>copy or resemble the look and feel of any of the Promoted Sites in whole or in part;</li>
                  <li>acquire any right to any data relating to the Customers;</li>
                  <li>register as a Customer, or authorize or assist (save by promoting the Promoted Site in accordance with this Agreement) any person to register as a Customer;</li>
                  <li>cause any of the Promoted Sites (or any parts or pages thereof) to open in a person's browser other than as a result of the person clicking on the Marketing Materials;</li>
                  <li>attempt to intercept or redirect (including via user-installed software) traffic from the Promoted Sites;</li>
                  <li>violate the terms of use and any applicable policies of any search engines;</li>
                  <li>market or promote any Promoted Site in the Prohibited Territories with respect to such Promoted Site;</li>
                  <li>attempt to circumvent any restriction in place to prevent potential Customers from Prohibited Territories from becoming Customers, or attempt to disguise the geographical location of a Customer;</li>
                  <li>provide Customers' details to any third party, during the term of this Agreement and at any time after the termination of this Agreement.</li>
                </ol>
                <p className="text-muted-foreground mt-4">You shall not use the Marketing Materials in any way that is detrimental to us, any Group Company or the Operators, which includes using the Marketing Materials in any manner which damages our, any Group Company or the Operators' goodwill or reputation.</p>
                <p className="text-muted-foreground mt-4">You must refrain from marketing the Promoted Sites in any way which might compete with our own, any Group Company or the Operator's marketing efforts with respect to the Promoted Sites.</p>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Intellectual Property Rights</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>From the Application Approval and for the remainder of the term of the Agreement, subject to your compliance with the terms of this Agreement, we grant to you a non-exclusive, revocable, non-sublicensable, non-assignable, and non-transferable licence to use the Marketing Materials and their content solely for the purposes of you displaying the Marketing Materials on the Affiliate Sites.</li>
                  <li>You acknowledge that the Company, its Group Companies or the Operators (as applicable) owns or has the necessary licenses, permits and consents to use all Intellectual Property Rights in relation to the Marketing Materials and the brands and trademarks relating to the Promoted Sites (collectively and individually the "<strong className="text-foreground">Marks</strong>"). You agree that any use by you of the Marketing Materials or the Marks inures to our, our Group Companies or the Operators' (as applicable) sole benefit and that you will not obtain any rights in the Marketing Materials and the Marks as a result of such use.</li>
                  <li>All Intellectual Property Rights and any goodwill arising in the Marketing Materials shall remain our, our Group Companies or the Operators (as applicable) property.</li>
                  <li>The Affiliate Sites shall not in any way resemble the look or feel of the Promoted Sites, nor will you create the impression that any of the Affiliate Sites is any of the Promoted Sites (or any part thereof).</li>
                  <li>You shall not: (i) register or apply to register a domain which incorporates or consists of or is confusingly similar to the Marks; (ii) bid on keywords or search terms related to the Marks; (iii) include metatag keywords which are the same or similar as the Marks on the Affiliate Sites; (iv) use any sub-domain name which incorporates or consists of, or is confusingly similar to the Marks; (v) open or operate any social media account which uses, incorporates or consists of the Marks; (vi) register or apply to register any trade mark in any jurisdiction which includes, incorporates or consists of, or is confusingly similar to, the Marks; or (vii) purchase or register keywords, search terms or other identifiers for use in any search engine, portal, social network, sponsored advertising service or other search or referral service which are identical or similar to the Marks.</li>
                  <li>If you are not in compliance with any of Section 11.5, you must immediately inform us. In such event of your non-compliance, you hereby agree that you shall in accordance with our instructions transfer the applicable registration domain name, search term, sub-domain name and/or mark (as the case may be) and/or the benefit of any application for such, to us or any company we nominate.</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Representations and Warranties</h3>
                <p className="text-muted-foreground mb-4">You hereby represent and warrant to the Company that:</p>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>all the documents and information which you provide us with, including without limitation on the Application Form are true, accurate and complete;</li>
                  <li>you will immediately comply with our instructions and the Guidelines (as may be amended by us from time to time);</li>
                  <li>you will comply with all Applicable Laws during the term of the Agreement and your marketing and promotion of the Promoted Sites shall comply with all Applicable Laws;</li>
                  <li>you shall comply with the Schedule below which forms part of this Agreement;</li>
                  <li>you shall obtain, maintain and comply with all approvals, permits, certificates authorisations, licensees, consents which you require to fulfil your obligations under the Agreement;</li>
                  <li>you shall obtain, maintain and comply with all approvals, permits, certificates authorisations, licensees, consents which you are required to possess by Applicable Laws or any Regulator;</li>
                  <li>you will not provide the Marketing Materials to any third party;</li>
                  <li>there is no legal, commercial, contractual or other restriction, which precludes or might preclude you from fully performing your obligations as set out in this Agreement;</li>
                  <li>if you are an individual rather than a legal entity, you are Legally of Age;</li>
                  <li>you have evaluated the laws (and in particular all laws relating to the promotion of online gambling) relating to your activities and obligations as set out in this Agreement and have concluded that you can enter into this Agreement and fulfil your obligation as set out in this Agreement without violating any Applicable Laws;</li>
                  <li>you shall comply with and ensure: (i) the prevention of gambling from being a source of crime or disorder, being associated with crime or disorder or being used to support crime; (ii) that gambling is conducted in a fair and open way; and (iii) the protection of children and other vulnerable persons from being harmed or exploited by gambling.</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Duration, Termination and Consequences of Termination</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>This Agreement shall start from the Agreement Acceptance and shall continue thereafter until it is terminated in accordance with this Agreement.</li>
                  <li>Either party may terminate the Agreement, any IO and/or Negotiated Plan, by providing twenty-four (24) hours prior notice to the other by email. Your termination of the Agreement is subject to you sending an email to <a href="mailto:affiliates@partnerstar.com" className="text-primary hover:underline">affiliates@partnerstar.com</a> with the Subject line "Termination". However, you shall not be able to terminate the Agreement, any IO and/or any Negotiated Plan if we have suspended your Account.</li>
                  <li>Your participation in the Affiliate Program terminates upon termination of the Agreement.</li>
                  <li>We may terminate the Agreement or we may terminate any IO and/or Negotiated Plan which has not expired or been terminated on written notice to you by email in the event that:
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>you are in breach (or we have reasonable grounds to believe you have breached) any of the terms of this Agreement;</li>
                      <li>you are in breach of Applicable Laws or we (acting reasonably) believe that you have breached Applicable Laws;</li>
                      <li>you carry out any action which we reasonably believe will expose the Company, any Group Company or any Operator to regulatory repercussions in any jurisdiction; or</li>
                      <li>the Company, any Group Company or any Operator is ordered or required by a Regulator, to terminate its relationship with you.</li>
                    </ul>
                  </li>
                  <li>In the event that the Agreement is terminated for any reason whatsoever, any IO or Negotiated Plan which has not expired or been terminated will automatically and immediately terminate.</li>
                  <li>In the event that the Agreement is terminated by either party, the Company shall pay you, subject to the terms of the Agreement (if and as applicable) all Commission and Sub Affiliate Fee due to you on the effective date of termination of the Agreement. We may withhold the final payment of any Commission, Fixed Fee and Sub Affiliate Commission for up to 90 days to ensure that the correct amount is paid to you.</li>
                  <li>In the event that the Agreement is terminated due to your breach, we shall retain all Affiliate Payments and we shall not be liable to pay you any Affiliate Payments.</li>
                  <li>Immediately following the termination of the Agreement you must immediately: (a) cease all use of the Marketing Materials and remove all of the Marketing Materials from the Affiliate Sites; (b) return to us any Confidential Information in your control or possession in whatever form; and (c) cease marketing the Promoted Sites.</li>
                  <li>On termination of the Agreement, all rights and licences granted to you in this Agreement shall immediately terminate.</li>
                  <li>You will not accrue any Affiliate Payments following the termination of the Agreement.</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Indemnification</h3>
                <p className="text-muted-foreground">You hereby agree to on our written demand indemnify and hold harmless us, the Group Companies, the Operator and our and each of their respective shareholders, officers, directors, employees, agents, successors and assigns from and against any and all losses, penalties, fines (including without limitation from any Regulator), demands, claims, damages, costs (including without limitation legal costs), expenses (including without limitation, consequential losses and loss of profit) and liabilities suffered or incurred, directly or indirectly, as a consequence of any: (i) breach of the Agreement by you (including without limitation any breach by you of any representation, obligation, undertaking, covenant and/or warranty); (ii) breach of Applicable Laws by you; (iii) claim relating to the Affiliate Sites; (iv) claim relating to your marketing and promotion of the Promoted Sites; (v) claim relating to your right to use the Marketing Materials on the Affiliate Sites; (vi) action taken by a Regulator; and/or (vii) act and/or omission by you.</p>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Confidentiality</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>Any information which we have provided you with, whether prior or during the term of this Agreement, shall be considered as our confidential information ("<strong className="text-foreground">Confidential Information</strong>"). You shall not use the Confidential Information for any purpose other than to perform your obligations under this Agreement. You must not disclose any Confidential Information to any other person, other than your employees, officers, representatives or advisers who need to know such information for the purposes of carrying out your obligations under this Agreement. You shall ensure that your employees, officers, representatives or advisers to whom you disclose the Confidential Information comply with this Section.</li>
                  <li>You shall not make any public announcement with respect to any aspect of this Agreement or your relationship with us, without our prior written approval.</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Disclaimers</h3>
                <div className="bg-card/50 border border-border/50 rounded-xl p-6 text-muted-foreground space-y-4">
                  <p>YOUR MARKETING AND ADVERTISING OF THE PROMOTED SITES IS AT YOUR OWN RISK. THE MARKETING MATERIALS, INSTRUCTIONS, POLICIES, GUIDELINES AND/OR CONTENT WHICH IS PROVIDED TO YOU AND/OR MADE AVAILABLE BY US IS PROVIDED "AS IS". WE EXPRESSLY DISCLAIM ALL WARRANTIES AND/OR REPRESENTATIONS OF ANY KIND, WHETHER EXPRESS OR IMPLIED WITH RESPECT TO THE MARKETING MATERIALS AND/OR ANY INSTRUCTIONS, POLICIES, GUIDELINES AND/OR CONTENT WHICH IS PROVIDED AND/OR MADE AVAILABLE BY US.</p>
                  <p>IT IS SOLELY YOUR RESPONSIBILITY TO ENSURE THAT YOUR MARKETING AND ADVERTISING OF THE PROMOTED SITES COMPLIES WITH APPLICABLE LAWS. IF YOU BELIEVE, HAVE ANY DOUBT AND/OR YOU ARE AWARE THAT THE MARKETING MATERIALS AND/OR INSTRUCTIONS, POLICIES, GUIDELINES AND/OR CONTENT DO NOT COMPLY WITH APPLICABLE LAWS, YOUR SOLE AND EXCLUSIVE REMEDY SHALL BE TO IMMEDIATELY CEASE MARKETING AND ADVERTISING THE PROMOTED SITES.</p>
                  <p>WE, OUR GROUP COMPANIES AND/OR THE OPERATORS SHALL HAVE NO LIABILITY WHATSOEVER WITH RESPECT TO YOUR MARKETING AND ADVERTISING OF THE PROMOTED SITES, YOUR USE OF THE MARKETING MATERIALS AND/OR YOUR ADHERENCE TO ANY INSTRUCTIONS, POLICIES, GUIDELINES AND/OR CONTENT, WHICH IS PROVIDED AND/OR MADE AVAILABLE BY US.</p>
                  <p>WE, OUR GROUP COMPANIES AND/OR THE OPERATORS MAKE NO EXPRESS OR IMPLIED WARRANTIES OR REPRESENTATIONS WITH RESPECT TO THE AFFILIATE PROGRAM, THE PROMOTED SITES AND/OR THE AFFILIATE PROGRAM SITE (INCLUDING WITHOUT LIMITATION WARRANTIES OF FITNESS, MERCHANTABILITY, COMPLIANCE WITH APPLICABLE LAWS, NON-INFRINGEMENT, OR ANY IMPLIED WARRANTIES ARISING OUT OF A COURSE OF PERFORMANCE, DEALING, OR TRADE USAGE). IN ADDITION, THE COMPANY MAKES NO REPRESENTATION THAT THE OPERATION OF THE PROMOTED SITES, MARKETING MATERIALS OR THE AFFILIATE PROGRAM SITE WILL BE UNINTERRUPTED OR ERROR-FREE, AND WE, OUR GROUP COMPANIES AND/OR THE OPERATORS WILL NOT BE LIABLE FOR THE CONSEQUENCES OF ANY INTERRUPTIONS OR ERRORS.</p>
                </div>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Limitation of Liability</h3>
                <div className="bg-card/50 border border-border/50 rounded-xl p-6 text-muted-foreground space-y-4">
                  <p>THE COMPANY SHALL NOT BE LIABLE IN CONTRACT, TORT (INCLUDING WITHOUT LIMITATION NEGLIGENCE) OR FOR BREACH OF STATUTORY DUTY OR IN ANY OTHER WAY FOR ANY: (I) ACTUAL AND/OR EXPECTED INDIRECT, SPECIAL OR CONSEQUENTIAL LOSS AND/OR DAMAGE; (II) LOSS OF OPPORTUNITY, LOSS OF ANTICIPATED SAVINGS AND/OR WASTED EXPENDITURE; (III) LOSS OF CONTRACTS, BUSINESS, PROFITS AND/OR REVENUES; (IV) LOSS OF GOODWILL AND/OR REPUTATION; AND/OR (V) LOSS OF DATA.</p>
                  <p>OUR AGGREGATE LIABILITY SHALL NOT EXCEED THE LOWER OF THE TOTAL COMMISSION PAID TO YOU UNDER THIS AGREEMENT OVER THE THREE (3) MONTH PERIOD PRECEDING THE DATE ON WHICH OUR LIABILITY AROSE AND 10,000 EUROS.</p>
                </div>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Personal Data</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>We collect and process your Personal Data and it may include certain personal information such as your e-mail addresses and transaction details, IP addresses, your name and surname and the name of your employees, if applicable.</li>
                  <li>By participating in the Affiliate Program and by using the Affiliate Program Site, you hereby acknowledge and accept Partnerstar's Privacy Policy, which is an inseparable part of this Agreement. We encourage you to read this Privacy Policy carefully as it sets out the terms of our processing of any Personal Data we collect from you, or that you provide voluntarily to us.</li>
                  <li>You warrant that you will process personal data strictly in accordance with EU General Data Protection Regulation 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data (the "<strong className="text-foreground">GDPR</strong>") and any other Applicable Laws and by entering into this Agreement, you shall be deemed to enter into the Data Protection Addendum in Schedule A of this Agreement.</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Sub Affiliates</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>You may introduce potential Sub-Affiliates to us.</li>
                  <li>Potential Sub Affiliates will be required to complete and submit an Application Form. We will review the Application Form and it is within our sole discretion to accept or reject it.</li>
                  <li>Each Sub Affiliate will be required to accept the terms and conditions as set out in this Agreement.</li>
                  <li>Sub-Affiliates will receive commission from us in accordance with the commission scheme as agreed between us and the Sub-Affiliate, subject to the terms of this Agreement.</li>
                  <li>You may receive a percentage of the commission paid to the Sub Affiliate subject to you and the Company agreeing to such and provided that the percentage of the commission paid to the Sub Affiliate which is to be paid to you is recorded through the Back Office (the "<strong className="text-foreground">Sub Affiliate Fee</strong>").</li>
                  <li>For the avoidance of doubt, you will not be entitled to receive any payment for any Sub-Affiliate introduced by a Sub-Affiliate which has been introduced by you.</li>
                  <li>You undertake that you shall not: (i) if you are a person, such Sub Affiliate shall not be any of your Relatives; or (ii) if you are an entity, such Sub Affiliate shall not be a director, officer employee of such entity or any member of its group of companies or the Relatives of such individuals.</li>
                  <li>In addition, you undertake that: (i) you shall not try to use the Sub-Affiliate scheme in any way whatsoever in bad faith; or (ii) offering or providing a Sub-Affiliate or potential Sub-Affiliate any incentive (either financial or otherwise) to become a Sub-Affiliate.</li>
                  <li>In the event we determine that you are in breach of the above undertakings, we may terminate the Agreement.</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Amending the Agreement</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>We may unilaterally amend the Affiliate Agreement at any time and at our sole discretion by posting an amended Affiliate Agreement on the Affiliate Program Site. You agree that any amendment will take effect from when the amended Affiliate Agreement is posted on the Affiliate Program Site. In addition, you acknowledge and agree that such posting constitutes sufficient provision of notice of such amendments.</li>
                  <li>Your continued participation in the Affiliate Program following the posting of the amended Affiliate Agreement will constitute binding acceptance by you of any such amendment. You should frequently visit the Affiliate Program Site and monitor the terms and conditions of this Affiliate Agreement.</li>
                  <li>If you do not agree to be bound by any amendment to the Agreement your sole recourse shall be to terminate the Agreement. This termination right is your only remedy in relation to any amendment made with respect to the Agreement.</li>
                  <li>Notwithstanding the other Sections contained in this Section, an IO may only be amended in writing and signed by the Company's and the Affiliate's authorised representatives.</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Suspension</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>We may temporarily suspend your Account at our sole discretion. In the event we suspend your Account:
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>we may withhold all Commission and Sub Affiliate Fee which is owed to you but which has not been paid to you prior to the suspension;</li>
                      <li>no Commission and Sub Affiliate Fee shall be generated during such period of suspension;</li>
                      <li>if there is an IO and/or Negotiated Plan in force at any time during the period of suspension and any Additional Payments become due and payable, we shall not be liable to pay you any Affiliate Payments; and</li>
                      <li>you must immediately cease marketing and promoting the Promoted Sites which includes without limitation ceasing to use the Marketing Materials during such period of suspension.</li>
                    </ul>
                  </li>
                  <li>If we lift the suspension of your Account:
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>you may begin to use the Marketing Materials to market and promote the Promoted Sites;</li>
                      <li>we shall pay you any Commission which is owed to you but which has not been paid to you prior to the suspension and which does not relate to any breach of the Agreement;</li>
                      <li>we may retain any Commission relating to any breach of the Agreement;</li>
                      <li>we shall pay you any Sub Affiliate Fee which is owed to you but which has not been paid to you prior to the suspension;</li>
                      <li>if there is an IO and/or Negotiated Plan in force following such period of suspension, the IO and/or Negotiated Plan (as applicable) shall continue on its terms following the period of suspension.</li>
                    </ul>
                  </li>
                  <li>We reserve the right to set-off any amounts already received by you which are related to a breach of the Agreement from any future Affiliate Payments payable to you.</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Force Majeure</h3>
                <p className="text-muted-foreground">If the Company is prevented or delayed in the performance of any of its obligations under this Agreement by Force Majeure, the Company shall have no liability in respect of the performance of its obligations as are prevented by the Force Majeure events during the continuation of such events. For the purposes of this Agreement "Force Majeure" means any cause beyond the reasonable control of the Company including, without limitation, act of God, war, insurrection, riot, civil disturbance, acts or attempted acts of terrorism, fire, explosion, flood, storm, theft or malicious damage, pandemic, epidemic, strike, lock-out, pandemic or other industrial dispute (whether involving the workforce of the party so prevented or any other party), third party injunction, national defence requirements, acts or regulations of national or local governments (including, without limitation, legislation or other regulation restricting, preventing or otherwise prohibiting the provision or availability of internet-based sports betting or casino or poker gaming), inability to obtain essential power, raw materials, labour, malfunction of machinery or apparatus. Where the Force Majeure event continues for a period exceeding 30 days, then the Company retains the right to terminate this Agreement immediately.</p>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">General</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>In case of any discrepancy between the meanings of any translated versions of this Agreement, the meaning of the English language version shall prevail.</li>
                  <li>The Agreement shall constitute the entire agreement between the parties with respect to the subject matter hereof and the Agreement cancels and supersedes all previous understandings and agreements, both oral and written, between the parties in respect of the subject matter of this Agreement.</li>
                  <li>You shall not, without our prior written consent assign, transfer or subcontract all or any of your rights or obligations under the Agreement. In addition, we shall be entitled to assign, transfer or subcontract any or all of our rights and obligations under the Agreement to any Group Company without your consent.</li>
                  <li>We shall be entitled to exercise any of our rights or fulfil any of our obligations hereunder (including its payment obligations) through any Group Company.</li>
                  <li>You and the Company are independent contractors, and nothing in this Agreement will create any partnership, joint venture, agency, franchise, sales representative, or employment relationship between the parties.</li>
                  <li>The Company's failure to enforce your strict performance of any provision of this Agreement will not constitute a waiver of our right to subsequently enforce such provision or any other provision of this Agreement.</li>
                  <li>Other than any Group Company, no person and/or entity who is not a party to this Agreement shall have any right to enforce any term of this Agreement.</li>
                  <li>If any clause in the Agreement (or any part thereof) is rendered void or unenforceable by any court or authority of competent jurisdiction then all other provisions of the Agreement will remain in full force and effect and will not in any way be impaired. With respect to the provision which is rendered void or unenforceable the parties shall agree a replacement provision which is as close as is legally permissible to the provision found invalid or unenforceable.</li>
                  <li>During the term of the Agreement and after, you shall not in any way directly or indirectly make any disparaging, negative, uncomplimentary, derogatory or defamatory statements with regards to us, any Group Company, any of their respective business interests which includes the Affiliate Program, the Promoted Sites or the Operator.</li>
                  <li>Any provisions hereof which expressly or by their nature are required to survive termination or expiration of this Agreement in order to achieve their purpose shall so survive until it shall no longer be necessary for them to survive in order to achieve that purpose.</li>
                  <li>This Agreement shall be governed by the laws of Malta, without giving effect to principles of the conflict of laws. Any disputes arising out of or relating to this Agreement, including the interpretation or enforcement thereof, shall be subject to the exclusive jurisdiction of the courts of Malta.</li>
                </ol>
              </section>

              <section>
                <h2 className="font-display text-3xl text-foreground mt-12 mb-6">Schedule A - Data Protection Agreement</h2>
                <p className="text-muted-foreground mb-4">Company and Affiliate ("<strong className="text-foreground">Partner</strong>"), (each a "<strong className="text-foreground">Party</strong>", together the "<strong className="text-foreground">Parties</strong>"), have entered into an agreement ("<strong className="text-foreground">Agreement</strong>") for the provision of the services ("<strong className="text-foreground">Services</strong>"), and are agreeing to these Data Protection Terms ("<strong className="text-foreground">DPA</strong>").</p>
                <p className="text-muted-foreground mb-4">This DPA is entered into by Company and Partner and supplements the Agreement. This DPA will be effective, and replaces any previously applicable terms relating to its subject matter, from the Terms Effective Date.</p>
                <p className="text-muted-foreground mb-4">If you are accepting this DPA on behalf of Partner, you warrant that: (a) you have full legal authority to bind Partner to this DPA; (b) you have read and understand this DPA; and (c) you agree, on behalf of Partner, to this DPA.</p>

                <h4 className="font-display text-xl text-foreground mt-6 mb-3">Introduction</h4>
                <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                  <li>This DPA reflects the Parties' agreement on the processing of Personal Data in connection with the Data Protection Laws.</li>
                  <li>Any ambiguity in this DPA shall be resolved to permit the Parties to comply with all Data Protection Laws.</li>
                  <li>In the event and to the extent that the Data Protection Laws impose stricter obligations on the Parties than under this DPA, the Data Protection Laws shall prevail.</li>
                </ol>

                <h4 className="font-display text-xl text-foreground mt-6 mb-3">Definitions</h4>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong className="text-foreground">"Approved Jurisdiction"</strong> means a member state of the European Economic Area, or other jurisdiction as may be approved as having adequate legal protections for data by the European Commission.</p>
                  <p><strong className="text-foreground">"Data Protection Laws"</strong> means, as applicable, any and/or all applicable domestic and foreign laws, rules, directives and regulations pertaining to data privacy, data security and/or the protection of Personal Data, including the GDPR and e-Privacy Directive.</p>
                  <p><strong className="text-foreground">"Data Subject"</strong> means an individual to whom Personal Data relates.</p>
                  <p><strong className="text-foreground">"Security Incident"</strong> means any accidental or unlawful destruction, loss, alteration, unauthorized disclosure of, or access to, Personal Data.</p>
                  <p><strong className="text-foreground">"Standard Contractual Clauses"</strong> means the applicable module of the standard contractual clauses for the transfer of personal data to third countries pursuant to Regulation (EU) 2016/679.</p>
                </div>

                <h4 className="font-display text-xl text-foreground mt-6 mb-3">Roles and Restrictions on Processing</h4>
                <p className="text-muted-foreground mb-3">If Partner has access to or otherwise processes Personal Data pursuant to the Agreement, then Partner shall:</p>
                <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                  <li>only process the Personal Data in accordance with Company's documented instructions and on its behalf, and in accordance with the Agreement and this DPA, unless required otherwise under applicable laws;</li>
                  <li>take reasonable steps to ensure the reliability of its staff and any other person acting under its supervision who may come into contact with, or otherwise have access to and process Personal Data;</li>
                  <li>promptly assist Company as needed to cooperate with and respond to requests from supervisory authorities, Data Subjects, customers, or others to provide information related to Partner's processing of Personal Data;</li>
                  <li>notify the Company without undue delay, and no later than twenty four (24) hours, after becoming aware of a Security Incident;</li>
                  <li>provide full, reasonable cooperation and assistance to Company in ensuring compliance with notification obligations of Security Incidents and communication obligations to Data Subjects;</li>
                  <li>only process or use Personal Data on its systems or facilities to the extent necessary to perform its obligations under the Agreement;</li>
                  <li>maintain accurate written records of any and all the processing activities of any Personal Data carried out under the Agreement;</li>
                  <li>make all reasonable efforts to ensure that Personal Data are accurate and up to date at all times while in its custody or under its control;</li>
                  <li>not lease, sell or otherwise distribute Personal Data;</li>
                  <li>promptly notify Company of any investigation, litigation, arbitrated matter or other dispute relating to the Partner or the processing of Personal Data under the Agreement;</li>
                  <li>upon termination of the Agreement, or upon Company's written request, Partner shall cease to process any Personal Data received from Company, and will either return the Personal Data or securely destroy or erase all Personal Data in its possession or control.</li>
                </ol>

                <h4 className="font-display text-xl text-foreground mt-6 mb-3">Sub-processing</h4>
                <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                  <li>Partner shall not subcontract its obligations under this DPA to another person or entity ("Sub-processor(s)"), in whole or in part, without Company's prior written approval, and shall inform the Company of any intended changes concerning the addition or replacement of other processors no later than thirty (30) days prior to such intended change. Company shall have the right to object to the appointment of any new Sub-processor within fourteen (14) days of having been notified.</li>
                  <li>Partner will execute a written agreement with such approved Sub-processor containing terms providing at least equivalent protection of Personal Data as provided under this DPA.</li>
                  <li>Partner shall have a written security policy that provides guidance to its Sub-processors to ensure the security, confidentiality, integrity and availability of Personal Data.</li>
                  <li>Partner shall be liable for the acts or omissions of Sub-processors to the same extent it is liable for its own actions or omissions under this DPA and Data Protection Laws.</li>
                </ol>

                <h4 className="font-display text-xl text-foreground mt-6 mb-3">Transfer of Personal Data</h4>
                <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                  <li>Where the GDPR is applicable, to the extent Partner and/or Partner's Sub-processor processes Personal Data outside the EEA or an Approved Jurisdiction, such transfer shall be based on one of the appropriate safeguards specified in Article 46 of the GDPR.</li>
                  <li>In performing its obligations under this DPA, a party may provide Personal Data to the other party. Each party shall process Personal Data only for the purposes set forth in the Agreement or as otherwise agreed to in writing by the parties.</li>
                  <li>If Partner and/or its Sub-processors intend to rely on Standard Contractual Clauses, then if the Standard Contractual Clauses are superseded by new or modified Standard Contractual Clauses, the new or modified Standard Contractual Clauses shall be deemed to be incorporated into this DPA.</li>
                </ol>

                <h4 className="font-display text-xl text-foreground mt-6 mb-3">Security Standards</h4>
                <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                  <li>The Parties shall implement and maintain commercially reasonable and appropriate physical, technical and organizational security measures to protect Personal Data against accidental or unlawful destruction; accidental loss, alteration, unauthorized disclosure or access to personal data transmitted, stored or otherwise processed; and all other unlawful forms of processing.</li>
                  <li>To the extent that Partner processes Special Categories of Data, the security measures shall also include, at a minimum: (i) routine risk assessments; (ii) regular testing and monitoring; and (iii) encryption of Special Categories of Data while "at rest" and during transmission.</li>
                </ol>

                <h4 className="font-display text-xl text-foreground mt-6 mb-3">General DPA Provisions</h4>
                <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                  <li>If this DPA does not specifically address a particular data security or privacy standard or obligation, Partner will use appropriate, generally accepted practices to protect the confidentiality, security, privacy, integrity, availability, and accuracy of Personal Data.</li>
                  <li>If Partner is unable to provide the level of protection as required herein or to abide to its obligations under this DPA or Data Protection Laws, Partner shall immediately notify Company and cease processing. Any non-compliance shall be deemed a material breach of the Agreement.</li>
                  <li>Company shall have the right to require promptly from Partner all information necessary to, and conduct its own audit and/or inspections of Partner in order to demonstrate compliance with the DPA and Data Protection Laws.</li>
                  <li>Partner will indemnify Company and hold Company harmless from any cost, charge, damages, expenses or losses incurred as a result of Partner's breach of any of the provisions of these clauses.</li>
                </ol>

                <h4 className="font-display text-xl text-foreground mt-6 mb-3">Priority and Changes</h4>
                <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                  <li>If there is any conflict or inconsistency between the terms of this DPA and the remainder of the Agreement then, the terms of this DPA will govern.</li>
                  <li>No changes, modifications or amendments to this DPA shall be valid or binding unless made in writing and signed by both Parties.</li>
                  <li>If any of the Data Protection Laws are superseded by new or modified Data Protection Laws, the new or modified Data Protection Laws shall be deemed to be incorporated into this DPA.</li>
                </ol>
              </section>

              <section className="border-t border-border/50 pt-8 mt-12">
                <p className="text-muted-foreground text-sm">
                  Last updated: January 2026
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  For any questions regarding these Terms & Conditions, please contact us at <a href="mailto:affiliates@partnerstar.com" className="text-primary hover:underline">affiliates@partnerstar.com</a>
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

export default Terms;
