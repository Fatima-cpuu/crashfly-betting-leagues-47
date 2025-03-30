
export interface Player {
  id: number;
  username: string;
  betAmount: number;
  avatar: string;
  hashedOut: boolean;
  cashoutMultiplier: number | null;
}

export interface TopPlayer {
  username: string;
  betAmount: number;
  multiplier: number;
  winAmount: number;
}

export interface AutoBetSettings {
  enabled: boolean;
  autoCashout: number;
  stopOnWin: boolean;
  stopOnLoss: boolean;
  stopAfterBets: number;
  increaseBetOnWin: number;
  increaseBetOnLoss: number;
}

export interface UserBet {
  amount: number;
  autoSettings: AutoBetSettings;
}

export enum GameState {
  WAITING = "waiting",
  COUNTDOWN = "countdown",
  RUNNING = "running",
  CRASHED = "crashed",
}
