
import React, { useState } from "react";
import { useGame } from "@/contexts/GameContext";
import { formatMultiplier } from "@/utils/gameUtils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock } from "lucide-react";

const GamePlayers: React.FC = () => {
  const { players, topPlayers } = useGame();
  const [activeTab, setActiveTab] = useState<"all" | "my" | "top">("all");
  
  const renderPlayerList = () => {
    if (activeTab === "top") {
      return (
        <div className="space-y-1">
          {topPlayers.map((player, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-2 bg-aviator-gray rounded text-white"
            >
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${player.username.charAt(0)}&background=random`} />
                  <AvatarFallback>{player.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-xs">{player.username}</div>
              </div>
              <div className="text-xs">{player.betAmount.toFixed(2)}</div>
              <div className="text-xs text-aviator-green">{formatMultiplier(player.multiplier)}</div>
              <div className="text-xs text-aviator-green">{player.winAmount.toFixed(2)}</div>
            </div>
          ))}
        </div>
      );
    }
    
    return (
      <div className="space-y-1">
        {players.map((player) => (
          <div 
            key={player.id}
            className={`flex items-center justify-between p-2 rounded text-white ${
              player.hashedOut ? "bg-green-900" : "bg-aviator-gray"
            }`}
          >
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={player.avatar} />
                <AvatarFallback>{player.username.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-xs">{player.username}</div>
            </div>
            <div className="text-xs">{player.betAmount.toFixed(2)}</div>
            
            {player.hashedOut && player.cashoutMultiplier ? (
              <>
                <div className="text-xs text-aviator-green">{formatMultiplier(player.cashoutMultiplier)}</div>
                <div className="text-xs text-aviator-green">
                  {(player.betAmount * player.cashoutMultiplier).toFixed(2)}
                </div>
              </>
            ) : (
              <div className="col-span-2"></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderHeader = () => {
    if (activeTab === "top") {
      return (
        <div className="grid grid-cols-4 text-gray-400 text-xs px-2 py-1">
          <div>User</div>
          <div>Bet USD</div>
          <div>X</div>
          <div>Cash out USD</div>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-4 text-gray-400 text-xs px-2 py-1">
        <div>User</div>
        <div>Bet USD</div>
        <div>X</div>
        <div>Cash out USD</div>
      </div>
    );
  };

  return (
    <div className="bg-black text-white rounded-lg overflow-hidden">
      <div className="flex border-b border-aviator-gray">
        <button
          className={`flex-1 py-2 ${activeTab === "all" ? "bg-aviator-gray" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All Bets
        </button>
        <button
          className={`flex-1 py-2 ${activeTab === "my" ? "bg-aviator-gray" : ""}`}
          onClick={() => setActiveTab("my")}
        >
          My Bets
        </button>
        <button
          className={`flex-1 py-2 ${activeTab === "top" ? "bg-aviator-gray" : ""}`}
          onClick={() => setActiveTab("top")}
        >
          Top
        </button>
      </div>
      
      <div className="p-2">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm">
            {activeTab === "all" ? "ALL BETS" : activeTab === "my" ? "MY BETS" : "TOP PLAYERS"}
          </div>
          <button
            className="flex items-center text-xs text-gray-400 bg-aviator-gray rounded-lg px-2 py-1"
          >
            <Clock size={14} className="mr-1" />
            Previous Round
          </button>
        </div>
        
        {renderHeader()}
        
        <div className="max-h-64 overflow-y-auto">
          {renderPlayerList()}
        </div>
      </div>
      
      <div className="p-2 border-t border-aviator-gray flex justify-between items-center">
        <div className="text-xs text-gray-400">
          This game is <span className="text-green-500">Provably Fair</span>
        </div>
        <div className="text-xs text-gray-400">Powered by SPRIBE</div>
      </div>
    </div>
  );
};

export default GamePlayers;
