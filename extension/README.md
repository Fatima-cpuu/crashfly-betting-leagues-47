
# Aviator Crash Predictor Browser Extension

This browser extension predicts crash points in the Aviator game before they happen.

## Features

- Predicts crash points 7 seconds before the game starts
- Adjustable accuracy settings (50-95%)
- Non-intrusive overlay that doesn't interfere with gameplay
- Easy toggle to enable/disable predictions

## Installation

### Chrome

1. Download or clone this repository to your local machine
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top-right corner)
4. Click "Load unpacked" and select the `extension` folder from this repository
5. The extension should now be installed and visible in your extensions list

### Firefox

1. Download or clone this repository to your local machine
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on..."
4. Navigate to this repository and select the `manifest.json` file in the `extension` folder
5. The extension should now be installed and visible in your add-ons list

## Usage

1. Click on the extension icon in your browser toolbar to open the settings popup
2. Adjust the accuracy slider to your desired prediction accuracy
3. Make sure "Enable Predictor" is checked
4. Click "Apply Settings"
5. Navigate to any website with the Aviator game
6. The predictor will automatically show crash predictions 7 seconds before each game starts

## Note

This extension is for educational purposes only. The prediction algorithm simulates what a real predictor might do but doesn't actually have the ability to predict real game outcomes with the stated accuracy. Real Aviator games use provably fair algorithms that cannot be predicted.

## Customization

You can customize the appearance of the predictor by modifying the `predictor.css` file.
