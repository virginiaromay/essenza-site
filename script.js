// ===================== MENÚ MÓVIL =====================
const btn = document.querySelector('.menu-toggle');
const menu = document.getElementById('menu');
btn?.addEventListener('click', ()=>{
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!expanded));
  menu.classList.toggle('show');
});

// ===================== AÑO EN FOOTER =====================
document.getElementById('year').textContent = new Date().getFullYear();

// ===================== SCROLL SUAVE EN ANCLAS =====================
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); menu?.classList.remove('show'); }
  });
});

// ===================== FILTROS DE PROYECTOS =====================
const chips = document.querySelectorAll('.chip');
const tiles = document.querySelectorAll('.tile');
chips.forEach(chip=>{
  chip.addEventListener('click', ()=>{
    chips.forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');
    const filter = chip.dataset.filter;
    tiles.forEach(t=>{
      const cat = t.dataset.category;
      const show = filter === 'all' || cat === filter;
      t.hidden = !show;
    });
  });
});
// ===================== HERO SLIDER (fade + autoplay) =====================
(function(){
  const slider = document.getElementById('hero-slider');
  if(!slider) return;

  const slides = Array.from(slider.querySelectorAll('.hero-slide'));
  const dotsWrap = document.getElementById('hero-dots');
  const btnPrev = slider.querySelector('.hero-nav.prev');
  const btnNext = slider.querySelector('.hero-nav.next');

  let index = 0, timer = null, AUTOPLAY_MS = 4500;

  // Crear puntos
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', `Ir a slide ${i+1}`);
    b.addEventListener('click', () => goTo(i, true));
    dotsWrap.appendChild(b);
  });

  function setActive(i){
    slides.forEach((s, k) => s.classList.toggle('is-active', k === i));
    dotsWrap.querySelectorAll('button').forEach((d, k) => d.classList.toggle('is-active', k === i));
  }

  function goTo(i, pause=false){
    index = (i + slides.length) % slides.length;
    setActive(index);
    if(pause) restartAutoplay();
  }

  function next(){ goTo(index + 1); }
  function prev(){ goTo(index - 1); }

  function startAutoplay(){
    clearInterval(timer);
    timer = setInterval(next, AUTOPLAY_MS);
  }
  function restartAutoplay(){
    clearInterval(timer);
    timer = setInterval(next, AUTOPLAY_MS);
  }

  btnPrev.addEventListener('click', () => prev());
  btnNext.addEventListener('click', () => next());

  // swipe en móvil
  let startX = null;
  slider.addEventListener('pointerdown', e => startX = e.clientX);
  slider.addEventListener('pointerup', e => {
    if(startX === null) return;
    const dx = e.clientX - startX;
    if(Math.abs(dx) > 30) dx > 0 ? prev() : next();
    startX = null;
  });

  setActive(index);
  startAutoplay();
})();


// ===================== LIGHTBOX (nativo con <dialog>) =====================
(function(){
  const dialog = document.getElementById('lightbox');
  if(!dialog) return; // solo en páginas de proyecto

  const img = dialog.querySelector('img');
  const caption = dialog.querySelector('.lb-caption');
  const btnClose = dialog.querySelector('.lb-close');
  const btnPrev = dialog.querySelector('.lb-prev');
  const btnNext = dialog.querySelector('.lb-next');
  const gallery = Array.from(document.querySelectorAll('.project-grid img'));

  let i = 0;

  function openAt(index){
    i = (index + gallery.length) % gallery.length;
    const el = gallery[i];
    img.src = el.src;
    img.alt = el.alt || "";
    caption.textContent = el.getAttribute('data-caption') || el.alt || "";
    if(typeof dialog.showModal === 'function'){
      dialog.showModal();
    }else{
      dialog.setAttribute('open',''); // fallback
    }
  }
  function close(){
    dialog.close ? dialog.close() : dialog.removeAttribute('open');
  }
  function prev(){ openAt(i - 1); }
  function next(){ openAt(i + 1); }

  // Click en miniaturas
  gallery.forEach((el, k)=>{
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', ()=> openAt(k));
  });

  // Controles
  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);

  // Cerrar al hacer click fuera del contenido (backdrop)
  dialog.addEventListener('click', (e)=>{
    const rect = img.getBoundingClientRect();
    const inImage = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
    if(!inImage) close();
  });

  // Teclado
  window.addEventListener('keydown', (e)=>{
    if(!dialog.open) return;
    if(e.key === 'Escape') close();
    if(e.key === 'ArrowLeft') prev();
    if(e.key === 'ArrowRight') next();
  });
})();
