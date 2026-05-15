// Function to handle interactions
const initNavigation = () => {
  // 1. Select Key Elements
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mainNav = document.getElementById('mainNav');
  const body = document.body;
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  
  // 2. Mobile Nav Toggle (Hamburger to "X")
  if (mobileNavToggle && mainNav) {
    mobileNavToggle.addEventListener('click', (e) => {
      e.preventDefault();
      
      const isOpened = mobileNavToggle.getAttribute('aria-expanded') === 'true';
      
      // Update ARIA for accessibility
      mobileNavToggle.setAttribute('aria-expanded', !isOpened);
      
      // Toggle CSS classes to open/close menu drawer and change hamburger to X
      mainNav.classList.toggle('nav--open');
      mobileNavToggle.classList.toggle('mobile-nav-toggle--open');
      
      // OPTIONAL: Prevent main body from scrolling while menu is open
      body.classList.toggle('no-scroll');
    });
  }
  
  // 3. Mobile Dropdown Menus Interaction
  // Target only the links that trigger the mobile dropdowns
  const mobileDropdownTriggers = document.querySelectorAll('.mobile-dropdown-trigger');

  mobileDropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      // Logic for mobile view only (<769px)
      if (window.innerWidth > 768) return; 

      e.preventDefault(); // Prevent navigating to href="#"

      const parentItem = trigger.closest('.dropdown-item'); // The li container
      const dropdownMenu = parentItem.querySelector('.dropdown'); // The ul submenu

      // a. Close other open dropdowns within the same nav list
      dropdownItems.forEach(item => {
        if (item !== parentItem && item.classList.contains('is-open')) {
          item.classList.remove('is-open');
          const otherDropdown = item.querySelector('.dropdown');
          if(otherDropdown) otherDropdown.classList.remove('dropdown--open');
        }
      });

      // b. Toggle active state for current dropdown
      parentItem.classList.toggle('is-open');
      dropdownMenu.classList.toggle('dropdown--open');
    });
  });

  // 4. Close mobile menu on resize to desktop dimensions
  // To avoid leaving a drawer open if resizing from mobile portrait to desktop landscape
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      if (mainNav && mainNav.classList.contains('nav--open')) {
        mainNav.classList.remove('nav--open');
        mobileNavToggle.classList.remove('mobile-nav-toggle--open');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('no-scroll');
      }
      
      // Close any open mobile dropdowns when resizing up
      dropdownItems.forEach(item => {
        item.classList.remove('is-open');
        const openDropdown = item.querySelector('.dropdown');
        if(openDropdown) openDropdown.classList.remove('dropdown--open');
      });
    }
  });
};

// Start the navigation script after DOM content is loaded
document.addEventListener('DOMContentLoaded', initNavigation);