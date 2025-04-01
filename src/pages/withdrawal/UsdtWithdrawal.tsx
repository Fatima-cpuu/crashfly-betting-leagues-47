
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGame } from "@/contexts/GameContext";
import { formatCurrency } from "@/utils/gameUtils";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

const UsdtWithdrawal = () => {
  const navigate = useNavigate();
  const { userBalance, withdrawFunds } = useGame();
  
  const [amount, setAmount] = useState<number>(20);
  const [usdtAddress, setUsdtAddress] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  const handleWithdrawal = () => {
    if (!usdtAddress) {
      toast.error("Please enter your USDT wallet address");
      return;
    }
    
    if (usdtAddress.length < 30) {
      toast.error("Please enter a valid TRC20 wallet address");
      return;
    }
    
    if (amount < 20) {
      toast.error("Minimum withdrawal amount is $20.00");
      return;
    }
    
    if (amount > userBalance) {
      toast.error("Insufficient balance for this withdrawal");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      const success = withdrawFunds(amount);
      
      if (success) {
        toast.success("Withdrawal request submitted successfully");
        navigate("/withdrawal/confirmation");
      } else {
        toast.error("Withdrawal failed. Please try again.");
      }
      
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Withdraw via USDT (TRC20)</h1>
        <p className="text-gray-400 mb-6">Withdraw your funds to your USDT wallet</p>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-4">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-400">Available Balance</div>
            <div className="text-lg font-bold text-aviator-green">{formatCurrency(userBalance)} USD</div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                USDT TRC20 Wallet Address
              </label>
              <Input 
                placeholder="Enter your TRC20 wallet address"
                value={usdtAddress}
                onChange={(e) => setUsdtAddress(e.target.value)}
                className="bg-gray-700 text-white"
              />
              <p className="text-xs text-gray-500 mt-1">Make sure to use TRC20 network only</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Amount to withdraw (USD)
              </label>
              <Input 
                type="number" 
                min={20} 
                max={userBalance}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="bg-gray-700 text-white"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum: $20.00 | Fee: 1 USDT</p>
            </div>
            
            <div className="bg-yellow-900/30 border border-yellow-700 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="text-yellow-500 mt-0.5 shrink-0" size={16} />
                <p className="text-sm text-yellow-200">
                  Please triple-check your wallet address. Withdrawals sent to incorrect addresses cannot be recovered.
                </p>
              </div>
            </div>
            
            <Button 
              className="w-full bg-aviator-red hover:bg-aviator-red/90"
              onClick={handleWithdrawal}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Withdraw Funds"}
            </Button>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-3">Withdrawal Information</h2>
          
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Withdrawals are processed within 24 hours</li>
            <li>• A fee of 1 USDT will be deducted from your withdrawal</li>
            <li>• Make sure you're withdrawing to a TRC20 compatible wallet</li>
            <li>• You'll receive confirmation via email once processed</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UsdtWithdrawal;
