// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(href.length > 1){
      e.preventDefault();
      const el = document.querySelector(href);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// Lightbox for project images
document.querySelectorAll('.preview-media img').forEach(img=>{
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', ()=>{
    const light = document.createElement('div');
    light.style.position = 'fixed';
    light.style.inset = '0';
    light.style.background = 'rgba(0,0,0,0.9)';
    light.style.display = 'flex';
    light.style.alignItems = 'center';
    light.style.justifyContent = 'center';
    light.style.zIndex = '1200';
    const big = document.createElement('img');
    big.src = img.src;
    big.alt = img.alt;
    big.style.maxWidth = '95%';
    big.style.maxHeight = '95%';
    big.style.borderRadius = '10px';
    big.style.boxShadow = '0 40px 120px rgba(0,0,0,0.8)';
    light.appendChild(big);
    light.addEventListener('click', ()=>document.body.removeChild(light));
    document.body.appendChild(light);
  });
});
