
import React from "react";
import GameHeader from "@/components/GameHeader";
import GameCanvas from "@/components/GameCanvas";
import BetControls from "@/components/BetControls";
import GamePlayers from "@/components/GamePlayers";
import MainNavigation from "@/components/NavigationMenu";

const Index = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <GameHeader />
      
      <div className="p-4 space-y-4 relative">
        <MainNavigation />
        <GameCanvas />
        
        <div className="space-y-2">
          <BetControls betIndex={0} />
          <BetControls betIndex={1} />
        </div>
        
        <GamePlayers />
      </div>
    </div>
  );
};

export default Index;
