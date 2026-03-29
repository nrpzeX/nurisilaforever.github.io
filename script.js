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
const lightbox = document.createElement('div');
lightbox.id = 'lightbox-overlay';
document.body.appendChild(lightbox);

function closeLightbox() {
    lightbox.style.display = 'none';
    lightbox.innerHTML = '';
    zoomedImage = null;
    document.body.style.overflow = '';
}

if (gallery) {
    gallery.addEventListener('click', (event) => {
        const img = event.target.closest('.photo-card img');
        if (!img) return;

        event.stopPropagation();

        if (zoomedImage) {
            closeLightbox();
        }

        const clone = document.createElement('img');
        clone.src = img.src;
        clone.alt = img.alt || '';
        lightbox.innerHTML = '';
        lightbox.appendChild(clone);
        lightbox.style.display = 'flex';
        zoomedImage = img;

        document.body.style.overflow = 'hidden';
    });

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox || event.target.tagName === 'IMG') {
            closeLightbox();
        }
    });

    document.addEventListener('click', (event) => {
        if (!zoomedImage) return;
        if (event.target.closest('.photo-card img') || event.target.closest('#lightbox-overlay')) return;

        closeLightbox();
    });
}
