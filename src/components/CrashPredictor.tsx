
import React, { useEffect, useState } from "react";
import { useGame } from "@/contexts/GameContext";
import { GameState } from "@/types/game";
import { formatMultiplier } from "@/utils/gameUtils";
import { cn } from "@/lib/utils";

const CrashPredictor: React.FC = () => {
  const { gameState, crashPoint, countdownTime } = useGame();
  const [prediction, setPrediction] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number>(85);
  const [showPrediction, setShowPrediction] = useState(false);

  const generatePrediction = () => {
    if (gameState !== GameState.WAITING) return;
    
    // Show prediction 7 seconds before game starts
    if (countdownTime <= 7 && countdownTime > 0) {
      if (!showPrediction) {
        // Generate a prediction based on the actual crash point
        // but add some randomness to make it look realistic
        const accuracyFactor = Math.random();
        const isAccurate = accuracyFactor < (accuracy / 100);
        
        if (isAccurate) {
          // Accurate prediction with small variation
          const variation = (Math.random() * 0.1) - 0.05; // ±5% variation
          const predictedValue = crashPoint * (1 + variation);
          setPrediction(parseFloat(predictedValue.toFixed(2)));
        } else {
          // Inaccurate prediction
          const randomValue = Math.random() * 29 + 1;
          setPrediction(parseFloat(randomValue.toFixed(2)));
        }
        
        setShowPrediction(true);
      }
    } else {
      setShowPrediction(false);
    }
  };

  // Reset prediction when game state changes
  useEffect(() => {
    if (gameState === GameState.RUNNING) {
      setShowPrediction(false);
    } else if (gameState === GameState.WAITING) {
      // Reset for the next round
      setPrediction(null);
    }
  }, [gameState]);

  // Generate prediction based on countdown
  useEffect(() => {
    generatePrediction();
  }, [countdownTime, gameState]);

  if (!showPrediction) {
    return null;
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
      <div className={cn(
        "bg-black/80 backdrop-blur-sm p-4 rounded-xl border-2 border-aviator-red animate-pulse",
        "flex flex-col items-center"
      )}>
        <div className="text-white text-sm font-medium mb-1">
          CRASH PREDICTION
        </div>
        <div className="text-aviator-red text-5xl font-bold">
          {prediction ? formatMultiplier(prediction) : "--"}
        </div>
        <div className="text-gray-400 text-xs mt-1">
          {accuracy}% accuracy
        </div>
      </div>
    </div>
  );
};

export default CrashPredictor;
