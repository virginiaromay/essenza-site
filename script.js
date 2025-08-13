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
