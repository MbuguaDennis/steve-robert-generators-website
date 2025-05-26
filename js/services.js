const headers = document.querySelectorAll('.accordion-header');

headers.forEach(btn => {
  btn.addEventListener('click', () => {
    // Close any currently active accordion
    const current = document.querySelector('.accordion-header.active');
    if (current && current !== btn) {
      current.classList.remove('active');
      current.nextElementSibling.style.maxHeight = null;
    }

    // Toggle the clicked one
    btn.classList.toggle('active');
    const body = btn.nextElementSibling;
    if (btn.classList.contains('active')) {
      body.style.maxHeight = body.scrollHeight + 'px';
    } else {
      body.style.maxHeight = null;
    }
  });
});

// chat functionality
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('chat-toggle');
  const windowEl = document.getElementById('chat-window');
  const closeBtn = document.getElementById('chat-close');

  if (!toggle || !windowEl || !closeBtn) {
    console.error('[Chat Widget] Missing elements:', { toggle, windowEl, closeBtn });
    return;
  }

  console.log('[Chat Widget] Initialized');

  toggle.addEventListener('click', () => {
    const isHidden = windowEl.classList.toggle('hidden');
    console.log(`[Chat Widget] Toggle clicked; window is now ${isHidden ? 'hidden' : 'visible'}.`);
  });

  closeBtn.addEventListener('click', () => {
    windowEl.classList.add('hidden');
    console.log('[Chat Widget] Close button clicked; window hidden.');
  });
});
