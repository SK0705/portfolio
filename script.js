/* ==========================================================
   Portfolio JS — Smooth scroll, lightbox, and interactive contact
   Author: Venkata Sai Srikar Kuchi
   ========================================================== */

// Smooth scrolling for internal links
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

// Lightbox for project images (click to zoom)
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
    light.style.backdropFilter = 'blur(6px)';

    const big = document.createElement('img');
    big.src = img.src;
    big.alt = img.alt || 'Project image';
    big.style.maxWidth = '95%';
    big.style.maxHeight = '95%';
    big.style.borderRadius = '12px';
    big.style.boxShadow = '0 40px 120px rgba(0,0,0,0.8)';
    big.style.transition = 'transform .4s ease';
    big.style.transform = 'scale(1.03)';

    const fadeIn = () => { big.style.transform = 'scale(1)'; };
    setTimeout(fadeIn, 50);

    // Close on click or ESC
    light.addEventListener('click', ()=>document.body.removeChild(light));
    window.addEventListener('keydown', e=>{
      if(e.key === 'Escape' && document.body.contains(light)) document.body.removeChild(light);
    });

    light.appendChild(big);
    document.body.appendChild(light);
  });
});

// Contact section: copy-to-clipboard buttons
(function(){
  const toast = document.getElementById('copyToast');
  document.querySelectorAll('.contact-btn[data-copy]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const text = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(text).then(()=>{
        // show animated toast
        if(toast){
          toast.hidden = false;
          toast.classList.add('show');
          setTimeout(()=>{
            toast.classList.remove('show');
            setTimeout(()=> toast.hidden = true, 300);
          }, 2500);
        }
        // visual pulse on button
        btn.animate([
          { transform:'scale(1)', backgroundPosition:'0% 50%' },
          { transform:'scale(1.05)', backgroundPosition:'100% 50%' },
          { transform:'scale(1)', backgroundPosition:'0% 50%' }
        ], {duration:500, easing:'ease'});
      });
    });
  });
})();
