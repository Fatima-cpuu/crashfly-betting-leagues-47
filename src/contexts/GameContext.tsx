import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from "react";
import { 
  GameState, 
  Player, 
  TopPlayer, 
  UserBet, 
  AutoBetSettings 
} from "../types/game";
import { 
  generateCrashPoint, 
  generateGamePlayers, 
  generateTopPlayers,
  generateCashoutMultiplier
} from "../utils/gameUtils";
import { toast } from "sonner";

interface GameContextType {
  gameState: GameState;
  currentMultiplier: number;
  crashPoint: number;
  players: Player[];
  topPlayers: TopPlayer[];
  history: number[];
  countdownTime: number;
  userBet: UserBet[];
  userBalance: number;
  userHasCashedOut: boolean[];
  
  // Actions
  placeBet: (betIndex: number) => void;
  cashOut: (betIndex: number) => void;
  updateBetAmount: (amount: number, betIndex: number) => void;
  toggleAutoBet: (enabled: boolean, betIndex: number) => void;
  updateAutoBetSettings: (settings: Partial<AutoBetSettings>, betIndex: number) => void;
  addFunds: (amount: number) => void;
  withdrawFunds: (amount: number) => boolean;
  
  // New action for external display
  openMultiplierWindow: () => void;
}

const defaultAutoBetSettings: AutoBetSettings = {
  enabled: false,
  autoCashout: 2.0,
  stopOnWin: false,
  stopOnLoss: false,
  stopAfterBets: 0,
  increaseBetOnWin: 0,
  increaseBetOnLoss: 0
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(GameState.WAITING);
  const [currentMultiplier, setCurrentMultiplier] = useState<number>(1.0);
  const [crashPoint, setCrashPoint] = useState<number>(1.0);
  const [players, setPlayers] = useState<Player[]>([]);
  const [topPlayers, setTopPlayers] = useState<TopPlayer[]>([]);
  const [history, setHistory] = useState<number[]>([]);
  const [countdownTime, setCountdownTime] = useState<number>(10);
  const [userBet, setUserBet] = useState<UserBet[]>([
    { amount: 1.0, autoSettings: { ...defaultAutoBetSettings } },
    { amount: 1.0, autoSettings: { ...defaultAutoBetSettings } }
  ]);
  const [userBalance, setUserBalance] = useState<number>(0);
  const [userHasCashedOut, setUserHasCashedOut] = useState<boolean[]>([false, false]);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const externalWindowRef = useRef<Window | null>(null);

  useEffect(() => {
    setPlayers(generateGamePlayers(15));
    setTopPlayers(generateTopPlayers(10));
    setHistory(Array.from({ length: 10 }, () => generateCrashPoint()));
  }, []);

  useEffect(() => {
    if (gameState === GameState.RUNNING) {
      const updatedPlayers = players.map(player => {
        if (!player.hashedOut && Math.random() < 0.03) {
          return {
            ...player,
            hashedOut: true,
            cashoutMultiplier: currentMultiplier
          };
        }
        return player;
      });
      
      setPlayers(updatedPlayers);
    }
  }, [currentMultiplier, gameState, players]);

  useEffect(() => {
    if (gameState === GameState.RUNNING) {
      userBet.forEach((bet, index) => {
        if (
          bet.autoSettings.enabled && 
          !userHasCashedOut[index] && 
          currentMultiplier >= bet.autoSettings.autoCashout
        ) {
          cashOut(index);
        }
      });
    }
  }, [currentMultiplier, gameState, userBet]);

  const startGame = useCallback(() => {
    setGameState(GameState.RUNNING);
    const newCrashPoint = generateCrashPoint();
    setCrashPoint(newCrashPoint);
    setCurrentMultiplier(1.0);
    
    setUserHasCashedOut([false, false]);
    
    if (externalWindowRef.current && !externalWindowRef.current.closed) {
      externalWindowRef.current.postMessage({
        type: 'CRASH_POINT',
        crashPoint: newCrashPoint,
        countdown: 6
      }, '*');
    }
    
    const id = window.setInterval(() => {
      setCurrentMultiplier(prev => {
        const newMultiplier = parseFloat((prev * 1.01).toFixed(2));
        
        if (externalWindowRef.current && !externalWindowRef.current.closed) {
          externalWindowRef.current.postMessage({
            type: 'MULTIPLIER_UPDATE',
            multiplier: newMultiplier,
          }, '*');
        }
        
        if (newMultiplier >= newCrashPoint) {
          window.clearInterval(id);
          setIntervalId(null);
          setGameState(GameState.CRASHED);
          
          setHistory(prev => [newCrashPoint, ...prev].slice(0, 10));
          
          setTimeout(() => {
            setGameState(GameState.WAITING);
            setCountdownTime(10);
            setPlayers(generateGamePlayers(15));
          }, 3000);
        }
        
        return newMultiplier;
      });
    }, 100);
    
    setIntervalId(id);
  }, []);

  useEffect(() => {
    if (gameState === GameState.WAITING) {
      const id = window.setInterval(() => {
        setCountdownTime(prev => {
          if (prev <= 1) {
            clearInterval(id);
            setGameState(GameState.COUNTDOWN);
            setTimeout(() => {
              startGame();
            }, 1000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => {
        clearInterval(id);
      };
    }
  }, [gameState, startGame]);

  useEffect(() => {
    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const placeBet = (betIndex: number) => {
    if (gameState !== GameState.WAITING && gameState !== GameState.COUNTDOWN) {
      toast("Cannot place bet while game is in progress");
      return;
    }
    
    const bet = userBet[betIndex].amount;
    
    if (userBalance < bet) {
      toast.error("Insufficient balance");
      return;
    }
    
    setUserBalance(prev => prev - bet);
    toast(`Bet placed: ${bet} USD`);
  };

  const cashOut = (betIndex: number) => {
    if (gameState !== GameState.RUNNING || userHasCashedOut[betIndex]) {
      return;
    }
    
    const profit = userBet[betIndex].amount * currentMultiplier;
    
    setUserBalance(prev => prev + profit);
    
    setUserHasCashedOut(prev => {
      const updated = [...prev];
      updated[betIndex] = true;
      return updated;
    });
    
    toast(`Cashed out: ${profit.toFixed(2)} USD at ${currentMultiplier.toFixed(2)}x`);
  };

  const updateBetAmount = (amount: number, betIndex: number) => {
    const limitedAmount = Math.min(amount, 100);
    
    setUserBet(prev => {
      const updated = [...prev];
      updated[betIndex] = { ...updated[betIndex], amount: limitedAmount };
      return updated;
    });
  };

  const toggleAutoBet = (enabled: boolean, betIndex: number) => {
    setUserBet(prev => {
      const updated = [...prev];
      updated[betIndex] = { 
        ...updated[betIndex], 
        autoSettings: { 
          ...updated[betIndex].autoSettings, 
          enabled 
        } 
      };
      return updated;
    });
  };

  const updateAutoBetSettings = (settings: Partial<AutoBetSettings>, betIndex: number) => {
    setUserBet(prev => {
      const updated = [...prev];
      updated[betIndex] = { 
        ...updated[betIndex], 
        autoSettings: { 
          ...updated[betIndex].autoSettings, 
          ...settings 
        } 
      };
      return updated;
    });
  };

  const addFunds = (amount: number) => {
    setUserBalance(prev => prev + amount);
    toast.success(`Successfully deposited ${amount} USD`);
  };

  const withdrawFunds = (amount: number) => {
    if (amount > userBalance) {
      toast.error("Insufficient balance");
      return false;
    }
    
    setUserBalance(prev => prev - amount);
    toast.success(`Successfully withdrawn ${amount} USD`);
    return true;
  };

  const openMultiplierWindow = useCallback(() => {
    if (externalWindowRef.current && !externalWindowRef.current.closed) {
      externalWindowRef.current.close();
    }
    
    const newWindow = window.open('/multiplier-display.html', 'multiplierDisplay', 
      'width=400,height=300,menubar=no,toolbar=no');
    
    if (newWindow) {
      externalWindowRef.current = newWindow;
      
      newWindow.onload = () => {
        newWindow.postMessage({
          type: 'INIT',
          currentMultiplier: currentMultiplier,
          gameState: gameState,
          crashPoint: crashPoint,
        }, '*');
      };
    } else {
      toast.error('Failed to open display window. Please allow popups for this site.');
    }
  }, [currentMultiplier, gameState, crashPoint]);

  return (
    <GameContext.Provider
      value={{
        gameState,
        currentMultiplier,
        crashPoint,
        players,
        topPlayers,
        history,
        countdownTime,
        userBet,
        userBalance,
        userHasCashedOut,
        placeBet,
        cashOut,
        updateBetAmount,
        toggleAutoBet,
        updateAutoBetSettings,
        addFunds,
        withdrawFunds,
        openMultiplierWindow,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
