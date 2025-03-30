
import React, { useRef, useEffect } from "react";
import { useGame } from "@/contexts/GameContext";
import { GameState } from "@/types/game";
import { Plane } from "lucide-react";

const GameCanvas: React.FC = () => {
  const { gameState, currentMultiplier, countdownTime } = useGame();
  const canvasRef = useRef<HTMLDivElement>(null);

  const getStatusText = () => {
    switch (gameState) {
      case GameState.WAITING:
        return `Next round in ${countdownTime}`;
      case GameState.COUNTDOWN:
        return "Ready?";
      case GameState.RUNNING:
        return currentMultiplier.toFixed(2) + "x";
      case GameState.CRASHED:
        return "CRASHED AT " + currentMultiplier.toFixed(2) + "x";
      default:
        return "";
    }
  };

  return (
    <div 
      ref={canvasRef}
      className="relative w-full h-64 bg-aviator-dark ray-background flex items-center justify-center overflow-hidden"
    >
      {gameState === GameState.CRASHED && (
        <div className="absolute text-center">
          <div className="text-aviator-red font-bold text-3xl mb-2">
            CRASHED!
          </div>
          <div className="text-red-500 font-bold text-5xl">
            {currentMultiplier.toFixed(2)}x
          </div>
        </div>
      )}
      
      {gameState === GameState.WAITING && (
        <div className="text-white font-bold text-3xl">
          {countdownTime}
        </div>
      )}
      
      {gameState === GameState.RUNNING && (
        <div className="text-aviator-green font-bold text-5xl">
          {currentMultiplier.toFixed(2)}x
        </div>
      )}
      
      {/* Plane animation */}
      {gameState === GameState.RUNNING && (
        <div className="absolute left-1/4 bottom-1/4 transform -translate-x-1/2 text-red-500 animate-plane-flying">
          <Plane size={48} className="transform rotate-12" />
        </div>
      )}
      
      {gameState === GameState.CRASHED && (
        <div className="absolute left-1/4 bottom-1/4 transform -translate-x-1/2 text-red-500 animate-plane-crash">
          <Plane size={48} />
        </div>
      )}
    </div>
  );
};

export default GameCanvas;
