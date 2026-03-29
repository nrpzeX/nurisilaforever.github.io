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

window.addEventListener('load', () => {
    if (!audio) return;

    audio.volume = 0.020; // %50 ses seviyesi
    audio.muted = false;

    audio.play().then(() => {
        // Müzik başladı
    }).catch(() => {
        // Otomatik oynatma engellendiyse kullanıcı tıklayarak başlatabilir.
    });
});

document.addEventListener('click', function startAudio() {
    if (audio && audio.paused) {
        audio.play().then(() => {
            // Müzik başladı
        }).catch(() => {
            // Çalma başarısız olursa hiçbir şey yapma
        });
    }
    document.removeEventListener('click', startAudio);
});