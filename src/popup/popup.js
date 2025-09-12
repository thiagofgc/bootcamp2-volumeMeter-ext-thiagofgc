// Aguarda o conteúdo da página ser totalmente carregado para executar o script
document.addEventListener('DOMContentLoaded', function() {

    // Seleciona os elementos da página que vamos manipular
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeValue = document.getElementById('volumeValue');
    const muteButton = document.getElementById('muteButton');

    let lastVolume = volumeSlider.value; // Guarda o último volume antes de silenciar

    // Função para atualizar a interface com base no valor do volume
    function updateUI(value) {
        // Atualiza o texto que mostra o número do volume
        volumeValue.textContent = value;
        
        // Atualiza a posição visual do slider
        volumeSlider.value = value;

        // Atualiza a cor de fundo do slider para dar um feedback visual
        const percentage = (value / 100) * 100;
        volumeSlider.style.background = `linear-gradient(to right, #007bff ${percentage}%, #ddd ${percentage}%)`;

        // Muda o texto do botão se estiver mudo ou não
        if (value == 0) {
            muteButton.textContent = 'Ativar Som';
        } else {
            muteButton.textContent = 'Silenciar';
        }
    }

    // Adiciona um "ouvinte" para o evento de arrastar o slider
    volumeSlider.addEventListener('input', function() {
        const currentVolume = volumeSlider.value;
        updateUI(currentVolume);
        
        // Se o volume não for zero, guardamos ele como o último volume válido
        if (currentVolume > 0) {
            lastVolume = currentVolume;
        }
    });

    // Adiciona um "ouvinte" para o clique no botão de silenciar
    muteButton.addEventListener('click', function() {
        if (volumeSlider.value > 0) {
            // Se não está mudo, guarda o volume atual e silencia
            lastVolume = volumeSlider.value;
            updateUI(0);
        } else {
            // Se está mudo, restaura o último volume conhecido
            updateUI(lastVolume);
        }
    });

    // Inicia a UI com o valor padrão ao abrir a popup
    updateUI(volumeSlider.value);
});