
import React from "react";
import { useGame } from "@/contexts/GameContext";
import { formatMultiplier, formatCurrency } from "@/utils/gameUtils";
import { HelpCircle, MoreVertical } from "lucide-react";
import MainNavigation from "@/components/NavigationMenu";

const GameHeader: React.FC = () => {
  const { history } = useGame();
  
  return (
    <div className="flex flex-col w-full bg-black">
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex items-center gap-4">
          <MoreVertical className="text-gray-400" size={24} />
          <h1 className="text-aviator-red text-3xl font-bold">Aviator</h1>
          <HelpCircle className="text-gray-400" size={20} />
        </div>
        <div className="text-green-500 font-bold text-xl">0.00 USD</div>
      </div>
      
      <div className="flex overflow-x-auto pb-2 px-2 gap-2">
        {history.map((multiplier, index) => (
          <div 
            key={index}
            className={`text-xs font-medium px-2 py-1 rounded ${
              multiplier < 2 ? 'text-blue-400' : 
              multiplier < 10 ? 'text-purple-400' : 
              'text-pink-400'
            }`}
          >
            {formatMultiplier(multiplier)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameHeader;
