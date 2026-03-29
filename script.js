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

const gallery = document.querySelector('.gallery');
let zoomedImage = null;

if (gallery) {
    gallery.addEventListener('click', (event) => {
        const img = event.target.closest('.photo-card img');
        if (!img) return;

        event.stopPropagation();

        if (zoomedImage && zoomedImage !== img) {
            zoomedImage.classList.remove('enlarged');
            zoomedImage = null;
        }

        img.classList.toggle('enlarged');
        zoomedImage = img.classList.contains('enlarged') ? img : null;
    });

    document.addEventListener('click', (event) => {
        if (!zoomedImage) return;
        if (event.target.closest('.photo-card img')) return;

        zoomedImage.classList.remove('enlarged');
        zoomedImage = null;
    });
}