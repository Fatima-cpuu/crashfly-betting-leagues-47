
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const WithdrawalConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-800 rounded-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-500" size={64} />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Withdrawal Request Submitted</h1>
        
        <p className="text-gray-300 mb-6">
          Your withdrawal request has been successfully submitted and is now being processed. 
          You will receive your funds in your wallet within 24 hours.
        </p>
        
        <div className="bg-gray-700 rounded p-4 mb-6">
          <p className="text-sm text-gray-400 mb-1">Transaction ID</p>
          <p className="font-mono text-sm">{Math.random().toString(36).substring(2, 15).toUpperCase()}</p>
        </div>
        
        <Button
          className="w-full bg-aviator-red hover:bg-aviator-red/90 mb-4"
          onClick={() => navigate("/")}
        >
          Return to Game
        </Button>
        
        <Button
          variant="outline"
          className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
          onClick={() => navigate("/withdrawal")}
        >
          Make Another Withdrawal
        </Button>
      </div>
    </div>
  );
};

export default WithdrawalConfirmation;
