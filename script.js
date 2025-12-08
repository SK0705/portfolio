/* ==========================================================
   Portfolio JS — Smooth scroll, lightbox, contact tools & form submit
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
    const escHandler = e=>{
      if(e.key === 'Escape' && document.body.contains(light)){
        document.body.removeChild(light);
        window.removeEventListener('keydown', escHandler);
      }
    };
    window.addEventListener('keydown', escHandler);

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

// Contact form: send via Web3Forms and show custom toast
(function(){
  const form = document.getElementById('form');
  if (!form) return; // no form on this page

  const submitBtn = form.querySelector('button[type="submit"]');

  function showFormToast(type, message){
    const toast = document.getElementById('formToast');
    if (!toast) {
      // Fallback if HTML not present
      alert(message);
      return;
    }

    const textEl = toast.querySelector('.form-toast-text');
    if (textEl) textEl.textContent = message;

    // reset classes
    toast.classList.remove('success', 'error', 'show');
    toast.hidden = false;

    // type = "success" | "error"
    toast.classList.add(type);

    // trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // hide after delay
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.hidden = true;
      }, 250);
    }, 2600);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    // Your Web3Forms access key
    formData.append("access_key", "20d79819-1882-4c17-96ec-051372891390");

    const originalText = submitBtn ? submitBtn.textContent : '';

    if (submitBtn) {
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        showFormToast("success", "Message sent successfully. I will get back to you soon.");
        form.reset();
      } else {
        showFormToast("error", data.message || "Unable to send your message. Please try again.");
      }

    } catch (error) {
      showFormToast("error", "Network error. Please check your connection and try again.");
    } finally {
      if (submitBtn) {
        submitBtn.textContent = originalText || "Send Message";
        submitBtn.disabled = false;
      }
    }
  });
})();
