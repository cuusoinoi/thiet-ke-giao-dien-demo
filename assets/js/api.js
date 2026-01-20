// Mock API Helper - Sử dụng localStorage thay vì server thật
// File này cung cấp các hàm API đơn giản để gọi từ frontend

// ========== VENUES API ==========

// Lấy danh sách sân
function getVenues(filters = {}) {
  let venues = JSON.parse(localStorage.getItem('sportfield_venues') || '[]');
  
  // Filter theo sport type
  if (filters.sportType) {
    venues = venues.filter(v => v.sportType === filters.sportType);
  }
  
  // Filter theo thành phố
  if (filters.city) {
    venues = venues.filter(v => v.city === filters.city);
  }
  
  // Filter theo quận
  if (filters.district) {
    venues = venues.filter(v => v.district === filters.district);
  }
  
  // Search theo tên
  if (filters.search) {
    const search = filters.search.toLowerCase();
    venues = venues.filter(v => 
      v.name.toLowerCase().includes(search) ||
      v.address.toLowerCase().includes(search)
    );
  }
  
  return Promise.resolve(venues);
}

// Lấy chi tiết sân
function getVenueById(id) {
  const venues = JSON.parse(localStorage.getItem('sportfield_venues') || '[]');
  const venue = venues.find(v => v.id === parseInt(id));
  return Promise.resolve(venue || null);
}

// Kiểm tra lịch trống của sân
function getAvailableSlots(venueId, date, field = 'Sân 1') {
  const venue = JSON.parse(localStorage.getItem('sportfield_venues') || '[]')
    .find(v => v.id === parseInt(venueId));
  
  if (!venue) return Promise.resolve([]);
  
  const bookings = JSON.parse(localStorage.getItem('sportfield_bookings') || '[]');
  const dateStr = new Date(date).toISOString().split('T')[0];
  
  // Lấy các slot đã được đặt
  const bookedSlots = bookings
    .filter(b => 
      b.venueId === parseInt(venueId) && 
      b.date === dateStr && 
      b.field === field
    )
    .map(b => b.time);
  
  // Tạo danh sách tất cả slots trong ngày
  const slots = [];
  const now = new Date();
  const isToday = dateStr === now.toISOString().split('T')[0];
  const currentHour = now.getHours();
  
  for (let hour = venue.hours.start; hour < venue.hours.end; hour++) {
    const timeSlot = `${hour.toString().padStart(2, '0')}:00`;
    const isPast = isToday && hour <= currentHour;
    const isBooked = bookedSlots.includes(timeSlot);
    
    // Tính giá theo khung giờ
    let price = venue.basePrice;
    if (hour >= 17 && hour <= 21) price = venue.basePrice * 1.2; // Peak hours
    else if (hour >= 6 && hour <= 10) price = venue.basePrice * 0.85; // Morning discount
    
    slots.push({
      time: timeSlot,
      available: !isPast && !isBooked,
      price: price
    });
  }
  
  return Promise.resolve(slots);
}

// ========== AUTH API ==========

// Đăng ký
function register(userData) {
  const users = JSON.parse(localStorage.getItem('sportfield_users') || '[]');
  
  // Check if user exists
  const exists = users.find(u => 
    u.email === userData.email || u.phone === userData.phone
  );
  
  if (exists) {
    return Promise.reject({ message: 'Email hoặc số điện thoại đã được sử dụng' });
  }
  
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name: userData.name,
    phone: userData.phone,
    email: userData.email,
    password: userData.password // Không hash, chỉ demo
  };
  
  users.push(newUser);
  localStorage.setItem('sportfield_users', JSON.stringify(users));
  
  // Auto login
  const { password: _, ...userWithoutPassword } = newUser;
  localStorage.setItem('sportfield_currentUser', JSON.stringify(userWithoutPassword));
  
  return Promise.resolve(userWithoutPassword);
}

// Đăng nhập
function login(identifier, password) {
  const users = JSON.parse(localStorage.getItem('sportfield_users') || '[]');
  const user = users.find(u => 
    (u.email === identifier || u.phone === identifier) && u.password === password
  );
  
  if (!user) {
    return Promise.reject({ message: 'Số điện thoại/Email hoặc mật khẩu không đúng' });
  }
  
  // Lưu user đang đăng nhập
  const { password: _, ...userWithoutPassword } = user;
  localStorage.setItem('sportfield_currentUser', JSON.stringify(userWithoutPassword));
  
  return Promise.resolve(userWithoutPassword);
}

