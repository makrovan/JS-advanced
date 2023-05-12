(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const scrollBtn = document.querySelector('#scrollBtn');
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 100) {
        scrollBtn.style.display = 'inline-block';
      } else {
        scrollBtn.style.display = 'none';
      }
    }, { passive: true });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
})();
