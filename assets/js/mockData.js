// Mock Data cho SportField

const MOCK_DATA = {
  // Danh sách sân thể thao
  venues: [
    {
      id: 1,
      name: "Sân cỏ nhân tạo Riverside",
      address: "123 Đường ABC, Quận 7, TP.HCM",
      district: "Quận 7",
      city: "TP.HCM",
      sportType: "football",
      sportTypeName: "Bóng đá",
      basePrice: 350000,
      rating: 4.9,
      totalReviews: 128,
      distance: 1.2,

      images: [
        "assets/images/venues/venue-1.jpg",
        "assets/images/venues/venue-1-2.jpg",
        "assets/images/venues/venue-1-3.jpg"
      ],
      amenities: ["Có đèn chiếu sáng", "Có chỗ đậu xe", "Có phòng thay đồ", "WiFi miễn phí"],
      hours: { start: 6, end: 23 },
      description: "Sân cỏ nhân tạo Riverside là một trong những địa điểm chơi bóng đá được yêu thích nhất tại Quận 7. Với 5 sân 7 người được trang bị hệ thống đèn chiếu sáng hiện đại.",
      phone: "0900 123 456",
      fields: ["Sân 1", "Sân 2", "Sân 3", "Sân 4", "Sân 5"],
      lat: 10.7320,
      lng: 106.7220
    },
    {
      id: 2,
      name: "Sân cầu lông Đông Á",
      address: "456 Đường XYZ, Quận 1, TP.HCM",
      district: "Quận 1",
      city: "TP.HCM",
      sportType: "badminton",
      sportTypeName: "Cầu lông",
      basePrice: 150000,
      rating: 4.7,
      totalReviews: 89,
      distance: 2.5,
      images: [
        "assets/images/venues/venue-2.jpg",
        "assets/images/venues/venue-2-2.jpg"
      ],
      amenities: ["Máy lạnh", "Có chỗ đậu xe"],
      hours: { start: 8, end: 22 },
      description: "Sân cầu lông hiện đại với 10 sân tiêu chuẩn quốc tế.",
      phone: "0900 234 567",
      fields: ["Sân 1", "Sân 2", "Sân 3", "Sân 4", "Sân 5", "Sân 6", "Sân 7", "Sân 8", "Sân 9", "Sân 10"],
      lat: 10.7769,
      lng: 106.7009
    },
    {
      id: 3,
      name: "Sân tennis Vinhomes",
      address: "789 Đường DEF, Quận 2, TP.HCM",
      district: "Quận 2",
      city: "TP.HCM",
      sportType: "tennis",
      sportTypeName: "Tennis",
      basePrice: 400000,
      rating: 4.8,
      totalReviews: 56,
      distance: 5.0,
      images: [
        "assets/images/venues/venue-3.jpg",
        "assets/images/venues/venue-3-2.jpg"
      ],
      amenities: ["Sân cỏ tự nhiên", "Có đèn chiếu sáng", "Có chỗ đậu xe"],
      hours: { start: 6, end: 22 },
      description: "Sân tennis cao cấp với mặt sân cỏ tự nhiên.",
      phone: "0900 345 678",
      fields: ["Sân 1", "Sân 2", "Sân 3", "Sân 4"],
      lat: 10.7872,
      lng: 106.7490
    }
  ],

  // Lịch đặt sân (bookings) - Hardcode một số slot đã được đặt
  bookings: [
    { venueId: 1, field: "Sân 1", date: "2025-01-20", time: "18:00" },
    { venueId: 1, field: "Sân 1", date: "2025-01-20", time: "19:00" },
    { venueId: 1, field: "Sân 1", date: "2025-01-20", time: "20:00" },
    { venueId: 1, field: "Sân 2", date: "2025-01-21", time: "17:00" },
    { venueId: 2, field: "Sân 3", date: "2025-01-20", time: "19:00" }
  ],

  // Users mẫu (hardcode)
  users: [
    {
      id: 1,
      name: "Nguyễn Văn A",
      phone: "0901234567",
      email: "user@example.com",
      password: "123456" // Không hash, chỉ để demo
    }
  ],

  // Đánh giá mẫu
  reviews: [
    {
      id: 1,
      venueId: 1,
      userId: 1,
      userName: "Nguyễn Văn A",
      rating: 5.0,
      comment: "Sân cỏ rất tốt, mặt sân bằng phẳng và có độ đàn hồi tốt. Nhân viên phục vụ nhiệt tình. Giá cả hợp lý so với chất lượng dịch vụ.",
      date: "2025-01-18",
      images: []
    },
    {
      id: 2,
      venueId: 1,
      userId: 2,
      userName: "Trần Thị B",
      rating: 4.5,
      comment: "Sân đẹp, nhưng vào giờ cao điểm hơi đông. Nên đặt trước để có khung giờ tốt.",
      date: "2025-01-13",
      images: []
    }
  ],

  // Lịch sử đặt sân của user
  userBookings: [
    {
      id: 1,
      userId: 1,
      venueId: 1,
      venueName: "Sân cỏ nhân tạo Riverside",
      field: "Sân 1",
      date: "2025-01-15",
      timeSlots: ["18:00", "19:00"],
      totalPrice: 840000,
      status: "completed",
      createdAt: "2025-01-10T10:00:00Z"
    },
    {
      id: 2,
      userId: 1,
      venueId: 2,
      venueName: "Sân cầu lông Đông Á",
      field: "Sân 3",
      date: "2025-01-12",
      timeSlots: ["19:00", "20:00"],
      totalPrice: 300000,
      status: "completed",
      createdAt: "2025-01-08T14:00:00Z"
    }
  ],

  // Phương thức thanh toán (type: card | ewallet | bank)
  paymentMethods: [
    { id: 1, userId: 1, type: 'card', brand: 'Visa', last4: '1234', holderName: 'NGUYEN VAN A', expiry: '12/27', isDefault: true },
    { id: 2, userId: 1, type: 'card', brand: 'Mastercard', last4: '5678', holderName: 'NGUYEN VAN A', expiry: '08/26', isDefault: false },
    { id: 3, userId: 1, type: 'ewallet', provider: 'Momo', last4: '9012', isDefault: false },
    { id: 4, userId: 1, type: 'ewallet', provider: 'ZaloPay', last4: '3456', isDefault: false },
    { id: 5, userId: 1, type: 'bank', bankName: 'Vietcombank', last4: '7890', accountHolder: 'NGUYEN VAN A', isDefault: false }
  ],

  // Thông báo
  notifications: [
    {
      id: 1,
      userId: 1,
      title: "Đặt sân thành công",
      message: "Bạn đã đặt sân thành công vào 20/01/2025 lúc 18:00-19:00",
      type: "success",
      read: false,
      date: "2025-01-10T10:00:00Z"
    },
    {
      id: 2,
      userId: 1,
      title: "Nhắc nhở đặt sân",
      message: "Bạn có lịch đặt sân vào ngày mai (21/01/2025)",
      type: "info",
      read: false,
      date: "2025-01-19T09:00:00Z"
    }
  ],

  // Tin nhắn chat với chủ sân (userId, venueId, sender: 'user'|'venue', text, createdAt)
  chatMessages: [
    { id: 1, userId: 1, venueId: 1, sender: 'venue', text: 'Chào bạn, sân còn trống các khung 18h-19h ngày mai. Bạn có muốn đặt không?', createdAt: '2025-01-14T10:00:00Z' },
    { id: 2, userId: 1, venueId: 1, sender: 'user', text: 'Dạ mình muốn đặt 18h-20h ạ.', createdAt: '2025-01-14T10:05:00Z' },
    { id: 3, userId: 1, venueId: 1, sender: 'venue', text: 'Đã giữ chỗ. Bạn thanh toán trên app hoặc tại sân nhé.', createdAt: '2025-01-14T10:08:00Z' }
  ]
};

