
import React from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Wallet, Bitcoin } from "lucide-react";
import { Button } from "@/components/ui/button";

const DepositMain = () => {
  const navigate = useNavigate();
  
  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Cards",
      description: "Fast and secure card payments",
      icon: CreditCard,
      path: "/deposit/card"
    },
    {
      id: "ewallet",
      name: "E-Wallets",
      description: "PayPal, Skrill, and more",
      icon: Wallet,
      path: "/deposit/ewallet"
    },
    {
      id: "crypto",
      name: "Cryptocurrencies",
      description: "Bitcoin, Ethereum, and more",
      icon: Bitcoin,
      path: "/deposit/crypto"
    }
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Deposit Funds</h1>
        <p className="text-gray-400 mb-8">Choose your preferred payment method</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {paymentMethods.map((method) => (
            <div 
              key={method.id} 
              className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-750 transition-colors"
              onClick={() => navigate(method.path)}
            >
              <method.icon className="text-aviator-red mb-4" size={32} />
              <h2 className="text-xl font-semibold mb-2">{method.name}</h2>
              <p className="text-gray-400">{method.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Current Promotions</h2>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-900 to-aviator-red p-4 rounded-lg">
              <h3 className="font-bold text-lg">Welcome Bonus</h3>
              <p className="text-gray-200">100% match on your first deposit up to $500</p>
              <Button 
                className="mt-2 bg-white text-aviator-red hover:bg-gray-200"
                onClick={() => navigate("/deposit/card")}
              >
                Claim Now
              </Button>
            </div>
            
            <div className="bg-gradient-to-r from-blue-900 to-blue-600 p-4 rounded-lg">
              <h3 className="font-bold text-lg">Crypto Bonus</h3>
              <p className="text-gray-200">10% extra when you deposit with cryptocurrency</p>
              <Button 
                className="mt-2 bg-white text-blue-700 hover:bg-gray-200"
                onClick={() => navigate("/deposit/crypto")}
              >
                Claim Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositMain;
