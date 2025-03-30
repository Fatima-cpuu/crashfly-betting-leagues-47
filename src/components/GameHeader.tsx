
import React from "react";
import { useGame } from "@/contexts/GameContext";
import { formatMultiplier, formatCurrency } from "@/utils/gameUtils";
import { HelpCircle } from "lucide-react";
import MainNavigation from "@/components/NavigationMenu";

const GameHeader: React.FC = () => {
  const { history, userBalance } = useGame();
  
  return (
    <div className="flex flex-col w-full bg-black">
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex items-center">
          <h1 className="text-aviator-red text-3xl font-bold">Aviator</h1>
          <HelpCircle className="ml-2 text-gray-400" size={20} />
        </div>
        <div className="text-aviator-green font-bold text-xl">{formatCurrency(userBalance)} USD</div>
      </div>
      
      <MainNavigation />
      
      <div className="flex overflow-x-auto pb-2 px-2 gap-2">
        {history.map((multiplier, index) => (
          <div 
            key={index}
            className={`text-xs font-medium px-2 py-1 rounded ${
              multiplier < 2 ? 'text-red-400' : 
              multiplier < 10 ? 'text-blue-400' : 
              'text-purple-400'
            }`}
          >
            {formatMultiplier(multiplier)}
          </div>
        ))}
      </div>
      
      <div className="bg-yellow-600 text-center py-2 font-bold">
        FUN MODE
      </div>
    </div>
  );
};

export default GameHeader;