// Đăng xuất
function logout() {
  localStorage.removeItem('sportfield_currentUser');
  return Promise.resolve();
}

// Lấy user hiện tại
function getCurrentUser() {
  const user = localStorage.getItem('sportfield_currentUser');
  return Promise.resolve(user ? JSON.parse(user) : null);
}

// ========== BOOKING API ==========

// Đặt sân
function createBooking(bookingData) {
  const bookings = JSON.parse(localStorage.getItem('sportfield_bookings') || '[]');
  const userBookings = JSON.parse(localStorage.getItem('sportfield_userBookings') || '[]');
  const currentUser = JSON.parse(localStorage.getItem('sportfield_currentUser') || 'null');
  
  if (!currentUser) {
    return Promise.reject({ message: 'Vui lòng đăng nhập' });
  }
  
  const venue = JSON.parse(localStorage.getItem('sportfield_venues') || '[]')
    .find(v => v.id === bookingData.venueId);
  
  if (!venue) {
    return Promise.reject({ message: 'Không tìm thấy sân' });
  }
  
  const dateStr = new Date(bookingData.date).toISOString().split('T')[0];
  
  // Tạo booking records cho từng time slot
  bookingData.timeSlots.forEach(timeSlot => {
    bookings.push({
      venueId: bookingData.venueId,
      field: bookingData.field || 'Sân 1',
      date: dateStr,
      time: timeSlot,
      userId: currentUser.id
    });
  });
  
  // Tạo user booking record
  const newBooking = {
    id: userBookings.length > 0 ? Math.max(...userBookings.map(b => b.id)) + 1 : 1,
    userId: currentUser.id,
    venueId: bookingData.venueId,
    venueName: venue.name,
    field: bookingData.field || 'Sân 1',
    date: dateStr,
    timeSlots: bookingData.timeSlots,
    totalPrice: bookingData.totalPrice,
    status: 'completed',
    createdAt: new Date().toISOString()
  };
  
  userBookings.push(newBooking);
  
  localStorage.setItem('sportfield_bookings', JSON.stringify(bookings));
  localStorage.setItem('sportfield_userBookings', JSON.stringify(userBookings));
  
  return Promise.resolve(newBooking);
}

// Lấy lịch sử đặt sân của user
function getUserBookings(userId) {
  const userBookings = JSON.parse(localStorage.getItem('sportfield_userBookings') || '[]');
  const bookings = userBookings.filter(b => b.userId === userId);
  return Promise.resolve(bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
}

// ========== REVIEW API ==========

// Lấy đánh giá của sân
function getVenueReviews(venueId) {
  const reviews = JSON.parse(localStorage.getItem('sportfield_reviews') || '[]');
  return Promise.resolve(reviews.filter(r => r.venueId === parseInt(venueId)));
}

// Tạo đánh giá
function createReview(reviewData) {
  const reviews = JSON.parse(localStorage.getItem('sportfield_reviews') || '[]');
  const currentUser = JSON.parse(localStorage.getItem('sportfield_currentUser') || 'null');
  
  if (!currentUser) {
    return Promise.reject({ message: 'Vui lòng đăng nhập' });
  }
  
  const newReview = {
    id: reviews.length > 0 ? Math.max(...reviews.map(r => r.id)) + 1 : 1,
    venueId: reviewData.venueId,
    userId: currentUser.id,
    userName: currentUser.name,
    rating: reviewData.rating,
    comment: reviewData.comment,
    images: reviewData.images || [],
    date: new Date().toISOString().split('T')[0]
  };
  
  reviews.push(newReview);
  localStorage.setItem('sportfield_reviews', JSON.stringify(reviews));
  
  return Promise.resolve(newReview);
}

// ========== NOTIFICATIONS API ==========

// Lấy thông báo của user
function getUserNotifications(userId) {
  const notifications = JSON.parse(localStorage.getItem('sportfield_notifications') || '[]');
  return Promise.resolve(
    notifications
      .filter(n => n.userId === userId)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  );
}

// Đánh dấu đã đọc thông báo
function markNotificationRead(notificationId) {
  const notifications = JSON.parse(localStorage.getItem('sportfield_notifications') || '[]');
  const notification = notifications.find(n => n.id === parseInt(notificationId));
  if (notification) {
    notification.read = true;
    localStorage.setItem('sportfield_notifications', JSON.stringify(notifications));
  }
  return Promise.resolve();
}
