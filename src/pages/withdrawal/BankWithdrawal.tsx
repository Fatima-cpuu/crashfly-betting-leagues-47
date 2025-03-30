
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGame } from "@/contexts/GameContext";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/utils/gameUtils";

const formSchema = z.object({
  accountHolder: z.string()
    .min(3, { message: "Account holder name must be at least 3 characters." }),
  bankName: z.string()
    .min(3, { message: "Bank name must be at least 3 characters." }),
  accountNumber: z.string()
    .min(8, { message: "Account number must be at least 8 characters." })
    .regex(/^[0-9]+$/, { message: "Account number must contain only digits." }),
  routingNumber: z.string()
    .min(9, { message: "Routing number must be at least 9 characters." })
    .regex(/^[0-9]+$/, { message: "Routing number must contain only digits." }),
  amount: z.string()
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 20;
    }, { message: "Minimum withdrawal amount is $20." })
});

const BankWithdrawal = () => {
  const navigate = useNavigate();
  const { userBalance, withdrawFunds } = useGame();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountHolder: "",
      bankName: "",
      accountNumber: "",
      routingNumber: "",
      amount: "20",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const amount = parseFloat(values.amount);
    
    if (amount > userBalance) {
      form.setError("amount", { 
        message: "Withdrawal amount exceeds available balance."
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      withdrawFunds(amount);
      
      toast.success(`Withdrawal request for $${amount.toFixed(2)} submitted successfully.`);
      setIsProcessing(false);
      navigate("/");
    }, 2000);
  }

  // Calculate fee (either $5 or 2%, whichever is greater)
  const calculateFee = (amount: number) => {
    const flatFee = 5;
    const percentageFee = amount * 0.02;
    return Math.max(flatFee, percentageFee);
  };

  // Calculate how much the user will receive
  const calculateNetAmount = () => {
    const amount = parseFloat(form.watch("amount") || "0");
    if (isNaN(amount) || amount <= 0) return 0;
    const fee = calculateFee(amount);
    return amount - fee;
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-2">Bank Withdrawal</h1>
        <p className="text-gray-400 mb-4">Withdraw funds to your bank account</p>
        
        <div className="bg-gray-800 p-4 rounded-lg mb-6 flex justify-between">
          <div>
            <p className="text-sm text-gray-400">Available Balance</p>
            <p className="text-xl font-bold text-aviator-green">{formatCurrency(userBalance)} USD</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Minimum Withdrawal</p>
            <p className="text-xl font-bold">$20.00 USD</p>
          </div>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="accountHolder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Holder Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="John Doe" 
                        {...field} 
                        className="bg-gray-700" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Bank of America" 
                        {...field} 
                        className="bg-gray-700" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="12345678" 
                        {...field} 
                        className="bg-gray-700" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="routingNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Routing Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="123456789" 
                        {...field} 
                        className="bg-gray-700" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Withdrawal Amount (USD)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter amount" 
                        {...field} 
                        className="bg-gray-700" 
                        min="20"
                        max={userBalance}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="bg-gray-700 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Withdrawal Amount:</span>
                  <span>${parseFloat(form.watch("amount") || "0").toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fee (2% or $5 min):</span>
                  <span>${calculateFee(parseFloat(form.watch("amount") || "0")).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>You Will Receive:</span>
                  <span>${calculateNetAmount().toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-aviator-red hover:bg-aviator-red/80"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Withdraw Funds"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default BankWithdrawal;
