import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index.tsx";
import MnaGuide from "./pages/MnaGuide.tsx";
import Opportunities from "./pages/Opportunities.tsx";
import DealInquiry from "./pages/DealInquiry.tsx";
import CaseStudies from "./pages/CaseStudies.tsx";
import Insights from "./pages/Insights.tsx";
import Professionals from "./pages/Professionals.tsx";
import ProfessionalsDirectory from "./pages/ProfessionalsDirectory.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();
const AppRouter = import.meta.env.MODE === "singlefile" ? HashRouter : BrowserRouter;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ma-guide" element={<MnaGuide />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/opportunities/:category/:slug" element={<Opportunities />} />
          <Route path="/deal-inquiry" element={<DealInquiry />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:slug" element={<CaseStudies />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:category/:slug" element={<Insights />} />
          <Route path="/professionals" element={<ProfessionalsDirectory />} />
          <Route path="/professionals/wonjungjun" element={<Professionals />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
