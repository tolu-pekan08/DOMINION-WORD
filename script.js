// Dark Mode Toggle Function
function toggleDarkMode() {
  const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
  const newMode = isDarkMode ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newMode);
  localStorage.setItem('theme', newMode);
  
  // Update button text
  const button = document.querySelector('.dark-mode-toggle');
  button.textContent = newMode === 'dark' ? '☀️' : '🌙';
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  const button = document.querySelector('.dark-mode-toggle');
  if (button) {
    button.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  }
});

// Mark active nav link
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.main-nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const siteHeader = document.querySelector('.site-header');
  const mainNav = document.querySelector('.main-nav');

  if (!navToggle || !siteHeader || !mainNav) return;

  navToggle.addEventListener('click', function() {
    const open = siteHeader.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close nav when resizing to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && siteHeader.classList.contains('nav-open')) {
      siteHeader.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});
