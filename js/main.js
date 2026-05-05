/* =====================================================
   PEINTRE BROSSARD — Scripts principaux
   ===================================================== */

(() => {
  // 1) Header qui change au scroll
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 2) Animation des mots du H1 (cascade)
  document.querySelectorAll('#heroTitle .word > span').forEach((el, i) => {
    el.style.animationDelay = (0.35 + i * 0.12) + 's';
  });

  // 3) Parallax doux sur les coups de pinceau du hero (desktop seulement)
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const brushes = document.querySelectorAll('.brush');
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      brushes.forEach((b, i) => {
        const k = (i + 1) * 0.6;
        b.style.translate = (x * k) + 'px ' + (y * k) + 'px';
      });
    }, { passive: true });
  }

  // 4) Reveal au scroll (effet « peinture qui sèche »)
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('painted-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('[data-paint-in]').forEach(el => io.observe(el));

  // 5) FAQ accordéon
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('button');
    btn.addEventListener('click', () => {
      const isOpen = item.hasAttribute('open');
      // ferme les autres
      document.querySelectorAll('.faq-item[open]').forEach(other => {
        if (other !== item) other.removeAttribute('open');
      });
      if (isOpen) item.removeAttribute('open');
      else item.setAttribute('open', '');
    });
  });

  // 6) Année dynamique dans le footer
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // 7) Room reveal: click para pintar la pieza (textos vía data-attributes para i18n)
  const room = document.getElementById('roomReveal');
  if (room) {
    const hintText = room.querySelector('.hint-text');
    const labelText = room.querySelector('.label-text');
    const setPainted = (painted) => {
      room.classList.toggle('painted', painted);
      if (hintText && hintText.dataset.painted) {
        hintText.textContent = painted ? hintText.dataset.painted : hintText.dataset.default;
      }
      if (labelText && labelText.dataset.painted) {
        labelText.textContent = painted ? labelText.dataset.painted : labelText.dataset.default;
      }
    };
    room.addEventListener('click', () => setPainted(!room.classList.contains('painted')));
    room.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setPainted(!room.classList.contains('painted'));
      }
    });
  }

  // 8) Tags interactivos del mapa: actualizan el iframe al hacer clic
  const mapFrame = document.getElementById('zoneMap');
  const mapLabel = document.getElementById('mapLabel');
  const tags = document.querySelectorAll('.zone .tag');

  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      const q = tag.dataset.q;
      const zoom = tag.dataset.zoom || '13';
      const label = tag.dataset.label || tag.textContent.trim();
      if (!q || !mapFrame) return;

      // Actualiza el mapa
      mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=${zoom}&output=embed`;
      if (mapLabel) mapLabel.textContent = label;

      // Marca el tag activo
      tags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');

      // En mobile, lleva el mapa a la vista
      if (window.matchMedia('(max-width: 880px)').matches) {
        mapFrame.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });
})();
