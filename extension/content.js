
let predictorElement = null;
let accuracy = 85;
let enabled = true;
let gameStatus = 'waiting';
let countdownInterval = null;
let countdownTime = 0;
let crashPoint = 0;

// Load settings
chrome.storage.local.get(['accuracy', 'enabled'], function(result) {
  if (result.accuracy) {
    accuracy = result.accuracy;
  }
  
  if (result.enabled !== undefined) {
    enabled = result.enabled;
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === 'update_settings') {
    accuracy = message.accuracy;
    enabled = message.enabled;
    
    if (!enabled && predictorElement) {
      removePredictorElement();
    }
  }
});

// Create predictor element
function createPredictorElement(prediction) {
  if (predictorElement) {
    removePredictorElement();
  }
  
  predictorElement = document.createElement('div');
  predictorElement.className = 'aviator-predictor';
  predictorElement.style.left = '50%';
  predictorElement.style.top = '50%';
  
  const title = document.createElement('div');
  title.className = 'aviator-predictor-title';
  title.textContent = 'CRASH PREDICTION';
  
  const value = document.createElement('div');
  value.className = 'aviator-predictor-value';
  value.textContent = prediction.toFixed(2) + 'x';
  
  const accuracyText = document.createElement('div');
  accuracyText.className = 'aviator-predictor-accuracy';
  accuracyText.textContent = accuracy + '% accuracy';
  
  predictorElement.appendChild(title);
  predictorElement.appendChild(value);
  predictorElement.appendChild(accuracyText);
  
  document.body.appendChild(predictorElement);
}

// Remove predictor element
function removePredictorElement() {
  if (predictorElement && predictorElement.parentNode) {
    predictorElement.parentNode.removeChild(predictorElement);
    predictorElement = null;
  }
}

// Generate a prediction
function generatePrediction() {
  if (!enabled || gameStatus !== 'waiting' || countdownTime > 7) {
    return;
  }
  
  // Generate a random crash point between 1 and 30
  crashPoint = Math.random() * 29 + 1;
  
  // Decide if prediction will be accurate based on accuracy setting
  const isAccurate = Math.random() < (accuracy / 100);
  
  let prediction;
  if (isAccurate) {
    // Add small variation to the actual crash point
    const variation = (Math.random() * 0.1) - 0.05; // ±5% variation
    prediction = crashPoint * (1 + variation);
  } else {
    // Generate random value for inaccurate prediction
    prediction = Math.random() * 29 + 1;
  }
  
  createPredictorElement(prediction);
}

// Monitor the game state
function monitorGameState() {
  // This function would need to analyze the DOM to detect game state
  // For this example, we'll simulate the game cycle
  
  let gameCycleTime = 15000; // 15 seconds per game cycle
  
  setInterval(() => {
    // Simulate game cycle: waiting (10s) -> running (5s) -> crashed -> waiting...
    countdownTime = Math.floor((gameCycleTime - (Date.now() % gameCycleTime)) / 1000);
    
    if (countdownTime > 5) {
      // Waiting state
      gameStatus = 'waiting';
      
      // Show prediction 7 seconds before game starts
      if (countdownTime <= 7 && !predictorElement && enabled) {
        generatePrediction();
      }
    } else {
      // Running or crashed state
      if (countdownTime > 0) {
        gameStatus = 'running';
      } else {
        gameStatus = 'crashed';
      }
      
      // Hide prediction when game is running
      if (predictorElement) {
        removePredictorElement();
      }
    }
  }, 1000);
}

// Start monitoring when the page loads
window.addEventListener('load', function() {
  // Wait a bit for the game to initialize
  setTimeout(monitorGameState, 2000);
});

// Create placeholder icon images for the browser extension
function createIconFiles() {
  // This is just a placeholder function since we can't actually create
  // files on the user's system directly from content script
  console.log("Icon files need to be created manually for the extension");
}
