
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HelpCircle, Wallet, DollarSign, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const MainNavigation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute top-4 left-4 z-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-gray-400">
            <MoreVertical size={24} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-800 border-gray-700">
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
          
          {/* Deposit section */}
          <DropdownMenuItem 
            className="text-white cursor-pointer hover:bg-gray-700"
            onClick={() => navigate("/deposit")}
          >
            <Wallet className="mr-2" size={16} />
            Deposit
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-white cursor-pointer hover:bg-gray-700"
            onClick={() => navigate("/deposit/card")}
          >
            <Wallet className="mr-2" size={16} />
            Credit/Debit Cards
          </DropdownMenuItem>
          
          {/* Withdrawal section */}
          <DropdownMenuItem 
            className="text-white cursor-pointer hover:bg-gray-700"
            onClick={() => navigate("/withdrawal")}
          >
            <DollarSign className="mr-2" size={16} />
            Withdrawal
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-white cursor-pointer hover:bg-gray-700"
            onClick={() => navigate("/withdrawal/bank")}
          >
            <DollarSign className="mr-2" size={16} />
            Bank Transfers
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MainNavigation;
