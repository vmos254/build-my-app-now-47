import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";

import { AppLayout } from "@/components/AppLayout";
import { AuthProvider } from "@/hooks/useAuth";
import { Home } from "@/pages/Home";
import { BibleIndex } from "@/pages/BibleIndex";
import { ChapterList } from "@/pages/ChapterList";
import { ChapterReader } from "@/pages/ChapterReader";
import { SearchPage } from "@/pages/SearchPage";
import { Bookmarks } from "@/pages/Bookmarks";
import { DailyReadings } from "@/pages/DailyReadings";
import { Pricing } from "@/pages/Pricing";
import { Install } from "@/pages/Install";
import { Auth } from "@/pages/Auth";
import CheckoutReturn from "@/pages/CheckoutReturn";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import NotFound from "./pages/NotFound.tsx";
import { Privacy } from "@/pages/Privacy";
import { DeleteData } from "@/pages/DeleteData";
import AuthCallback from "@/pages/AuthCallback";

const queryClient = new QueryClient();

function AndroidBackHandler() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    let listener: { remove: () => void } | null = null;
    import("@capacitor/app").then(({ App: CapApp }) => {
      CapApp.addListener("backButton", ({ canGoBack }) => {
        if (canGoBack) {
          window.history.back();
        } else {
          CapApp.exitApp();
        }
      }).then((l) => { listener = l; });
    });
    return () => { listener?.remove(); };
  }, []);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AndroidBackHandler />
          <PaymentTestModeBanner />
          <Routes>
            <Route path="/checkout/return" element={<CheckoutReturn />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/bible" element={<BibleIndex />} />
              <Route path="/bible/:bookId" element={<ChapterList />} />
              <Route path="/bible/:bookId/:chapter" element={<ChapterReader />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/daily" element={<DailyReadings />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/install" element={<Install />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/delete-data" element={<DeleteData />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
