
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// Define the form schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type FormValues = z.infer<typeof formSchema>;

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if the email exists in our "database"
      const storedUser = localStorage.getItem("aviatorUser");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === data.email) {
          setSubmitted(true);
          toast.success("Password reset instructions sent to your email");
        } else {
          toast.error("No account found with this email address");
        }
      } else {
        toast.error("No account found with this email address");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-8 bg-gray-800 p-8 rounded-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Forgot Password</h1>
          <p className="text-gray-400 mt-2">
            {!submitted 
              ? "Enter your email address and we'll send you instructions to reset your password" 
              : "Check your email for reset instructions"}
          </p>
        </div>
        
        {!submitted ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} className="bg-gray-700 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                className="w-full bg-aviator-red hover:bg-aviator-red/90"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Instructions"}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="space-y-6">
            <p className="text-green-400 text-center">
              If an account exists with this email, you'll receive reset instructions shortly.
            </p>
            <Button
              className="w-full bg-aviator-red hover:bg-aviator-red/90"
              onClick={() => setSubmitted(false)}
            >
              Try Another Email
            </Button>
          </div>
        )}
        
        <div className="text-center text-gray-400">
          Remember your password?{" "}
          <Link to="/auth/login" className="text-aviator-red hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
