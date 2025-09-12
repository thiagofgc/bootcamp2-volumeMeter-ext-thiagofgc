chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'SET_VOLUME') {
    const newVolume = request.volume / 100; // Converte de 0-100 para 0.0-1.0
    const mediaElements = document.querySelectorAll('video, audio');
    
    mediaElements.forEach(element => {
      element.volume = newVolume;
    });
    
    sendResponse({ status: 'Volume updated on page' });
  }
  return true;
});