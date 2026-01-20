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
    document.addEventListener('DOMContentLoaded', updateHeader);
  } else {
    updateHeader();
  }
}
