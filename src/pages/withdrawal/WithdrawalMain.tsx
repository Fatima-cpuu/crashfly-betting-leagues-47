
import React from "react";
import { useNavigate } from "react-router-dom";
import { Bitcoin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import { formatCurrency } from "@/utils/gameUtils";

const WithdrawalMain = () => {
  const navigate = useNavigate();
  const { userBalance } = useGame();
  
  const withdrawalMethod = {
    id: "crypto",
    name: "USDT (TRC20)",
    description: "Fast and secure crypto withdrawals",
    icon: Bitcoin,
    path: "/withdrawal/usdt",
    processingTime: "1-24 hours",
    fee: "1 USDT"
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Withdraw Funds</h1>
            <p className="text-gray-400">Withdraw your funds via USDT (TRC20)</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Available Balance</p>
            <p className="text-2xl font-bold text-aviator-green">{formatCurrency(userBalance)} USD</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 mb-8">
          <div 
            className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-750 transition-colors"
            onClick={() => navigate(withdrawalMethod.path)}
          >
            <withdrawalMethod.icon className="text-aviator-red mb-4" size={32} />
            <h2 className="text-xl font-semibold mb-2">{withdrawalMethod.name}</h2>
            <p className="text-gray-400 mb-4">{withdrawalMethod.description}</p>
            
            <div className="text-sm text-gray-400">
              <div className="flex justify-between mb-1">
                <span>Processing Time:</span>
                <span>{withdrawalMethod.processingTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Fee:</span>
                <span>{withdrawalMethod.fee}</span>
              </div>
            </div>
            
            <Button 
              className="mt-4 bg-aviator-red hover:bg-aviator-red/90 w-full"
              onClick={() => navigate(withdrawalMethod.path)}
            >
              Withdraw via USDT
            </Button>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Withdrawal Guidelines</h2>
          
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Minimum withdrawal amount is $20.00</li>
            <li>Withdrawals are processed within 24 hours</li>
            <li>You may be required to verify your identity for withdrawals exceeding $1,000</li>
            <li>Make sure to provide the correct USDT TRC20 wallet address</li>
            <li>All withdrawal requests are subject to review for security purposes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalMain;
