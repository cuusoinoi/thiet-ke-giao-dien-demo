// Header Helper - Update header based on login status
// Include this file after api.js to update header on all pages

async function updateHeader() {
  // Try to find header-cta by ID first, then by class
  let headerCta = document.getElementById('header-cta');
  if (!headerCta) {
    headerCta = document.querySelector('.header-cta');
  }
  if (!headerCta) return; // No header-cta element found
  
  const user = await getCurrentUser();
  
  if (user) {
    // User is logged in - show user info
    const name = user.name || 'Người dùng';
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    
    headerCta.innerHTML = `
      <a href="tai-khoan.html" class="btn-outline" style="display: flex; align-items: center; gap: 8px;">
        <span style="width: 32px; height: 32px; border-radius: 50%; background: var(--green); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px;">${initials}</span>
        <span>${name}</span>
      </a>
    `;
  } else {
    // User is not logged in - show login/register buttons
    headerCta.innerHTML = `
      <a href="dang-nhap.html" class="btn-outline">Đăng nhập</a>
      <a href="dang-ky.html" class="btn">Đăng ký</a>
    `;
  }
}

// Auto-update header on page load
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      updateHeader();
      // Mobile menu disabled for web interface
      // initMobileMenu();
    });
  } else {
    updateHeader();
    // Mobile menu disabled for web interface
    // initMobileMenu();
  }
}

// Mobile Menu Functionality
function initMobileMenu() {
  // Create mobile menu if it doesn't exist
  let mobileMenu = document.getElementById('mobile-menu');
  if (!mobileMenu) {
    const nav = document.querySelector('nav');
    if (!nav) return; // No nav found, skip mobile menu setup
    
    // Clone nav structure for mobile
    mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobile-menu';
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
      <div class="mobile-menu-content">
        <div class="mobile-menu-header">
          <div class="brand-name">SportField</div>
          <button class="mobile-menu-close" onclick="closeMobileMenu()">✕</button>
        </div>
        <div class="mobile-menu-nav" id="mobile-menu-nav"></div>
        <div class="mobile-menu-cta" id="mobile-menu-cta"></div>
      </div>
    `;
    document.body.appendChild(mobileMenu);
    
    // Populate mobile menu from nav
    const mobileNav = document.getElementById('mobile-menu-nav');
    const navItems = nav.querySelectorAll('a, .nav-dropdown');
    
    navItems.forEach(item => {
      if (item.classList.contains('nav-dropdown')) {
        const dropdown = item.cloneNode(true);
        const link = dropdown.querySelector('> a');
        const submenu = dropdown.querySelector('.dropdown-menu');
        
        if (submenu) {
          const mobileSubmenu = document.createElement('div');
          mobileSubmenu.className = 'mobile-menu-submenu';
          submenu.querySelectorAll('a').forEach(subLink => {
            const mobileSubLink = subLink.cloneNode(true);
            mobileSubLink.addEventListener('click', () => closeMobileMenu());
            mobileSubmenu.appendChild(mobileSubLink);
          });
          
          dropdown.className = 'mobile-menu-dropdown';
          dropdown.innerHTML = '';
          link.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('active');
          });
          dropdown.appendChild(link);
          dropdown.appendChild(mobileSubmenu);
        }
        
        mobileNav.appendChild(dropdown);
      } else {
        const link = item.cloneNode(true);
        link.addEventListener('click', () => closeMobileMenu());
        mobileNav.appendChild(link);
      }
    });
    
    // Add CTA buttons
    const headerCta = document.querySelector('.header-cta');
    if (headerCta) {
      const mobileCta = document.getElementById('mobile-menu-cta');
      const ctaClone = headerCta.cloneNode(true);
      ctaClone.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => closeMobileMenu());
      });
      mobileCta.appendChild(ctaClone);
    }
  }
  
  // Add mobile menu button if it doesn't exist
  let menuBtn = document.querySelector('.mobile-menu-btn');
  if (!menuBtn) {
    const headerInner = document.querySelector('.header-inner');
    if (headerInner) {
      menuBtn = document.createElement('button');
      menuBtn.className = 'mobile-menu-btn';
      menuBtn.innerHTML = '☰';
      menuBtn.setAttribute('aria-label', 'Mở menu');
      menuBtn.onclick = openMobileMenu;
      
      // Insert before header-cta
      const headerCta = document.querySelector('.header-cta');
      if (headerCta) {
        headerInner.insertBefore(menuBtn, headerCta);
      } else {
        headerInner.appendChild(menuBtn);
      }
    }
  }
  
  // Close menu when clicking outside
  mobileMenu.addEventListener('click', function(e) {
    if (e.target === mobileMenu) {
      closeMobileMenu();
    }
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });
}

function openMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Make functions globally available
if (typeof window !== 'undefined') {
  window.openMobileMenu = openMobileMenu;
  window.closeMobileMenu = closeMobileMenu;
}
