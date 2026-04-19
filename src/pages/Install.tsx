import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Share, Plus, MoreVertical, Download, Smartphone } from "lucide-react";

type Platform = "ios" | "android" | "desktop";

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  return "desktop";
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // @ts-expect-error iOS Safari
    window.navigator.standalone === true
  );
}

export function Install() {
  const [platform, setPlatform] = useState<Platform>("desktop");
  const [installed, setInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    setPlatform(detectPlatform());
    setInstalled(isStandalone());

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleAndroidInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl mx-auto px-4 py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>

        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-4">
            <Smartphone className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-3">Install Lumen Bible</h1>
          <p className="text-muted-foreground text-lg">
            Add Lumen to your home screen for a full-screen, app-like experience.
          </p>
        </header>

        {installed && (
          <Card className="p-6 mb-6 border-primary/30 bg-primary/5 text-center">
            <p className="font-medium">✓ You're already using the installed app. Enjoy!</p>
          </Card>
        )}

        {!installed && platform === "ios" && <IosSteps />}
        {!installed && platform === "android" && (
          <AndroidSteps onInstall={handleAndroidInstall} canPrompt={!!deferredPrompt} />
        )}
        {!installed && platform === "desktop" && <DesktopSteps />}

        <div className="mt-10 grid sm:grid-cols-3 gap-4 text-center">
          <Benefit title="Home screen" body="One-tap launch, no browser bar." />
          <Benefit title="Full screen" body="Distraction-free reading." />
          <Benefit title="Faster" body="Loads instantly after install." />
        </div>
      </div>
    </div>
  );
}

function Benefit({ title, body }: { title: string; body: string }) {
  return (
    <Card className="p-4">
      <p className="font-serif font-semibold mb-1">{title}</p>
      <p className="text-sm text-muted-foreground">{body}</p>
    </Card>
  );
}

function Step({ n, icon, children }: { n: number; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex gap-4 items-start">
      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold flex items-center justify-center text-sm">
        {n}
      </span>
      <div className="flex-1 pt-1 flex items-center gap-2 flex-wrap">
        {children}
        {icon}
      </div>
    </li>
  );
}

function IosSteps() {
  return (
    <Card className="p-6">
      <h2 className="font-serif text-2xl font-semibold mb-4">On iPhone & iPad (Safari)</h2>
      <ol className="space-y-4">
        <Step n={1} icon={<Share className="h-5 w-5 text-primary" />}>
          Tap the <strong>Share</strong> button at the bottom of Safari
        </Step>
        <Step n={2} icon={<Plus className="h-5 w-5 text-primary" />}>
          Scroll down and tap <strong>Add to Home Screen</strong>
        </Step>
        <Step n={3}>
          Tap <strong>Add</strong> in the top-right corner
        </Step>
      </ol>
      <p className="text-sm text-muted-foreground mt-6">
        Note: Only Safari can install apps on iOS — Chrome and other browsers won't show this option.
      </p>
    </Card>
  );
}

function AndroidSteps({ onInstall, canPrompt }: { onInstall: () => void; canPrompt: boolean }) {
  return (
    <Card className="p-6">
      <h2 className="font-serif text-2xl font-semibold mb-4">On Android (Chrome)</h2>
      {canPrompt && (
        <Button onClick={onInstall} size="lg" className="w-full mb-6">
          <Download className="h-4 w-4 mr-2" /> Install Lumen Bible
        </Button>
      )}
      <ol className="space-y-4">
        <Step n={1} icon={<MoreVertical className="h-5 w-5 text-primary" />}>
          Tap the <strong>menu</strong> (three dots) in Chrome
        </Step>
        <Step n={2}>
          Tap <strong>Install app</strong> or <strong>Add to Home screen</strong>
        </Step>
        <Step n={3}>
          Confirm by tapping <strong>Install</strong>
        </Step>
      </ol>
    </Card>
  );
}

function DesktopSteps() {
  return (
    <Card className="p-6">
      <h2 className="font-serif text-2xl font-semibold mb-4">On desktop (Chrome / Edge)</h2>
      <ol className="space-y-4">
        <Step n={1}>
          Look for the <strong>install icon</strong> in the address bar (right side)
        </Step>
        <Step n={2}>
          Click it and confirm <strong>Install</strong>
        </Step>
      </ol>
      <p className="text-sm text-muted-foreground mt-6">
        For the best experience, open this page on your phone and follow the steps there.
      </p>
    </Card>
  );
}
