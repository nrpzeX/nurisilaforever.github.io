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
const audioToggleBtn = document.getElementById('audio-toggle');

function setAudioToggleLabel() {
    if (!audioToggleBtn || !audio) return;
    audioToggleBtn.textContent = audio.muted ? '🔇' : '🔊';
}

async function tryPlayAudio({ allowMutedFallback = true } = {}) {
    if (!audio) return false;

    try {
        await audio.play();
        return true;
    } catch (_) {
        if (!allowMutedFallback) return false;

        try {
            audio.muted = true;
            await audio.play();
            return true;
        } catch (_) {
            return false;
        }
    } finally {
        setAudioToggleLabel();
    }
}

window.addEventListener('load', () => {
    if (!audio) return;

    audio.volume = 0.020;
    audio.muted = false;
    setAudioToggleLabel();

    void tryPlayAudio({ allowMutedFallback: true });
});

function unlockAudio() {
    if (!audio) return;
    if (audio.muted) audio.muted = false;
    void tryPlayAudio({ allowMutedFallback: false });
    setAudioToggleLabel();
}

document.addEventListener('pointerdown', unlockAudio, { once: true, passive: true });
document.addEventListener('keydown', unlockAudio, { once: true });

if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!audio) return;

        audio.muted = !audio.muted;
        setAudioToggleLabel();

        if (!audio.muted && audio.paused) {
            void tryPlayAudio({ allowMutedFallback: false });
        }
    });
}

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
