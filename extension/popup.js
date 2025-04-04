
document.addEventListener('DOMContentLoaded', function() {
  const accuracySlider = document.getElementById('accuracy');
  const accuracyValue = document.getElementById('accuracy-value');
  const enablePredictor = document.getElementById('enable-predictor');
  const applyButton = document.getElementById('apply-settings');
  const statusText = document.getElementById('status');
  
  // Load saved settings
  chrome.storage.local.get(['accuracy', 'enabled'], function(result) {
    if (result.accuracy) {
      accuracySlider.value = result.accuracy;
      accuracyValue.textContent = result.accuracy + '%';
    }
    
    if (result.enabled !== undefined) {
      enablePredictor.checked = result.enabled;
    }
  });
  
  // Update accuracy value as slider changes
  accuracySlider.addEventListener('input', function() {
    accuracyValue.textContent = this.value + '%';
  });
  
  // Save settings when apply button is clicked
  applyButton.addEventListener('click', function() {
    const accuracy = accuracySlider.value;
    const enabled = enablePredictor.checked;
    
    chrome.storage.local.set({
      accuracy: accuracy,
      enabled: enabled
    }, function() {
      statusText.textContent = 'Settings saved! Refresh the game page.';
      
      // Send message to content script to update settings
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: 'update_settings',
          accuracy: accuracy,
          enabled: enabled
        });
      });
    });
  });
});
