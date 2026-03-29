// Generate floating hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 3000);
}

setInterval(createHeart, 300);

const audio = document.getElementById('background-audio');
const audioToggle = document.getElementById('audio-toggle');

function updateAudioButton() {
    if (!audio || !audioToggle) return;
    if (audio.paused || audio.muted) {
        audioToggle.textContent = '🔇';
    } else {
        audioToggle.textContent = '🔊';
    }
}

function toggleAudio() {
    if (!audio) return;

    if (audio.paused || audio.muted) {
        audio.muted = false;
        audio.play().catch(() => {
            // Çalma engellenirse değişiklikleri gör.
        }).finally(updateAudioButton);
    } else {
        audio.muted = true;
        updateAudioButton();
    }
}

audioToggle?.addEventListener('click', () => {
    toggleAudio();
});

window.addEventListener('load', () => {
    if (!audio) return;

    audio.volume = 0.5; // %50 ses seviyesi
    audio.muted = false;

    audio.play().then(() => {
        updateAudioButton();
    }).catch(() => {
        // Otomatik oynatma engellendiyse kullanıcı butona tıklayarak başlatabilir.
        updateAudioButton();
    });
});