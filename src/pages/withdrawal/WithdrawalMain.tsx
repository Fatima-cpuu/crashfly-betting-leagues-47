
import React from "react";
import { useNavigate } from "react-router-dom";
import { Building, Wallet, Bitcoin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import { formatCurrency } from "@/utils/gameUtils";

const WithdrawalMain = () => {
  const navigate = useNavigate();
  const { userBalance } = useGame();
  
  const withdrawalMethods = [
    {
      id: "bank",
      name: "Bank Transfer",
      description: "Withdraw directly to your bank account",
      icon: Building,
      path: "/withdrawal/bank",
      processingTime: "1-3 business days",
      fee: "$5.00 or 2%"
    },
    {
      id: "ewallet",
      name: "E-Wallets",
      description: "PayPal, Skrill, and more",
      icon: Wallet,
      path: "/withdrawal/ewallet",
      processingTime: "Within 24 hours",
      fee: "$2.00 or 1.5%"
    },
    {
      id: "crypto",
      name: "Cryptocurrencies",
      description: "Bitcoin, Ethereum, and more",
      icon: Bitcoin,
      path: "/withdrawal/crypto",
      processingTime: "1-3 hours",
      fee: "0.0005 BTC or 1%"
    }
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Withdraw Funds</h1>
            <p className="text-gray-400">Choose your preferred withdrawal method</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Available Balance</p>
            <p className="text-2xl font-bold text-aviator-green">{formatCurrency(userBalance)} USD</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {withdrawalMethods.map((method) => (
            <div 
              key={method.id} 
              className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-750 transition-colors"
              onClick={() => navigate(method.path)}
            >
              <method.icon className="text-aviator-red mb-4" size={32} />
              <h2 className="text-xl font-semibold mb-2">{method.name}</h2>
              <p className="text-gray-400 mb-4">{method.description}</p>
              
              <div className="text-sm text-gray-400">
                <div className="flex justify-between mb-1">
                  <span>Processing Time:</span>
                  <span>{method.processingTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fee:</span>
                  <span>{method.fee}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Withdrawal Guidelines</h2>
          
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Minimum withdrawal amount is $20.00</li>
            <li>Withdrawals are processed according to the method's specified processing time</li>
            <li>You may be required to verify your identity for withdrawals exceeding $1,000</li>
            <li>The same payment method used for deposit is preferred for withdrawal</li>
            <li>All withdrawal requests are subject to review for security purposes</li>
          </ul>
          
          <Button 
            className="mt-6 bg-aviator-red hover:bg-aviator-red/80"
            onClick={() => navigate("/support/faq")}
          >
            View FAQ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalMain;
