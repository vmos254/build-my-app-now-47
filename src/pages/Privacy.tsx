export const Privacy = () => (
  <div className="container max-w-3xl mx-auto px-4 py-12 font-ui text-foreground">
    <h1 className="font-display text-4xl mb-2">Privacy Policy</h1>
    <p className="text-sm text-muted-foreground mb-8">Last updated: May 12, 2025</p>

    <section className="space-y-6 text-sm leading-relaxed">
      <p>
        Lumen – Catholic Bible ("we", "us", or "our") is committed to protecting your privacy.
        This policy explains what information we collect, how we use it, and your rights.
      </p>

      <div>
        <h2 className="font-semibold text-base mb-2">1. Information We Collect</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Account data:</strong> email address and password when you create an account.</li>
          <li><strong>Usage data:</strong> bookmarks, reading progress, and chapter history stored so your experience syncs across devices.</li>
          <li><strong>Purchase data:</strong> subscription status processed by RevenueCat (mobile) or Stripe (web). We do not store full payment card details.</li>
          <li><strong>Device data:</strong> basic device and OS information collected automatically by Google AdMob for ad serving.</li>
        </ul>
      </div>

      <div>
        <h2 className="font-semibold text-base mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>To provide and sync your Bible reading experience across devices.</li>
          <li>To process and manage your premium subscription.</li>
          <li>To display relevant ads to non-premium users via Google AdMob.</li>
          <li>To improve the app and fix technical issues.</li>
        </ul>
      </div>

      <div>
        <h2 className="font-semibold text-base mb-2">3. Third-Party Services</h2>
        <p>We use the following third-party services, each governed by their own privacy policies:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Supabase</strong> – database and authentication.</li>
          <li><strong>RevenueCat</strong> – mobile in-app purchase management.</li>
          <li><strong>Stripe</strong> – web payment processing.</li>
          <li><strong>Google AdMob</strong> – advertising for non-premium users.</li>
        </ul>
      </div>

      <div>
        <h2 className="font-semibold text-base mb-2">4. Data Retention</h2>
        <p>
          We retain your account and reading data for as long as your account is active.
          You may request deletion of your data at any time by contacting us.
        </p>
      </div>

      <div>
        <h2 className="font-semibold text-base mb-2">5. Children's Privacy</h2>
        <p>
          Lumen is not directed at children under the age of 13. We do not knowingly collect
          personal information from children under 13.
        </p>
      </div>

      <div>
        <h2 className="font-semibold text-base mb-2">6. Your Rights</h2>
        <p>
          You may access, correct, or delete your personal data at any time. To exercise these
          rights, contact us at the email below.
        </p>
      </div>

      <div>
        <h2 className="font-semibold text-base mb-2">7. Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. We will notify you of significant changes
          by posting the new policy on this page with an updated date.
        </p>
      </div>

      <div>
        <h2 className="font-semibold text-base mb-2">8. Contact Us</h2>
        <p>
          If you have any questions about this privacy policy, please contact us at:{" "}
          <a href="mailto:support@lumencatholic.com" className="text-primary underline">
            support@lumencatholic.com
          </a>
        </p>
      </div>
    </section>
  </div>
);
