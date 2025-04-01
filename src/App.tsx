
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GameProvider } from "@/contexts/GameContext";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Support pages
import FAQ from "./pages/support/FAQ";
import ContactForm from "./pages/support/ContactForm";
import LiveChat from "./pages/support/LiveChat";
import EmailSupport from "./pages/support/EmailSupport";

// Deposit pages
import DepositMain from "./pages/deposit/DepositMain";
import UsdtDeposit from "./pages/deposit/UsdtDeposit";

// Withdrawal pages
import WithdrawalMain from "./pages/withdrawal/WithdrawalMain";
import UsdtWithdrawal from "./pages/withdrawal/UsdtWithdrawal";
import WithdrawalConfirmation from "./pages/withdrawal/WithdrawalConfirmation";

const queryClient = new QueryClient();

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = localStorage.getItem("aviatorLoggedIn") === "true";
  
  if (!isLoggedIn) {
    return <Navigate to="/auth/login" replace />;
  }
  
  return children;
};

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    // Check if there's any user data
    const hasUserData = localStorage.getItem("aviatorUser") !== null;
    const isLoggedIn = localStorage.getItem("aviatorLoggedIn") === "true";
    
    // If logged in status is inconsistent with user data, reset it
    if (isLoggedIn && !hasUserData) {
      localStorage.removeItem("aviatorLoggedIn");
    }
    
    setIsInitialized(true);
  }, []);
  
  if (!isInitialized) {
    return null; // Or a loading spinner
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <GameProvider>
          <BrowserRouter>
            <Routes>
              {/* Auth routes - public */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />
              
              {/* Protected routes */}
              <Route path="/" element={<RequireAuth><Index /></RequireAuth>} />
              
              {/* Support routes */}
              <Route path="/support/faq" element={<RequireAuth><FAQ /></RequireAuth>} />
              <Route path="/support/contact" element={<RequireAuth><ContactForm /></RequireAuth>} />
              <Route path="/support/live-chat" element={<RequireAuth><LiveChat /></RequireAuth>} />
              <Route path="/support/email" element={<RequireAuth><EmailSupport /></RequireAuth>} />
              
              {/* Deposit routes */}
              <Route path="/deposit" element={<RequireAuth><DepositMain /></RequireAuth>} />
              <Route path="/deposit/usdt" element={<RequireAuth><UsdtDeposit /></RequireAuth>} />
              
              {/* Withdrawal routes */}
              <Route path="/withdrawal" element={<RequireAuth><WithdrawalMain /></RequireAuth>} />
              <Route path="/withdrawal/usdt" element={<RequireAuth><UsdtWithdrawal /></RequireAuth>} />
              <Route path="/withdrawal/confirmation" element={<RequireAuth><WithdrawalConfirmation /></RequireAuth>} />
              
              {/* Redirect to login if not found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </GameProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
