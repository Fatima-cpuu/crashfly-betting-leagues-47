
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
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
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const emailFromRegister = queryParams.get('email') || "";
  const passwordFromRegister = queryParams.get('password') || "";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: emailFromRegister,
      password: passwordFromRegister,
    },
  });

  useEffect(() => {
    // When credentials are passed from registration, update form values
    if (emailFromRegister && passwordFromRegister) {
      form.setValue("email", emailFromRegister);
      form.setValue("password", passwordFromRegister);
      
      // Clean the URL to remove the credentials
      if (window.history && window.history.replaceState) {
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    }
  }, [emailFromRegister, passwordFromRegister, form]);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      // Simulating a login API call
      const storedUser = localStorage.getItem("aviatorUser");
      
      if (!storedUser) {
        toast.error("No registered user found. Please register first.");
        setIsLoading(false);
        return;
      }
      
      const user = JSON.parse(storedUser);
      
      if (user.email === data.email && user.password === data.password) {
        localStorage.setItem("aviatorLoggedIn", "true");
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-8 bg-gray-800 p-8 rounded-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Login to Aviator</h1>
          <p className="text-gray-400 mt-2">Enter your credentials to access your account</p>
        </div>
        
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
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} className="bg-gray-700 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="text-right">
              <Link to="/auth/forgot-password" className="text-sm text-aviator-red hover:underline">
                Forgot password?
              </Link>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-aviator-red hover:bg-aviator-red/90"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            
            <div className="text-center text-gray-400">
              Don't have an account?{" "}
              <Link to="/auth/register" className="text-aviator-red hover:underline">
                Register
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
