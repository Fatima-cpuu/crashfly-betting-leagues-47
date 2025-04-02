
import React from "react";
import { useNavigate } from "react-router-dom";
import { Bitcoin } from "lucide-react";
import { Button } from "@/components/ui/button";

const DepositMain = () => {
  const navigate = useNavigate();
  
  const paymentMethod = {
    id: "crypto",
    name: "USDT (TRC20)",
    description: "Fast and secure crypto payments",
    icon: Bitcoin,
    path: "/deposit/usdt"
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Deposit Funds</h1>
        <p className="text-gray-400 mb-8">Make a deposit using USDT (TRC20)</p>
        
        <div className="grid grid-cols-1 gap-6 mb-8">
          <div 
            className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-750 transition-colors"
            onClick={() => navigate(paymentMethod.path)}
          >
            <paymentMethod.icon className="text-aviator-red mb-4" size={32} />
            <h2 className="text-xl font-semibold mb-2">{paymentMethod.name}</h2>
            <p className="text-gray-400">{paymentMethod.description}</p>
            <Button 
              className="mt-4 bg-aviator-red hover:bg-aviator-red/90"
              onClick={() => navigate(paymentMethod.path)}
            >
              Deposit Now
            </Button>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Deposit Information</h2>
          
          <div className="space-y-4">
            <p className="text-gray-300">
              • We accept USDT deposits on the TRC20 network only
            </p>
            <p className="text-gray-300">
              • Minimum deposit: 15 USDT
            </p>
            <p className="text-gray-300">
              • Deposits are typically credited within 10-30 minutes after confirmation
            </p>
            <p className="text-gray-300">
              • Please ensure you're sending from a wallet you own
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositMain;
