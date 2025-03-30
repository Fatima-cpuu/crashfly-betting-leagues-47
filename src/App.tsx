
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Support pages
import FAQ from "./pages/support/FAQ";
import ContactForm from "./pages/support/ContactForm";
import LiveChat from "./pages/support/LiveChat";
import EmailSupport from "./pages/support/EmailSupport";

// Deposit pages
import DepositMain from "./pages/deposit/DepositMain";
import CardDeposit from "./pages/deposit/CardDeposit";

// Withdrawal pages
import WithdrawalMain from "./pages/withdrawal/WithdrawalMain";
import BankWithdrawal from "./pages/withdrawal/BankWithdrawal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Support routes */}
          <Route path="/support/faq" element={<FAQ />} />
          <Route path="/support/contact" element={<ContactForm />} />
          <Route path="/support/live-chat" element={<LiveChat />} />
          <Route path="/support/email" element={<EmailSupport />} />
          
          {/* Deposit routes */}
          <Route path="/deposit" element={<DepositMain />} />
          <Route path="/deposit/card" element={<CardDeposit />} />
          
          {/* Withdrawal routes */}
          <Route path="/withdrawal" element={<WithdrawalMain />} />
          <Route path="/withdrawal/bank" element={<BankWithdrawal />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
