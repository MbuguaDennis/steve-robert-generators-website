let lastScrollY = window.scrollY;
  const topBar = document.getElementById('topBar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
      // Scrolling down
      topBar.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      topBar.style.transform = 'translateY(0)';
    }
    lastScrollY = window.scrollY;
  });