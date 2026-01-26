import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Terms = () => {
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
                  <p><strong className="text-foreground">Affiliate Site or Affiliate Sites</strong> means the websites, mobile applications which you own and operate or Sent Marketing, which you detail in your Application Form or which is agreed to in an IO or a Negotiated Plan.</p>
                  <p><strong className="text-foreground">Affiliate Payments</strong> means, if and as applicable, the Revenue Share Commission, CPA Commission, Hybrid Commission, Fixed Fee, Listing Fee and/or Sub Affiliate Fee that the Affiliate is to receive.</p>
                  <p><strong className="text-foreground">Applicable Laws</strong> means all applicable laws, directives, regulations, marketing guidelines, rules, mandatory codes of practice or conduct, standards, judgments, judicial orders, ordinances and decrees imposed by law or any competent governmental or regulatory authority or agency.</p>
                  <p><strong className="text-foreground">Back Office</strong> means the software which is used by the Company to manage the Affiliate Program.</p>
                  <p><strong className="text-foreground">Bonuses</strong> means any credits, bonus, bonus points or other promotional amounts.</p>
                  <p><strong className="text-foreground">CPA Commission</strong> means if and as applicable, a fixed payment amount that the Affiliate is to receive for each person who during the term of the relevant IO or Negotiated Plan: (i) becomes a Customer on a Promoted Site in accordance with the terms of the Agreement; (ii) makes a minimum real money deposit of an amount as determined in such IO or as agreed in a Negotiated Plan on such Promoted Site; and (iii) wagers a minimum amount as determined in such IO or as agreed in a Negotiated Plan on such Promoted Site.</p>
                  <p><strong className="text-foreground">Commission</strong> means if and as applicable, the Revenue Share Commission, CPA Commission and/or Hybrid Commission that the Affiliate is to receive.</p>
                  <p><strong className="text-foreground">Company, us, we or our</strong> means the company operating the affiliate program.</p>
                  <p><strong className="text-foreground">Customer</strong> means a person who is not located in the Prohibited Territories, who has directly entered a Promoted Site through the Marketing Materials placed on an Affiliate Site and is identified by us as being sent by the Affiliate through the Tracking Link.</p>
                  <p><strong className="text-foreground">Deductible Costs</strong> means any third party fees (including without limitation, licensing fees, progressive jackpot contributions, transaction fees, game royalties, payment processing fees, end-user verification and validation fees, software royalties, any game content fees) incurred by the Company, any Group Company and/or the Operator.</p>
                  <p><strong className="text-foreground">Fraud</strong> means any fraudulent or abusive act determined by us, any Group Company or the Operator regardless of whether any such action has resulted in any type of harm or damage.</p>
                  <p><strong className="text-foreground">Guidelines</strong> means the guidelines we may, at our sole and absolute discretion, provide to you by email or which may be made available on the Affiliate Program Site.</p>
                  <p><strong className="text-foreground">Group Company or Group Companies</strong> means any entity directly or indirectly controlling, controlled by, or under common control with the Company.</p>
                  <p><strong className="text-foreground">Hybrid Commission</strong> means if and as applicable, payment that the Affiliate is to receive based on a combination of CPA Commission and Revenue Share Commission with respect to each Customer.</p>
                  <p><strong className="text-foreground">Intellectual Property Rights</strong> means any and all intellectual property rights, of all types or nature whatsoever, including, without limitation, patent, copyright, design rights, trademarks, trade dress, data base rights, applications for any of the above, moral rights, know-how, trade secrets, domain names, URLs, trade names.</p>
                  <p><strong className="text-foreground">IO or Insertion Order</strong> means an insertion order which is signed by the Company's and the Affiliate's authorised representatives, which lasts for specific duration and which may contain a different Commission to that of the Standard Commission.</p>
                  <p><strong className="text-foreground">Legal Age or Legally of Age</strong> means the higher of: (i) 18 years of age; and (ii) the legal age for real money gambling in the jurisdiction you are located in.</p>
                  <p><strong className="text-foreground">Marketing Materials</strong> means the online marketing materials (such as banner advertisements, button links and text links) which contain the Tracking Links provided by us or made available for your use through the Affiliate Program Site.</p>
                  <p><strong className="text-foreground">Net Revenue</strong> means in a calendar month with respect to the Promoted Site on which individuals became Customers in relation to a Revenue Share Commission or a Hybrid Commission, the aggregate of such Customers real money bets less applicable deductions.</p>
                  <p><strong className="text-foreground">Operator</strong> means the operator and/or owner of the Promoted Site.</p>
                  <p><strong className="text-foreground">Promoted Site or Promoted Sites</strong> means a website or application which is promoted through the Affiliate Program and which is promoted through the Marketing Materials which you use.</p>
                  <p><strong className="text-foreground">Revenue Share Commission</strong> means if and as applicable, a percentage of the Net Revenue as detailed on the Affiliate Program Site that the Affiliate is to receive for each Customer.</p>
                  <p><strong className="text-foreground">Tracking Link</strong> means a tracking URL through which we track the number of Customers, directed to the respective Promoted Sites by you.</p>
                </div>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Application Form and Becoming a Member of the Affiliate Program</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>To become a member of the Affiliate Program, you must complete the Application Form.</li>
                  <li>You must ensure that the Application Form includes all the information requested by us. If the information provided is incomplete or inaccurate, this may result in a delay in the review of your Application Form or a rejection of your application to join the Affiliate Program.</li>
                  <li>If you are a person, participation in the Affiliate Program is only permitted if you are Legally of Age or older. If you are an entity, you can have no one working for you who is below the Legal Age.</li>
                  <li>It is at our sole discretion whether to accept your Application Form and accept you to the Affiliate Program, and we shall not have any liability to you or to anyone else in relation to a rejected Application Form.</li>
                  <li>We will notify you by email as to whether or not your Application Form has been approved and you have been accepted to the Affiliate Program.</li>
                  <li>In the event we reject your Application Form and your participation in the Affiliate Program, the Agreement will immediately terminate.</li>
                  <li>You shall not market or promote the Promoted Sites until we have notified you by email that your Application Form and your participation in the Affiliate Program has been approved ("<strong className="text-foreground">Application Approval</strong>").</li>
                  <li>The Company reserves at any time to request further documentation and information from you.</li>
                  <li>In the event that any of the information provided by you to us is out of date or becomes incorrect, you must immediately change such details through the Affiliate Account.</li>
                  <li>The Affiliate Account is solely for your own benefit. You shall not allow any third party to use your account, password or identity.</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Your Use of the Marketing Materials</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>From the Application Approval until such time as your membership of the Affiliate Program terminates, you may only use the Marketing Materials to market and promote the Promoted Sites on the Affiliate Sites in accordance with the terms of this Agreement.</li>
                  <li>You shall only use the most up to date Marketing Materials to promote the Promoted Sites.</li>
                  <li>You shall not alter, modify or amend the Marketing Materials which includes without limitation the Tracking Links, unless we provide our prior written approval.</li>
                  <li>Your use of the Marketing Materials must comply with Applicable Laws.</li>
                  <li>You shall not use the Marketing Materials on any Affiliate Site which breaches Applicable Laws.</li>
                  <li>You shall not use the Marketing Materials on any Affiliate Site which infringes third party Intellectual Property Rights.</li>
                  <li>We may request that you change the positioning of the Marketing Materials, cease using the Marketing Materials, or use different Marketing Materials and you must immediately comply with such request.</li>
                  <li>You shall not provide the Marketing Materials to any third party.</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Your Marketing of the Promoted Sites</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>You undertake to immediately comply with the Guidelines and any additional policies, instructions, terms and conditions which we may provide you by email or which may be made available on the Affiliate Program Site.</li>
                  <li>You shall comply with all Applicable Laws and the Affiliate Sites shall comply with all Applicable Laws.</li>
                  <li>You undertake that you shall be the owner and operator of the Affiliate Sites.</li>
                  <li>The Affiliate Sites shall not infringe third party Intellectual Property Rights.</li>
                  <li>You will immediately adhere to any instructions provided by us relating to the marketing of the Promoted Sites.</li>
                  <li>The Affiliate Sites must not be designed to appeal to individuals that are below the Legal Age.</li>
                  <li>The Affiliate Sites must not be designed to distribute any spyware, adware, trojans, viruses, worms, spybots, keyloggers or any other form of unwanted threats.</li>
                  <li>You shall at all times market and promote the Promoted Sites in a socially responsible manner.</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Commission</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>From the Application Approval, the default Revenue Share Commission shall apply to the Customers sent by you in accordance with this Agreement ("<strong className="text-foreground">Standard Commission</strong>").</li>
                  <li>From time to time, we may agree with you a Negotiated Plan that is different from the Standard Commission, at which point the Standard Commission is suspended for the duration of the Negotiated Plan.</li>
                  <li>The Affiliate undertakes that it shall not become a Customer and the Affiliate shall not be liable to receive any Commission with respect to such.</li>
                  <li>You acknowledge and agree that our measurements and calculations in relation to the number of Customers and the calculation of Commission and Sub Affiliate Fee shall be final.</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Payment</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>All Affiliate Payments shall be paid to you in Euros or as otherwise agreed.</li>
                  <li>We shall make the number of Customers, Commission and Sub Affiliate Fee generated in accordance with this Agreement available to you through the Affiliate Program Website.</li>
                  <li>If the total amount of the Affiliate Payments is less than EUR 100 for any calendar month, the balance will be transferred to the next calendar month's Affiliate Payments until the total amount becomes EUR 100 or higher.</li>
                  <li>We shall pay the Affiliate Payments to the payment method you select on the Application Form ("<strong className="text-foreground">Payment Method</strong>").</li>
                  <li>With respect to any amount owed to you under this Agreement, you shall be liable for any taxation and charges, duties, imposts, contributions, levies or liabilities payable on such amount in any jurisdiction.</li>
                  <li>We apply a No Negative Carry Over Policy with respect to a Revenue Share Commission. The No Negative Carry Over Policy means that if the aggregate amount of Net Revenue in any calendar month is negative, the Revenue Share Commission will be set to zero for such calendar month.</li>
                  <li>We reserve the right to set-off any amounts which you owe to us from the Affiliate Payments payable to you.</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Fraud</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>We reserve the right to review for possible Fraud, regardless of whether such Fraud may be on the part of any Customer or on your part.</li>
                  <li>In the event that we investigate for Fraud any such investigation shall not take longer than 90 days. Furthermore, in the event that we investigate for Fraud, we may suspend your Account.</li>
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
                  <li>register as a Customer, or authorize or assist any person to register as a Customer;</li>
                  <li>cause any of the Promoted Sites to open in a person's browser other than as a result of the person clicking on the Marketing Materials;</li>
                  <li>attempt to intercept or redirect traffic from the Promoted Sites;</li>
                  <li>violate the terms of use and any applicable policies of any search engines;</li>
                  <li>market or promote any Promoted Site in the Prohibited Territories;</li>
                  <li>attempt to circumvent any restriction in place to prevent potential Customers from Prohibited Territories;</li>
                  <li>provide Customers' details to any third party.</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Intellectual Property Rights</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>From the Application Approval and for the remainder of the term of the Agreement, subject to your compliance with the terms of this Agreement, we grant to you a non-exclusive, revocable, non-sublicensable, non-assignable, and non-transferable licence to use the Marketing Materials and their content solely for the purposes of you displaying the Marketing Materials on the Affiliate Sites.</li>
                  <li>You acknowledge that the Company, its Group Companies or the Operators owns or has the necessary licenses, permits and consents to use all Intellectual Property Rights in relation to the Marketing Materials and the brands and trademarks relating to the Promoted Sites (collectively and individually the "<strong className="text-foreground">Marks</strong>").</li>
                  <li>All Intellectual Property Rights and any goodwill arising in the Marketing Materials shall remain our, our Group Companies or the Operators property.</li>
                  <li>The Affiliate Sites shall not in any way resemble the look or feel of the Promoted Sites.</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Representations and Warranties</h3>
                <p className="text-muted-foreground mb-4">You hereby represent and warrant to the Company that:</p>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>all the documents and information which you provide us with, including without limitation on the Application Form are true, accurate and complete;</li>
                  <li>you will immediately comply with our instructions and the Guidelines;</li>
                  <li>you will comply with all Applicable Laws during the term of the Agreement;</li>
                  <li>you shall comply with the Schedule below which forms part of this Agreement;</li>
                  <li>you shall obtain, maintain and comply with all approvals, permits, certificates authorisations, licensees, consents which you require;</li>
                  <li>you will not provide the Marketing Materials to any third party;</li>
                  <li>there is no legal, commercial, contractual or other restriction, which precludes or might preclude you from fully performing your obligations;</li>
                  <li>if you are an individual rather than a legal entity, you are Legally of Age;</li>
                  <li>you have evaluated the laws relating to your activities and obligations as set out in this Agreement.</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Duration, Termination and Consequences of Termination</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>This Agreement shall start from the Agreement Acceptance and shall continue thereafter until it is terminated in accordance with this Agreement.</li>
                  <li>Either party may terminate the Agreement, any IO and/or Negotiated Plan, by providing twenty-four (24) hours prior notice to the other by email. Your termination of the Agreement is subject to you sending an email to <a href="mailto:affiliates@partnerstar.com" className="text-primary hover:underline">affiliates@partnerstar.com</a> with the Subject line "Termination".</li>
                  <li>Your participation in the Affiliate Program terminates upon termination of the Agreement.</li>
                  <li>We may terminate the Agreement on written notice to you by email in the event that you are in breach of any of the terms of this Agreement.</li>
                  <li>Immediately following the termination of the Agreement you must immediately: (a) cease all use of the Marketing Materials and remove all of the Marketing Materials from the Affiliate Sites; (b) return to us any Confidential Information in your control or possession; and (c) cease marketing the Promoted Sites.</li>
                  <li>On termination of the Agreement, all rights and licences granted to you in this Agreement shall immediately terminate.</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Indemnification</h3>
                <p className="text-muted-foreground">You hereby agree to on our written demand indemnify and hold harmless us, the Group Companies, the Operator and our and each of their respective shareholders, officers, directors, employees, agents, successors and assigns from and against any and all losses, penalties, fines, demands, claims, damages, costs, expenses and liabilities suffered or incurred, directly or indirectly, as a consequence of any breach of the Agreement by you, breach of Applicable Laws by you, claim relating to the Affiliate Sites, or any act and/or omission by you.</p>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Confidentiality</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>Any information which we have provided you with, whether prior or during the term of this Agreement, shall be considered as our confidential information ("<strong className="text-foreground">Confidential Information</strong>"). You shall not use the Confidential Information for any purpose other than to perform your obligations under this Agreement.</li>
                  <li>You shall not make any public announcement with respect to any aspect of this Agreement or your relationship with us, without our prior written approval.</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Disclaimers</h3>
                <div className="bg-card/50 border border-border/50 rounded-xl p-6 text-muted-foreground space-y-4">
                  <p>YOUR MARKETING AND ADVERTISING OF THE PROMOTED SITES IS AT YOUR OWN RISK. THE MARKETING MATERIALS, INSTRUCTIONS, POLICIES, GUIDELINES AND/OR CONTENT WHICH IS PROVIDED TO YOU AND/OR MADE AVAILABLE BY US IS PROVIDED "AS IS".</p>
                  <p>IT IS SOLELY YOUR RESPONSIBILITY TO ENSURE THAT YOUR MARKETING AND ADVERTISING OF THE PROMOTED SITES COMPLIES WITH APPLICABLE LAWS.</p>
                  <p>WE, OUR GROUP COMPANIES AND/OR THE OPERATORS MAKE NO EXPRESS OR IMPLIED WARRANTIES OR REPRESENTATIONS WITH RESPECT TO THE AFFILIATE PROGRAM, THE PROMOTED SITES AND/OR THE AFFILIATE PROGRAM SITE.</p>
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
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Sub Affiliates</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>You may introduce potential Sub-Affiliates to us.</li>
                  <li>Potential Sub Affiliates will be required to complete and submit an Application Form. We will review the Application Form and it is within our sole discretion to accept or reject it.</li>
                  <li>Each Sub Affiliate will be required to accept the terms and conditions as set out in this Agreement.</li>
                  <li>Sub-Affiliates will receive commission from us in accordance with the commission scheme as agreed between us and the Sub-Affiliate, subject to the terms of this Agreement.</li>
                  <li>You may receive a percentage of the commission paid to the Sub Affiliate subject to you and the Company agreeing to such ("<strong className="text-foreground">Sub Affiliate Fee</strong>").</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Amending the Agreement</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>We may unilaterally amend the Affiliate Agreement at any time and at our sole discretion by posting an amended Affiliate Agreement on the Affiliate Program Site.</li>
                  <li>Your continued participation in the Affiliate Program following the posting of the amended Affiliate Agreement will constitute binding acceptance by you of any such amendment.</li>
                  <li>If you do not agree to be bound by any amendment to the Agreement your sole recourse shall be to terminate the Agreement.</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Force Majeure</h3>
                <p className="text-muted-foreground">If the Company is prevented or delayed in the performance of any of its obligations under this Agreement by Force Majeure, the Company shall have no liability in respect of the performance of its obligations as are prevented by the Force Majeure events during the continuation of such events. For the purposes of this Agreement "Force Majeure" means any cause beyond the reasonable control of the Company including, without limitation, act of God, war, insurrection, riot, civil disturbance, acts or attempted acts of terrorism, fire, explosion, flood, storm, theft or malicious damage, pandemic, epidemic, strike, lock-out, pandemic or other industrial dispute, third party injunction, national defence requirements, acts or regulations of national or local governments.</p>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">General</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>In case of any discrepancy between the meanings of any translated versions of this Agreement, the meaning of the English language version shall prevail.</li>
                  <li>The Agreement shall constitute the entire agreement between the parties with respect to the subject matter hereof.</li>
                  <li>You shall not, without our prior written consent assign, transfer or subcontract all or any of your rights or obligations under the Agreement.</li>
                  <li>We shall be entitled to exercise any of our rights or fulfil any of our obligations hereunder through any Group Company.</li>
                  <li>You and the Company are independent contractors, and nothing in this Agreement will create any partnership, joint venture, agency, franchise, sales representative, or employment relationship between the parties.</li>
                  <li>The Company's failure to enforce your strict performance of any provision of this Agreement will not constitute a waiver of our right to subsequently enforce such provision.</li>
                  <li>If any clause in the Agreement is rendered void or unenforceable by any court or authority of competent jurisdiction then all other provisions of the Agreement will remain in full force and effect.</li>
                  <li>During the term of the Agreement and after, you shall not in any way directly or indirectly make any disparaging, negative, uncomplimentary, derogatory or defamatory statements with regards to us.</li>
                  <li>This Agreement shall be governed by the laws of Malta, without giving effect to principles of the conflict of laws. Any disputes arising out of or relating to this Agreement shall be subject to the exclusive jurisdiction of the courts of Malta.</li>
                </ol>
              </section>

              <section>
                <h3 className="font-display text-2xl text-foreground mt-8 mb-4">Data Protection</h3>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>We collect and process your Personal Data and it may include certain personal information such as your e-mail addresses and transaction details, IP addresses, your name and surname and the name of your employees, if applicable.</li>
                  <li>By participating in the Affiliate Program and by using the Affiliate Program Site, you hereby acknowledge and accept Partnerstar's Privacy Policy.</li>
                  <li>You warrant that you will process personal data strictly in accordance with EU General Data Protection Regulation 2016/679 (GDPR) and any other Applicable Laws.</li>
                </ol>
              </section>

              <section className="border-t border-border/50 pt-8 mt-12">
                <p className="text-muted-foreground text-sm">
                  Last updated: January 2024
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
