
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useGame } from "@/contexts/GameContext";
import { toast } from "sonner";

interface DepositFormValues {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  amount: number;
}

const CardDeposit = () => {
  const navigate = useNavigate();
  const { addFunds } = useGame();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const form = useForm<DepositFormValues>({
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      amount: 15
    }
  });

  const onSubmit = (values: DepositFormValues) => {
    if (values.amount < 15) {
      toast.error("Minimum deposit amount is $15");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      addFunds(values.amount);
      setIsProcessing(false);
      navigate("/");
    }, 1500);
  };

  return (
    <div className="container max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Deposit with Card</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Number</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="1234 5678 9012 3456" 
                    {...field} 
                    maxLength={19}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="MM/YY" 
                      {...field} 
                      maxLength={5}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="123" 
                      {...field} 
                      maxLength={3}
                      type="password"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (USD)</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    min={15}
                    max={10000}
                    {...field}
                    onChange={e => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <p className="text-xs text-gray-500 mt-1">Minimum: $15</p>
              </FormItem>
            )}
          />
          
          <div className="bg-green-50 border border-green-200 rounded p-3 mb-4">
            <h4 className="font-medium text-green-800">Available Bonus</h4>
            <p className="text-green-700">100% Welcome Bonus up to $500</p>
          </div>
          
          <Button type="submit" className="w-full" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Deposit Now"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CardDeposit;
