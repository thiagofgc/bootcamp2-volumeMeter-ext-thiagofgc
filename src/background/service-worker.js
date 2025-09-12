// Função para enviar o comando de volume para a aba ativa
async function sendVolumeToActiveTab(volume) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab) {
    chrome.tabs.sendMessage(tab.id, {
      type: 'SET_VOLUME',
      volume: volume
    });
  }
}

// Função para adicionar uma nova entrada ao histórico
async function addVolumeToHistory(volume) {
  const { volumeHistory = [] } = await chrome.storage.local.get('volumeHistory');
  const newEntry = {
    volume: volume,
    timestamp: new Date().toISOString()
  };
  volumeHistory.unshift(newEntry);
  if (volumeHistory.length > 100) volumeHistory.pop();
  await chrome.storage.local.set({ volumeHistory });
}

// Ouve as mensagens da popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'volumeChanged') {
    const newVolume = request.volume;
    chrome.storage.local.set({ lastVolume: newVolume });
    addVolumeToHistory(newVolume);
    sendVolumeToActiveTab(newVolume); // Envia o comando para a página
  }
  return true;
});

// Evento de instalação inicial
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ lastVolume: 50, volumeHistory: [] });
});