// Khởi tạo data vào localStorage nếu chưa có
function initMockData() {
  if (!localStorage.getItem('sportfield_venues')) {
    localStorage.setItem('sportfield_venues', JSON.stringify(MOCK_DATA.venues));
  }
  if (!localStorage.getItem('sportfield_bookings')) {
    localStorage.setItem('sportfield_bookings', JSON.stringify(MOCK_DATA.bookings));
  }
  if (!localStorage.getItem('sportfield_users')) {
    localStorage.setItem('sportfield_users', JSON.stringify(MOCK_DATA.users));
  }
  if (!localStorage.getItem('sportfield_reviews')) {
    localStorage.setItem('sportfield_reviews', JSON.stringify(MOCK_DATA.reviews));
  }
  if (!localStorage.getItem('sportfield_userBookings')) {
    localStorage.setItem('sportfield_userBookings', JSON.stringify(MOCK_DATA.userBookings));
  }
  if (!localStorage.getItem('sportfield_notifications')) {
    localStorage.setItem('sportfield_notifications', JSON.stringify(MOCK_DATA.notifications));
  }
  if (!localStorage.getItem('sportfield_paymentMethods')) {
    localStorage.setItem('sportfield_paymentMethods', JSON.stringify(MOCK_DATA.paymentMethods));
  }
  if (!localStorage.getItem('sportfield_chatMessages')) {
    localStorage.setItem('sportfield_chatMessages', JSON.stringify(MOCK_DATA.chatMessages));
  }
}

// Gọi khi load trang
if (typeof window !== 'undefined') {
  initMockData();
}
