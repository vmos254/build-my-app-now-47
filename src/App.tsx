import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppLayout } from "@/components/AppLayout";
import { Home } from "@/pages/Home";
import { BibleIndex } from "@/pages/BibleIndex";
import { ChapterList } from "@/pages/ChapterList";
import { ChapterReader } from "@/pages/ChapterReader";
import { SearchPage } from "@/pages/SearchPage";
import { Bookmarks } from "@/pages/Bookmarks";
import { DailyReadings } from "@/pages/DailyReadings";
import { Pricing } from "@/pages/Pricing";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/bible" element={<BibleIndex />} />
            <Route path="/bible/:bookId" element={<ChapterList />} />
            <Route path="/bible/:bookId/:chapter" element={<ChapterReader />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/daily" element={<DailyReadings />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
