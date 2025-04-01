
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CopyIcon, CheckIcon, Timer } from "lucide-react";
import QRCode from "react-qr-code";

const UsdtDeposit = () => {
  const [amount, setAmount] = useState<number>(10);
  const [copied, setCopied] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  
  const walletAddress = "TBWN42trmPFXkmWBBRkSCKwG9hKpH8dnas";
  
  useEffect(() => {
    if (!timerActive) return;
    
    if (timeLeft <= 0) {
      setTimerActive(false);
      toast.error("Payment time expired. Please start a new deposit.");
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft, timerActive]);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    toast.success("Address copied to clipboard!");
    
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  
  const startPaymentTimer = () => {
    if (amount < 10) {
      toast.error("Minimum deposit amount is 10 USDT");
      return;
    }
    
    setTimerActive(true);
    setTimeLeft(600); // Reset to 10 minutes
    toast.success("Payment initiated. Please complete within 10 minutes.");
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Deposit USDT (TRC20)</h1>
        <p className="text-gray-400 mb-6">Send USDT using the TRC20 network only</p>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Amount to deposit (USDT)
            </label>
            <Input 
              type="number" 
              min={10} 
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="bg-gray-700 text-white"
              disabled={timerActive}
            />
            <p className="text-xs text-gray-500 mt-1">Minimum: 10 USDT</p>
          </div>
          
          {!timerActive ? (
            <Button 
              className="w-full bg-aviator-red hover:bg-aviator-red/90" 
              onClick={startPaymentTimer}
            >
              Proceed to Payment
            </Button>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-center mb-4">
                <Timer className="text-yellow-500 mr-2" />
                <div className="text-xl font-bold text-yellow-500">
                  Time remaining: {formatTime(timeLeft)}
                </div>
              </div>
              
              <div className="flex justify-center mb-6">
                <div className="bg-white p-4 rounded">
                  <QRCode value={walletAddress} size={200} />
                </div>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-400">USDT TRC20 Address</div>
                    <div className="text-sm font-mono break-all">{walletAddress}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopy}
                    className="text-gray-400 hover:text-white"
                  >
                    {copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
                  </Button>
                </div>
              </div>
              
              <div className="bg-yellow-900/30 border border-yellow-700 p-4 rounded-lg text-yellow-200 text-sm">
                <p className="font-bold mb-2">Important:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Send exactly {amount} USDT</li>
                  <li>Only use TRC20 network</li>
                  <li>Payment must be completed within the time limit</li>
                  <li>Your account will be credited after network confirmation</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">How to Deposit USDT</h2>
          
          <ol className="list-decimal pl-5 space-y-3 text-gray-300">
            <li>Enter the amount you wish to deposit</li>
            <li>Click "Proceed to Payment" to start the deposit process</li>
            <li>Copy the USDT TRC20 address or scan the QR code</li>
            <li>Send the exact USDT amount using TRC20 network from your wallet</li>
            <li>Wait for network confirmation (usually 1-10 minutes)</li>
            <li>Your account will be credited automatically</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default UsdtDeposit;
