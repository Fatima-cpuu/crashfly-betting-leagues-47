
import React, { useState } from "react";
import { useGame } from "@/contexts/GameContext";
import { GameState } from "@/types/game";
import { Minus, Plus } from "lucide-react";
import AutoBetSettings from "./AutoBetSettings";

interface BetControlsProps {
  betIndex: number;
}

const BetControls: React.FC<BetControlsProps> = ({ betIndex }) => {
  const { 
    gameState, 
    userBet, 
    updateBetAmount, 
    placeBet, 
    cashOut,
    userHasCashedOut,
    toggleAutoBet
  } = useGame();
  
  const [activeTab, setActiveTab] = useState<"bet" | "auto">("bet");
  const [showSettings, setShowSettings] = useState(false);
  
  const bet = userBet[betIndex];
  const hasCashedOut = userHasCashedOut[betIndex];

  const handleDecrease = () => {
    const newAmount = Math.max(1, bet.amount - 1);
    updateBetAmount(newAmount, betIndex);
  };

  const handleIncrease = () => {
    updateBetAmount(bet.amount + 1, betIndex);
  };

  const handleQuickAmount = (amount: number) => {
    updateBetAmount(amount, betIndex);
  };

  const handlePlaceBet = () => {
    placeBet(betIndex);
  };

  const handleCashOut = () => {
    cashOut(betIndex);
  };

  const isWaiting = gameState === GameState.WAITING || gameState === GameState.COUNTDOWN;
  const isRunning = gameState === GameState.RUNNING;

  return (
    <div className="w-full bg-aviator-dark p-4 rounded-lg">
      <div className="flex mb-4">
        <button
          className={`flex-1 ${activeTab === "bet" ? "tab-button-active" : "tab-button"}`}
          onClick={() => setActiveTab("bet")}
        >
          Bet
        </button>
        <button
          className={`flex-1 ${activeTab === "auto" ? "tab-button-active" : "tab-button"}`}
          onClick={() => setActiveTab("auto")}
        >
          Auto
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <button 
          className="w-10 h-10 bg-aviator-gray rounded-full flex items-center justify-center text-white"
          onClick={handleDecrease}
        >
          <Minus size={20} />
        </button>
        
        <div className="text-white text-2xl font-bold">{bet.amount.toFixed(2)}</div>
        
        <button 
          className="w-10 h-10 bg-aviator-gray rounded-full flex items-center justify-center text-white"
          onClick={handleIncrease}
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {[1.00, 2.00, 5.00, 10.00].map((amount) => (
          <button
            key={amount}
            className="bg-aviator-gray text-white py-1 px-2 rounded-md hover:bg-aviator-lightgray"
            onClick={() => handleQuickAmount(amount)}
          >
            {amount.toFixed(2)}
          </button>
        ))}
      </div>

      {activeTab === "bet" ? (
        <button
          className={`bet-button ${
            isRunning && !hasCashedOut ? "bg-aviator-red" : isWaiting ? "bg-aviator-green" : "bg-gray-600"
          }`}
          disabled={gameState === GameState.CRASHED || (isRunning && hasCashedOut)}
          onClick={isRunning && !hasCashedOut ? handleCashOut : handlePlaceBet}
        >
          {isRunning && !hasCashedOut ? "CASH OUT" : "BET"}
          <div className="text-sm">
            {bet.amount.toFixed(2)} USD
          </div>
        </button>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <span className="text-white">Auto Bet</span>
            <div className="flex items-center">
              <button 
                className="text-blue-400 underline ml-4"
                onClick={() => setShowSettings(!showSettings)}
              >
                Settings
              </button>
            </div>
          </div>
          
          {showSettings && <AutoBetSettings betIndex={betIndex} />}
          
          <button
            className={`bet-button ${
              bet.autoSettings.enabled ? "bg-aviator-red" : "bg-aviator-green"
            }`}
            onClick={() => toggleAutoBet(!bet.autoSettings.enabled, betIndex)}
          >
            {bet.autoSettings.enabled ? "STOP AUTO" : "START AUTO"}
            <div className="text-sm">
              {bet.amount.toFixed(2)} USD
            </div>
          </button>
        </>
      )}
    </div>
  );
};

export default BetControls;
