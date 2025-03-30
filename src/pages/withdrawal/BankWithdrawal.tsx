
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useGame } from "@/contexts/GameContext";
import { toast } from "sonner";

interface WithdrawalFormValues {
  accountName: string;
  accountNumber: string;
  bankName: string;
  amount: number;
}

const BankWithdrawal = () => {
  const navigate = useNavigate();
  const { withdrawFunds } = useGame();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const form = useForm<WithdrawalFormValues>({
    defaultValues: {
      accountName: "",
      accountNumber: "",
      bankName: "",
      amount: 50
    }
  });

  const onSubmit = (values: WithdrawalFormValues) => {
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const success = withdrawFunds(values.amount);
      setIsProcessing(false);
      
      if (success) {
        navigate("/");
      }
    }, 1500);
  };

  return (
    <div className="container max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Bank Withdrawal</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="accountName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Holder Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John Doe" 
                    {...field} 
                  />
                </FormControl>
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
                  />
                </FormControl>
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
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (USD)</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    min={10}
                    {...field}
                    onChange={e => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="bg-gray-50 border border-gray-200 rounded p-3 mb-4">
            <h4 className="font-medium">Withdrawal Fee</h4>
            <p className="text-gray-600">2% or minimum $5.00</p>
            <h4 className="font-medium mt-2">Estimated Processing Time</h4>
            <p className="text-gray-600">2-5 business days</p>
          </div>
          
          <Button type="submit" className="w-full" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Withdraw"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BankWithdrawal;
