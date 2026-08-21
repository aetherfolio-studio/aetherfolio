const fs = require('fs');

function buildTOS() {
    const baseHtml = fs.readFileSync('index.html', 'utf8');
    
    const headMatch = baseHtml.match(/<head>(.*?)<\/head>/s);
    const headContent = headMatch ? headMatch[1] : '';

    const headerMatch = baseHtml.match(/(<header class="fixed top-0.*?<\/header>)/s);
    let headerContent = headerMatch ? headerMatch[1] : '';
    
    // In TOS there is no active nav item, so remove aria-current if present.
    // However, index.html doesn't have any aria-current for desktop anyway.

    const footerMatch = baseHtml.match(/(<footer class="w-full pt-section-gap.*<\/html>)/s);
    const footerContent = footerMatch ? footerMatch[1] : '';

    const mainContent = `
<main class="w-full pt-32 pb-section-gap px-margin-edge">
  <div class="max-w-4xl mx-auto flex flex-col gap-16">
    
    <div class="flex flex-col gap-4 border-b border-outline-variant/30 pb-12">
      <p class="font-label-caps text-label-caps text-primary uppercase tracking-[0.4em]">Legal</p>
      <h1 class="font-display-xl-mobile md:text-[80px] text-on-surface tracking-tighter">Terms of Service</h1>
      <p class="font-body-md text-on-surface-variant/70">Last updated: August 2026</p>
    </div>

    <div class="flex flex-col gap-12 font-body-md text-on-surface-variant">
      
      <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Aetherfolio website (the "Service") operated by Aetherfolio ("us", "we", or "our"). Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.</p>

      <div class="flex flex-col gap-4">
        <h3 class="font-headline-md text-[32px] text-on-surface">1. Acceptance of Terms</h3>
        <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
      </div>

      <div class="flex flex-col gap-4">
        <h3 class="font-headline-md text-[32px] text-on-surface">2. Service Description and Scope</h3>
        <p>Aetherfolio provides premium web development, digital design, and software engineering services. We reserve the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. We shall not be liable to you or to any third party for any modification, price change, suspension, or discontinuance of the Service. The materials and information provided on this site are for general informational purposes.</p>
      </div>

      <div class="flex flex-col gap-4">
        <h3 class="font-headline-md text-[32px] text-on-surface">3. User Registration and Account Security</h3>
        <p>To use certain features of the Service (such as project dashboards or client portals), you may be required to register for an account. You are solely responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device. You agree to accept responsibility for all activities that occur under your account or password. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
      </div>

      <div class="flex flex-col gap-4">
        <h3 class="font-headline-md text-[32px] text-on-surface">4. Intellectual Property Rights</h3>
        <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Aetherfolio and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Aetherfolio.</p>
        <p>For commissioned client projects, all custom code, designs, and assets created during a project remain the intellectual property of Aetherfolio until final delivery. Upon final delivery, full ownership and licensing rights transfer to the client as specified in the individual project contract.</p>
      </div>

      <div class="flex flex-col gap-4">
        <h3 class="font-headline-md text-[32px] text-on-surface">5. Acceptable Use and Conduct</h3>
        <p>You agree not to use the Service to:</p>
        <ul class="list-disc pl-8 flex flex-col gap-2">
            <li>Violate any local, state, national, or international law or regulation.</li>
            <li>Transmit any material that is abusive, harassing, tortious, defamatory, vulgar, pornographic, obscene, libelous, or otherwise objectionable.</li>
            <li>Interfere with or disrupt the Service or servers or networks connected to the Service.</li>
            <li>Attempt to gain unauthorized access to any portion of the Service or any other accounts, computer systems, or networks connected to the Service.</li>
        </ul>
      </div>

      <div class="flex flex-col gap-4">
        <h3 class="font-headline-md text-[32px] text-on-surface">6. Limitation of Liability</h3>
        <p>In no event shall Aetherfolio, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.</p>
      </div>

      <div class="flex flex-col gap-4">
        <h3 class="font-headline-md text-[32px] text-on-surface">7. Disclaimer of Warranties</h3>
        <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.</p>
        <p>Aetherfolio does not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements.</p>
      </div>

      <div class="flex flex-col gap-4">
        <h3 class="font-headline-md text-[32px] text-on-surface">8. Termination</h3>
        <p>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms. If you wish to terminate your account, you may simply discontinue using the Service or initiate an account deletion from your Settings dashboard.</p>
      </div>

      <div class="flex flex-col gap-4">
        <h3 class="font-headline-md text-[32px] text-on-surface">9. Governing Law</h3>
        <p>These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which Aetherfolio operates, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>
      </div>

      <div class="flex flex-col gap-4">
        <h3 class="font-headline-md text-[32px] text-on-surface">10. Changes to Terms</h3>
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms.</p>
      </div>

      <div class="flex flex-col gap-4">
        <h3 class="font-headline-md text-[32px] text-on-surface">11. Contact Information</h3>
        <p>If you have any questions, concerns, or requests regarding these Terms of Service, please contact us immediately via the contact form on our website.</p>
      </div>

    </div>
  </div>
</main>
`;

    const finalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
${headContent}
</head>
<body class="bg-background font-body-md text-on-background selection:bg-primary/30 relative" id="mainBody">
<canvas id="aether-fluid-canvas" class="fixed inset-0 w-full h-full pointer-events-none z-0"></canvas>
<div class="fixed inset-0 mouse-gradient"></div>
${headerContent}
${mainContent}
${footerContent}
`;

    fs.writeFileSync('tos.html', finalHtml, 'utf8');
    console.log("tos.html successfully built!");
}

buildTOS();
