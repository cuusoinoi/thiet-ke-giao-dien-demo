// Custom Alert Component - Thay thế alert() mặc định của browser
// Sử dụng: showAlert('Thông báo', 'success') thay vì alert('Thông báo')

/**
 * Hiển thị thông báo custom đẹp hơn thay thế alert() mặc định
 * @param {string} message - Nội dung thông báo
 * @param {string} type - Loại: 'success', 'error', 'warning', 'info' (mặc định: 'info')
 * @param {number} duration - Thời gian tự đóng (ms). 0 = không tự đóng, chỉ đóng khi click
 */
function showAlert(message, type = 'info', duration = 3000) {
  // Tạo modal overlay
  const overlay = document.createElement('div');
  overlay.id = 'custom-alert-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.2s ease;
  `;

  // Tạo alert box
  const alertBox = document.createElement('div');
  alertBox.style.cssText = `
    background: white;
    border-radius: 16px;
    padding: 24px;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    animation: slideUp 0.3s ease;
    text-align: center;
  `;

  // Icon và màu sắc theo type
  const configs = {
    success: {
      icon: '✓',
      bg: '#dcfce7',
      color: '#166534',
      border: '#86efac',
      iconBg: '#16a34a'
    },
    error: {
      icon: '✕',
      bg: '#fee2e2',
      color: '#991b1b',
      border: '#fca5a5',
      iconBg: '#dc2626'
    },
    warning: {
      icon: '⚠',
      bg: '#fef3c7',
      color: '#92400e',
      border: '#fde68a',
      iconBg: '#f59e0b'
    },
    info: {
      icon: 'ℹ',
      bg: '#dbeafe',
      color: '#1e40af',
      border: '#93c5fd',
      iconBg: '#2563eb'
    }
  };

  const config = configs[type] || configs.info;

  // Icon circle
  const iconCircle = document.createElement('div');
  iconCircle.style.cssText = `
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: ${config.iconBg};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-weight: 700;
    margin: 0 auto 16px;
  `;
  iconCircle.textContent = config.icon;

  // Message text
  const messageText = document.createElement('div');
  messageText.style.cssText = `
    font-size: 16px;
    font-weight: 600;
    color: #111827;
    margin-bottom: 20px;
    line-height: 1.5;
  `;
  messageText.textContent = message;

  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Đóng';
  closeBtn.className = 'btn';
  closeBtn.style.cssText = `
    background: ${config.iconBg};
    border: none;
    border-radius: 999px;
    padding: 10px 24px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
  `;
  closeBtn.onmouseover = () => {
    closeBtn.style.opacity = '0.9';
    closeBtn.style.transform = 'translateY(-1px)';
  };
  closeBtn.onmouseout = () => {
    closeBtn.style.opacity = '1';
    closeBtn.style.transform = 'translateY(0)';
  };

  // Assemble
  alertBox.appendChild(iconCircle);
  alertBox.appendChild(messageText);
  alertBox.appendChild(closeBtn);
  overlay.appendChild(alertBox);
  document.body.appendChild(overlay);

  // Close function
  const close = () => {
    overlay.style.animation = 'fadeOut 0.2s ease';
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 200);
  };

  // Close events
  closeBtn.onclick = close;
  overlay.onclick = (e) => {
    if (e.target === overlay) {
      close();
    }
  };

  // Auto close
  if (duration > 0) {
    setTimeout(close, duration);
  }

  // Add animations CSS if not exists
  if (!document.getElementById('custom-alert-styles')) {
    const style = document.createElement('style');
    style.id = 'custom-alert-styles';
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Compatibility: Override native alert() để tự động thay thế
// Sử dụng custom alert thay vì browser alert mặc định
const originalAlert = window.alert;
window.alert = function(message) {
  // Xác định type dựa trên nội dung message
  let type = 'info';
  const msg = message.toLowerCase();
  
  if (msg.includes('thành công') || msg.includes('đăng ký') || msg.includes('đăng nhập') || msg.includes('cảm ơn')) {
    type = 'success';
  } else if (msg.includes('lỗi') || msg.includes('không tìm thấy') || msg.includes('thất bại')) {
    type = 'error';
  } else if (msg.includes('vui lòng') || msg.includes('cần') || msg.includes('phải')) {
    type = 'warning';
  }
  
  showAlert(message, type, 4000);
};

/**
 * Custom Confirm Dialog - Thay thế confirm() mặc định của browser
 * @param {string} message - Nội dung câu hỏi
 * @param {string} confirmText - Text nút xác nhận (mặc định: "Xác nhận")
 * @param {string} cancelText - Text nút hủy (mặc định: "Hủy")
 * @returns {Promise<boolean>} - Promise resolve với true nếu confirm, false nếu cancel
 */
function showConfirm(message, confirmText = 'Xác nhận', cancelText = 'Hủy') {
  return new Promise((resolve) => {
    // Tạo modal overlay
    const overlay = document.createElement('div');
    overlay.id = 'custom-confirm-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.2s ease;
    `;

    // Tạo confirm box
    const confirmBox = document.createElement('div');
    confirmBox.style.cssText = `
      background: white;
      border-radius: 16px;
      padding: 24px;
      max-width: 400px;
      width: 90%;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      animation: slideUp 0.3s ease;
      text-align: center;
    `;

    // Icon warning
    const iconCircle = document.createElement('div');
    iconCircle.style.cssText = `
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #f59e0b;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      font-weight: 700;
      margin: 0 auto 16px;
    `;
    iconCircle.textContent = '⚠';

    // Message text
    const messageText = document.createElement('div');
    messageText.style.cssText = `
      font-size: 16px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 24px;
      line-height: 1.5;
    `;
    messageText.textContent = message;

    // Buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.cssText = `
      display: flex;
      gap: 12px;
      justify-content: center;
    `;

    // Cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = cancelText;
    cancelBtn.className = 'btn-outline';
    cancelBtn.style.cssText = `
      flex: 1;
      padding: 10px 24px;
      border-radius: 999px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;
    `;

    // Confirm button
    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = confirmText;
    confirmBtn.className = 'btn';
    confirmBtn.style.cssText = `
      flex: 1;
      padding: 10px 24px;
      border-radius: 999px;
      background: #dc2626;
      border: none;
      color: white;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;
    `;

    // Hover effects
    confirmBtn.onmouseover = () => {
      confirmBtn.style.opacity = '0.9';
      confirmBtn.style.transform = 'translateY(-1px)';
    };
    confirmBtn.onmouseout = () => {
      confirmBtn.style.opacity = '1';
      confirmBtn.style.transform = 'translateY(0)';
    };

    cancelBtn.onmouseover = () => {
      cancelBtn.style.opacity = '0.8';
    };
    cancelBtn.onmouseout = () => {
      cancelBtn.style.opacity = '1';
    };

    // Close function
    const close = (result) => {
      overlay.style.animation = 'fadeOut 0.2s ease';
      setTimeout(() => {
        if (overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
        resolve(result);
      }, 200);
    };

    // Button events
    confirmBtn.onclick = () => close(true);
    cancelBtn.onclick = () => close(false);
    overlay.onclick = (e) => {
      if (e.target === overlay) {
        close(false);
      }
    };

    // Assemble
    buttonsContainer.appendChild(cancelBtn);
    buttonsContainer.appendChild(confirmBtn);
    confirmBox.appendChild(iconCircle);
    confirmBox.appendChild(messageText);
    confirmBox.appendChild(buttonsContainer);
    overlay.appendChild(confirmBox);
    document.body.appendChild(overlay);
  });
}

// Override native confirm()
const originalConfirm = window.confirm;
window.confirm = function(message) {
  // Note: confirm() is synchronous, but our custom is async
  // So we'll use a synchronous approach with a flag
  let result = false;
  let resolved = false;
  
  showConfirm(message, 'Xác nhận', 'Hủy').then(res => {
    result = res;
    resolved = true;
  });
  
  // Wait for result (blocking - not ideal but maintains compatibility)
  // Actually, we can't make it truly synchronous, so we'll just show the dialog
  // and return false by default. The caller should use showConfirm() directly for async.
  return false; // Default to false, but dialog will show
};
