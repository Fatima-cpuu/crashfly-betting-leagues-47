// Random crash point generator between 1.0 and 30.0 with distribution favoring lower values
export const generateCrashPoint = (): number => {
  // Generate a random number between 0 and 1
  const random = Math.random();
  
  // Distribution logic:
  // 80% chance for 1.01 to 3.00 (low values)
  // 15% chance for 3.01 to 8.00 (medium-high values)
  // 5% chance for 8.01 to 30.00 (rare high spikes)
  
  let crashValue;
  if (random < 0.80) {
    // Low values (1.01 to 3.00)
    crashValue = 1.01 + (random / 0.80) * 1.99;
  } else if (random < 0.95) {
    // Medium-high values (3.01 to 8.00)
    crashValue = 3.01 + ((random - 0.80) / 0.15) * 4.99;
  } else {
    // High spikes (8.01 to 30.00)
    crashValue = 8.01 + ((random - 0.95) / 0.05) * 21.99;
  }
  
  return parseFloat(crashValue.toFixed(2));
};

// Format multiplier with 'x' at the end
export const formatMultiplier = (value: number): string => {
  return `${value.toFixed(2)}x`;
};

// Format currency (USD)
export const formatCurrency = (value: number): string => {
  return value.toFixed(2);
};

// Generate random usernames
export const generateUsername = (): string => {
  const prefixes = ["user", "player", "aviator", "pilot", "flyer", "gamer", "d"];
  const randomNumber = Math.floor(Math.random() * 10000);
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  return `${randomPrefix}***${randomNumber % 10}`;
};

// Generate a random bet amount
export const generateBetAmount = (): number => {
  const amounts = [1, 5, 10, 20, 50, 100, 200, 500];
  return amounts[Math.floor(Math.random() * amounts.length)];
};

// Generate random cashout multiplier between 1.01 and the crash point
export const generateCashoutMultiplier = (maxMultiplier: number): number => {
  // Generate a value between 1.01 and maxMultiplier
  return parseFloat((Math.random() * (maxMultiplier - 1.01) + 1.01).toFixed(2));
};

// Generate history records
export const generateHistoryRecords = (count: number): number[] => {
  const records = [];
  for (let i = 0; i < count; i++) {
    records.push(parseFloat((Math.random() * 29 + 1).toFixed(2)));
  }
  return records;
};

// Generate a list of top players with high multipliers from 102.35 to 150.48
export const generateTopPlayers = (count: number): { 
  username: string; 
  betAmount: number; 
  multiplier: number; 
  winAmount: number;
}[] => {
  const players = [];
  for (let i = 0; i < count; i++) {
    const betAmount = generateBetAmount();
    const multiplier = parseFloat((Math.random() * (150.48 - 102.35) + 102.35).toFixed(2));
    players.push({
      username: generateUsername(),
      betAmount,
      multiplier,
      winAmount: parseFloat((betAmount * multiplier).toFixed(2))
    });
  }
  
  // Sort by winAmount in descending order
  return players.sort((a, b) => b.winAmount - a.winAmount);
};

// Generate simulated players for the current game
export const generateGamePlayers = (count: number): { 
  id: number;
  username: string; 
  betAmount: number; 
  avatar: string;
  hashedOut: boolean;
  cashoutMultiplier: number | null;
}[] => {
  const players = [];
  const avatarColors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];
  
  for (let i = 0; i < count; i++) {
    const avatarColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];
    players.push({
      id: i,
      username: generateUsername(),
      betAmount: generateBetAmount(),
      avatar: `https://ui-avatars.com/api/?background=${avatarColor}&color=fff&name=${i}`,
      hashedOut: false,
      cashoutMultiplier: null
    });
  }
  
  return players;
};
