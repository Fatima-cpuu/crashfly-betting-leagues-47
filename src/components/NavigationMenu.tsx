
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HelpCircle, Wallet, DollarSign, MoreVertical, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const MainNavigation: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("aviatorLoggedIn");
    toast.success("Logged out successfully");
    navigate("/auth/login");
  };

  return (
    <div className="absolute top-4 left-4 z-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-gray-400">
            <MoreVertical size={24} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-800 border-gray-700 text-white">
          {/* Customer Care section */}
          <DropdownMenuItem 
            className="text-white cursor-pointer hover:bg-gray-700"
            onClick={() => navigate("/support/faq")}
          >
            <HelpCircle className="mr-2" size={16} />
            FAQ
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-white cursor-pointer hover:bg-gray-700"
            onClick={() => navigate("/support/contact")}
          >
            <HelpCircle className="mr-2" size={16} />
            Contact Form
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-white cursor-pointer hover:bg-gray-700"
            onClick={() => navigate("/support/live-chat")}
          >
            <HelpCircle className="mr-2" size={16} />
            Live Chat
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-white cursor-pointer hover:bg-gray-700"
            onClick={() => navigate("/support/email")}
          >
            <HelpCircle className="mr-2" size={16} />
            Email Customer Care
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="bg-gray-700" />
          
          {/* Deposit section */}
          <DropdownMenuItem 
            className="text-white cursor-pointer hover:bg-gray-700"
            onClick={() => navigate("/deposit")}
          >
            <Wallet className="mr-2" size={16} />
            Deposit
          </DropdownMenuItem>
          
          {/* Withdrawal section */}
          <DropdownMenuItem 
            className="text-white cursor-pointer hover:bg-gray-700"
            onClick={() => navigate("/withdrawal")}
          >
            <DollarSign className="mr-2" size={16} />
            Withdrawal
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="bg-gray-700" />
          
          {/* Logout */}
          <DropdownMenuItem 
            className="text-white cursor-pointer hover:bg-gray-700"
            onClick={handleLogout}
          >
            <LogOut className="mr-2" size={16} />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MainNavigation;
