
import React from "react";
import GameHeader from "@/components/GameHeader";
import GameCanvas from "@/components/GameCanvas";
import BetControls from "@/components/BetControls";
import GamePlayers from "@/components/GamePlayers";

const Index = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <GameHeader />
      
      <div className="p-4 space-y-4">
        <GameCanvas />
        
        <BetControls betIndex={0} />
        
        <BetControls betIndex={1} />
        
        <GamePlayers />
      </div>
    </div>
  );
};

export default Index;
