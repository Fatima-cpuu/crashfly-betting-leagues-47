
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

const formSchema = z.object({
  cardNumber: z.string()
    .min(16, { message: "Card number must be 16 digits." })
    .max(19, { message: "Card number cannot exceed 19 digits." })
    .regex(/^[0-9\s-]+$/, { message: "Please enter a valid card number." }),
  cardHolder: z.string()
    .min(3, { message: "Cardholder name must be at least 3 characters." }),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, { message: "Please enter a valid expiry date (MM/YY)." }),
  cvv: z.string()
    .length(3, { message: "CVV must be 3 digits." })
    .regex(/^[0-9]+$/, { message: "CVV must contain only numbers." }),
  amount: z.string()
    .min(1, { message: "Please enter an amount." })
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 10;
    }, { message: "Minimum deposit amount is $10." })
});

const CardDeposit = () => {
  const navigate = useNavigate();
  const { addFunds } = useGame();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
      amount: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const amount = parseFloat(values.amount);
      addFunds(amount);
      
      toast.success(`Successfully deposited $${amount.toFixed(2)}`);
      setIsProcessing(false);
      navigate("/");
    }, 2000);
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8">Card Deposit</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        className="bg-gray-700"
                        maxLength={19} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cardHolder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cardholder Name</FormLabel>
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
                          className="bg-gray-700"
                          maxLength={5}
                        />
                      </FormControl>
                      <FormMessage />
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
                          type="password" 
                          placeholder="***" 
                          {...field} 
                          className="bg-gray-700"
                          maxLength={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deposit Amount (USD)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter amount" 
                        {...field} 
                        className="bg-gray-700" 
                        min="10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Available Bonus</h3>
                <p className="text-green-400 mb-2">100% Welcome Bonus up to $500</p>
                <p className="text-sm text-gray-400">Deposit $100 and play with $200!</p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-aviator-red hover:bg-aviator-red/80"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Deposit Now"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CardDeposit;
