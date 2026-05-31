function switchColour(cardId, index) {
    const wrap = document.querySelector('#' + cardId + ' .slider-wrap');
    const track = document.querySelector('#' + cardId + ' .slider-track');
    const dots = document.querySelectorAll('#' + cardId + ' .slider-dot');
    const btns = document.querySelectorAll('#' + cardId + ' .colour-btn');
    if (!track || !wrap) return;
    const slideWidth = wrap.offsetWidth;
    track.style.transform = 'translateX(-' + (index * slideWidth) + 'px)';
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    btns.forEach((b, i) => b.classList.toggle('selected', i === index));
  }

  function initSlider(cardId, total) {
    const wrap = document.querySelector('#' + cardId + ' .slider-wrap');
    const track = document.querySelector('#' + cardId + ' .slider-track');
    const slides = document.querySelectorAll('#' + cardId + ' .slider-slide');
    const dots = document.querySelectorAll('#' + cardId + ' .slider-dot');
    let current = 0;
    function fixSizes() {
      if (!wrap) return;
      const w = wrap.offsetWidth;
      const h = wrap.offsetHeight;
      track.style.width = (w * total) + 'px';
      slides.forEach(s => { s.style.width = w + 'px'; s.style.minWidth = w + 'px'; s.style.height = h + 'px'; });
    }
    fixSizes();
    window.addEventListener('resize', fixSizes);
    document.querySelector('#' + cardId + ' .slider-next').onclick = () => { current = (current+1)%total; switchColour(cardId, current); };
    document.querySelector('#' + cardId + ' .slider-prev').onclick = () => { current = (current-1+total)%total; switchColour(cardId, current); };
    dots.forEach((d, i) => d.onclick = () => { current = i; switchColour(cardId, i); });
  }

  function sizePick(cardId, btn) {
    const scope = cardId ? document.getElementById(cardId) : btn.closest('.product-card,.slider-card');
    if (!scope) return;
    scope.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  }

  function orderSlider(cardId, name, price) {
    const sizeEl = document.querySelector('#' + cardId + ' .size-btn.selected');
    const colourEl = document.querySelector('#' + cardId + ' .colour-btn.selected');
    if (!sizeEl) { alert('Please select a size first!'); return; }
    const size = sizeEl.textContent;
    const colour = colourEl ? colourEl.textContent : '';
    const msg = encodeURIComponent('Hi POV! I want to order: ' + name + (colour && colour!='All'?' · Colour: '+colour:'') + ' · Size: ' + size + ' · Price: ' + price);
    window.open('https://wa.me/27639319961?text=' + msg, '_blank');
  }

  function setFilter(btn, cat) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.product-card, .slider-card').forEach(card => {
      card.style.display = (cat === 'all' || card.dataset.cat === cat) ? 'block' : 'none';
    });
  }

  function openModal(name, price, btn) {
    const card = btn && btn.closest ? btn.closest('.product-card') : null;
    const sizeEl = card ? card.querySelector('.size-btn.selected') : null;
    if (card && card.querySelector('.size-btn') && !sizeEl) {
      alert('Please select a size first!');
      return;
    }
    const size = sizeEl ? sizeEl.textContent : '';
    const msg = encodeURIComponent('Hi POV! I want to order: ' + name + (size ? ' · Size: ' + size : '') + ' · Price: ' + price);
    window.open('https://wa.me/27639319961?text=' + msg, '_blank');
  }

  function closeModal() {
    document.getElementById('modal').classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('modal').addEventListener('click', e => {
    if (e.target === document.getElementById('modal')) closeModal();
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, {threshold:0.1});
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

  function sendContactWA() {
    const name    = (document.getElementById('cf-name').value || '').trim();
    const phone   = (document.getElementById('cf-phone').value || '').trim();
    const looking = (document.getElementById('cf-looking').value || '').trim();
    const details = (document.getElementById('cf-details').value || '').trim();
    if (!name || !phone) {
      alert('Please add your name and WhatsApp number so POV can reply.');
      return;
    }
    const lines = [
      'Hi POV, new enquiry from the website:',
      'Name: ' + name,
      'WhatsApp: ' + phone,
      looking ? 'Looking for: ' + looking : '',
      details ? 'Details: ' + details : ''
    ].filter(Boolean);
    const url = 'https://wa.me/27639319961?text=' + encodeURIComponent(lines.join('\n'));
    window.open(url, '_blank', 'noopener');
  }

  document.addEventListener('DOMContentLoaded', function() {
    initSlider('retro-blossom', 2);
    initSlider('cropped-vest', 2);
    initSlider('statement-hoodie', 4);
    initSlider('pov-cap', 2);
    initSlider('pov-shades', 2);
    initSlider('pov-bag', 2);
    initSlider('pov-beanie', 8);
    initSlider('origin-piece', 2);
  });