(() => {
    const mapEl = document.getElementById('map');
    if (!mapEl) return;
    if (typeof L === 'undefined') return;

    // OpenStreetMap tiles (token gerekmez)
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const map = L.map(mapEl, {
        center: [38.9637, 35.2433], // (lat, lng) Türkiye merkezi (yaklaşık)
        zoom: 5,
        zoomControl: true
    });

    L.tileLayer(tileUrl, {
        maxZoom: 18,
    }).addTo(map);

    const places = [
        // Örnekler (lat, lng)
        { title: 'Nevşehir', note: 'Sevgilimle Birlikte İlk Gezimizzz', coords: [38.6244, 34.7239] },
        { title: 'Osmaniye', note: 'Sana Burada Rastladım Hayatımmmm', coords: [37.043440, 36.222771] }];

    const bounds = [];
    const heartPinIcon = L.divIcon({
        className: 'leaflet-heart-pin',
        html: `
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path fill="#ff1744" d="M12 21s-6.716-4.36-9.192-8.083C.64 9.64 1.57 6.427 4.2 4.9c1.8-1.04 4.1-.72 5.67.86L12 7.9l2.13-2.14c1.57-1.58 3.87-1.9 5.67-.86 2.63 1.53 3.56 4.74 1.392 8.017C18.716 16.64 12 21 12 21z"/>
            </svg>
        `,
        iconSize: [26, 26]
    });

    places.forEach((p) => {
        const noteHtml = `
            <div class="map-note">
                <div class="map-note__title">${p.title}</div>
                <div class="map-note__body">${p.note ?? ''}</div>
            </div>
        `;

        L.marker(p.coords, { icon: heartPinIcon })
            .addTo(map)
            .bindTooltip(noteHtml, {
                permanent: true,
                direction: 'top',
                offset: [0, -12],
                opacity: 1,
                className: 'map-note-tooltip',
                interactive: false
            });
        bounds.push(p.coords);
    });

    if (bounds.length > 0) {
        // Üstteki tooltip'ler için biraz daha fazla üst boşluk veriyoruz
        map.fitBounds(bounds, {
            paddingTopLeft: [30, 90],
            paddingBottomRight: [30, 40]
        });
    }
})();

