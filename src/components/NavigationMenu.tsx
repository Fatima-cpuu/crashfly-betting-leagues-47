
import React from "react";
import { useNavigate } from "react-router-dom";
import { Support, Wallet, DollarSign } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

const MainNavigation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-white py-2 px-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-gray-800">
                  <Support className="mr-2" size={18} />
                  Support
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-gray-800 border-gray-700">
                  <ul className="grid gap-3 p-4 w-[300px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start" 
                          onClick={() => navigate("/support/faq")}
                        >
                          FAQ
                        </Button>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start" 
                          onClick={() => navigate("/support/contact")}
                        >
                          Contact Form
                        </Button>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start" 
                          onClick={() => navigate("/support/live-chat")}
                        >
                          Live Chat
                        </Button>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => navigate("/support/email")}
                        >
                          Email Support
                        </Button>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-gray-800">
                  <Wallet className="mr-2" size={18} />
                  Deposit
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-gray-800 border-gray-700">
                  <ul className="grid gap-3 p-4 w-[300px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => navigate("/deposit/card")}
                        >
                          Credit/Debit Cards
                        </Button>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => navigate("/deposit/ewallet")}
                        >
                          E-wallets
                        </Button>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => navigate("/deposit/crypto")}
                        >
                          Cryptocurrencies
                        </Button>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-gray-800">
                  <DollarSign className="mr-2" size={18} />
                  Withdrawal
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-gray-800 border-gray-700">
                  <ul className="grid gap-3 p-4 w-[300px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => navigate("/withdrawal/bank")}
                        >
                          Bank Transfers
                        </Button>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => navigate("/withdrawal/ewallet")}
                        >
                          E-wallets
                        </Button>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => navigate("/withdrawal/crypto")}
                        >
                          Cryptocurrencies
                        </Button>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div>
          <Button 
            variant="outline" 
            className="bg-aviator-red hover:bg-aviator-red/80 text-white border-none"
            onClick={() => navigate("/deposit")}
          >
            Deposit Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
