
import React, { useState, useEffect } from "react";
import { useGame } from "@/contexts/GameContext";
import { GameState } from "@/types/game";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";

interface BetControlsProps {
  betIndex: number;
}

const BetControls: React.FC<BetControlsProps> = ({ betIndex }) => {
  const { 
    gameState, 
    userBet, 
    currentMultiplier,
    updateBetAmount, 
    placeBet, 
    cashOut,
    userHasCashedOut,
    toggleAutoBet
  } = useGame();
  
  const [activeTab, setActiveTab] = useState<"bet" | "auto">("bet");
  const [hasBet, setHasBet] = useState<boolean>(false);
  
  const bet = userBet[betIndex];
  const hasCashedOut = userHasCashedOut[betIndex];
  const potentialWin = bet.amount * currentMultiplier;

  const handleDecrease = () => {
    const newAmount = Math.max(1, bet.amount - 1);
    updateBetAmount(newAmount, betIndex);
  };

  const handleIncrease = () => {
    const newAmount = Math.min(100, bet.amount + 1);
    updateBetAmount(newAmount, betIndex);
  };

  const handleQuickAmount = (amount: number) => {
    updateBetAmount(amount, betIndex);
  };

  const handlePlaceBet = () => {
    placeBet(betIndex);
    setHasBet(true);
  };

  const handleCashOut = () => {
    if (!hasBet) {
      toast.error("You need to place a bet first");
      return;
    }
    cashOut(betIndex);
  };

  // Reset hasBet when game is waiting for next round
  useEffect(() => {
    if (gameState === GameState.WAITING) {
      setHasBet(false);
    }
  }, [gameState]);

  const isWaiting = gameState === GameState.WAITING || gameState === GameState.COUNTDOWN;
  const isRunning = gameState === GameState.RUNNING;
  const canCashOut = isRunning && !hasCashedOut && hasBet;

  return (
    <div className="w-full bg-aviator-dark rounded-lg overflow-hidden">
      <div className="flex">
        <button
          className={`flex-1 py-2 ${activeTab === "bet" ? "bg-gray-800" : "bg-gray-700"}`}
          onClick={() => setActiveTab("bet")}
        >
          Bet
        </button>
        <button
          className={`flex-1 py-2 ${activeTab === "auto" ? "bg-gray-800" : "bg-gray-700"}`}
          onClick={() => setActiveTab("auto")}
        >
          Auto
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <button 
            className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white"
            onClick={handleDecrease}
          >
            <Minus size={24} />
          </button>
          
          <div className="text-white text-3xl font-bold">{bet.amount.toFixed(2)}</div>
          
          <button 
            className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white"
            onClick={handleIncrease}
          >
            <Plus size={24} />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-4">
          {[10.00, 25.00, 50.00, 100.00].map((amount) => (
            <button
              key={amount}
              className="bg-gray-700 text-white py-2 rounded"
              onClick={() => handleQuickAmount(amount)}
            >
              {amount.toFixed(2)}
            </button>
          ))}
        </div>

        {activeTab === "bet" ? (
          <button
            className={`w-full py-4 rounded-md text-white font-bold flex flex-col items-center justify-center ${
              canCashOut ? "bg-green-600" : isWaiting ? "bg-green-600" : "bg-gray-600"
            }`}
            disabled={gameState === GameState.CRASHED || (isRunning && hasCashedOut) || (isRunning && !hasBet)}
            onClick={canCashOut ? handleCashOut : handlePlaceBet}
          >
            {canCashOut ? (
              <>
                CASH OUT
                <div className="text-sm mt-1">
                  {potentialWin.toFixed(2)} USD
                </div>
              </>
            ) : (
              <>
                BET
                <div className="text-sm mt-1">
                  {bet.amount.toFixed(2)} USD
                </div>
              </>
            )}
          </button>
        ) : (
          <button
            className={`w-full py-4 rounded-md text-white font-bold flex flex-col items-center justify-center ${
              bet.autoSettings.enabled ? "bg-aviator-red" : "bg-green-600"
            }`}
            onClick={() => toggleAutoBet(!bet.autoSettings.enabled, betIndex)}
          >
            {bet.autoSettings.enabled ? "STOP AUTO" : "START AUTO"}
            <div className="text-sm mt-1">
              {bet.amount.toFixed(2)} USD
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default BetControls;
