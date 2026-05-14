import { useState } from "react";

export const DeleteData = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="container max-w-2xl mx-auto px-4 py-12 font-ui text-foreground">
      <h1 className="font-display text-4xl mb-2">Delete My Data</h1>
      <p className="text-sm text-muted-foreground mb-8">Lumen – Catholic Bible</p>

      <section className="space-y-6 text-sm leading-relaxed">
        <p>
          You can request deletion of your Lumen account and all associated data at any time.
          Once processed, the following will be permanently deleted:
        </p>

        <ul className="list-disc pl-5 space-y-1">
          <li>Your account (email address and password)</li>
          <li>All bookmarks and highlights</li>
          <li>Your reading history and progress</li>
          <li>Any subscription records linked to your account</li>
        </ul>

        <p className="text-muted-foreground">
          <strong className="text-foreground">Retention note:</strong> After receiving your request,
          we will delete your data within 30 days. Anonymised usage analytics may be retained
          for up to 90 days before being permanently purged.
        </p>

        <div className="border border-border/60 rounded-2xl p-6 bg-card space-y-4">
          <h2 className="font-semibold text-base">Request Data Deletion</h2>

          {submitted ? (
            <div className="text-center py-6">
              <div className="text-2xl mb-2">✓</div>
              <p className="font-semibold">Request received</p>
              <p className="text-muted-foreground text-sm mt-1">
                We'll process your deletion request within 30 days and send a confirmation to your email.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email address used in Lumen
                </label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  What would you like deleted?
                </label>
                <select className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40">
                  <option value="all">Everything — delete my account and all data</option>
                  <option value="data">Only my data — keep my account</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Submit deletion request
              </button>
            </form>
          )}
        </div>

        <p className="text-muted-foreground text-xs">
          You can also email us directly at{" "}
          <a href="mailto:support@lumencatholic.com" className="text-primary underline">
            support@lumencatholic.com
          </a>{" "}
          with the subject line <em>"Data Deletion Request"</em>.
        </p>
      </section>
    </div>
  );
};
