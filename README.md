# SportField - Ứng dụng Đặt Sân Thể Thao

## 📋 Tổng quan dự án

SportField là nền tảng đặt sân thể thao đa môn được thiết kế dựa trên các nguyên tắc thiết kế giao diện người dùng từ môn học **Thiết kế Giao diện Người dùng**.

## 🎯 Mục tiêu thiết kế

Tuân thủ 4 nguyên lý thiết kế giao diện người dùng:
- **Usability**: Khả năng sử dụng - Giao diện dễ dàng sử dụng cho người dùng
- **Learnability**: Khả năng học - Dễ học cách sử dụng hệ thống
- **Efficiency**: Hiệu quả - Người dùng có thể hoàn thành tác vụ nhanh chóng
- **Safety**: An toàn - Bảo vệ người dùng khỏi lỗi và hậu quả không mong muốn

## 📁 Cấu trúc dự án

```
/
├── index.html                 # Trang chủ
├── *.html                     # Các trang HTML khác
├── README.md                  # File hướng dẫn
└── assets/
    ├── css/
    │   └── styles.css         # CSS chung
    ├── js/
    │   ├── api.js             # API helper functions
    │   └── mockData.js        # Dữ liệu mẫu
    └── images/                # Hình ảnh
```

### Trang chủ và Tìm kiếm
- `index.html` - Trang chủ với hero section, search form, danh sách sân
- `danh-sach-san.html` - Danh sách sân với bộ lọc và sắp xếp
- `chi-tiet-san.html` - Chi tiết sân với hình ảnh, đánh giá

### Luồng đặt sân
- `bang-lich-trong.html` - **Trang quan trọng nhất**: Bảng lịch trống với giá real-time
- `thanh-toan.html` - Trang thanh toán với thông tin đặt sân
- `xac-nhan-thanh-toan.html` - Xác nhận thanh toán thành công

### Authentication
- `dang-ky.html` - Đăng ký tài khoản
- `dang-nhap.html` - Đăng nhập
- `xac-thuc.html` - Xác thực OTP
- `quen-mat-khau.html` - Quên mật khẩu

### Tài khoản
- `tai-khoan.html` - Trang quản lý tài khoản
- `lich-su-dat.html` - Lịch sử đặt sân với nút Re-book
- `thong-bao.html` - Thông báo từ hệ thống
- `danh-gia-san.html` - Đánh giá sân với upload ảnh

### Hỗ trợ & Pháp lý
- `ho-tro.html` - Hỗ trợ và FAQ
- `dieu-khoan.html` - Điều khoản sử dụng và Chính sách bảo mật

### Assets
- `assets/css/styles.css` - File CSS chung cho toàn bộ trang
- `assets/js/api.js` - Mock API helper functions
- `assets/js/mockData.js` - Dữ liệu mẫu
- `assets/images/logo.png` - Logo SportField

## ✨ Tính năng nổi bật

### 1. Giá Real-time (bang-lich-trong.html)
- ✅ Hiển thị giá cập nhật ngay khi chọn giờ
- ✅ Tính toán phụ phí, giảm giá tự động
- ✅ Hiển thị tổng tiền liên tục (đáp ứng 61.1% yêu cầu từ khảo sát)

### 2. Navigation nhất quán
- ✅ Thanh navigation cố định (sticky header) - 92.6% người dùng ưa thích
- ✅ Breadcrumb navigation
- ✅ Filter tabs dễ sử dụng

### 3. Quy trình đặt sân tối ưu
- ✅ Cho phép chọn sân trước khi đăng nhập (giảm tỷ lệ thoát)
- ✅ Rút gọn luồng: Chọn sân → Chọn giờ → Thanh toán (3 bước)
- ✅ Nút Re-book từ lịch sử (tiết kiệm thời gian)

### 4. UI/UX Design
- ✅ Tối giản nhưng đầy đủ thông tin (51.9% yêu cầu)
- ✅ Màu sắc tươi sáng, năng động (88.9% yêu cầu)
- ✅ Responsive design (mobile-first)
- ✅ Font size vừa phải, dễ đọc (81.5% yêu cầu)

### 5. Safety Features
- ✅ Form validation
- ✅ Confirmation dialogs
- ✅ Error messages rõ ràng
- ✅ Loading states

## 🎨 Nguyên tắc thiết kế đã áp dụng

### 1. Usability (Khả năng sử dụng)

Usability đảm bảo giao diện có thể sử dụng hiệu quả bởi người dùng:

1. **Giao diện trực quan**: 
   - Layout rõ ràng, phân cấp thông tin hợp lý
   - Màu sắc, icon, typography nhất quán
   - Navigation dễ hiểu với dropdown menu

2. **Truy cập dễ dàng**:
   - Thanh navigation cố định (sticky header) luôn hiển thị
   - Breadcrumb navigation để người dùng biết vị trí hiện tại
   - Search form nổi bật ở trang chủ

3. **Tương thích đa nền tảng**:
   - Responsive design cho mobile, tablet, desktop
   - Tối ưu trải nghiệm trên mọi thiết bị

### 2. Learnability (Khả năng học)

Learnability giúp người dùng dễ dàng học cách sử dụng hệ thống:

1. **Tính nhất quán**:
   - Màu sắc, font chữ, button style đồng nhất trên toàn bộ website
   - Cấu trúc navigation giống nhau ở mọi trang

2. **Sự quen thuộc**:
   - Layout quen thuộc với header, main content, footer
   - Sử dụng các pattern UI phổ biến (card, button, form)

3. **Sự phản hồi**:
   - Hover effects rõ ràng trên buttons và links
   - Focus states khi tab navigation
   - Animation mượt mà cho dropdown menu

4. **Nội dung dễ hiểu**:
   - Tiếng Việt rõ ràng, không dùng thuật ngữ phức tạp
   - Label mô tả cụ thể cho mọi input field
   - Hướng dẫn sử dụng trong trang hỗ trợ

### 3. Efficiency (Hiệu quả)

Efficiency cho phép người dùng hoàn thành tác vụ một cách nhanh chóng:

1. **Tối ưu quy trình**:
   - Search form ở vị trí nổi bật, dễ truy cập
   - Luồng đặt sân ngắn gọn: Chọn sân → Chọn giờ → Thanh toán (3 bước)
   - Cho phép chọn sân trước khi đăng nhập

2. **Shortcuts và tối ưu**:
   - Nút Re-book từ lịch sử đặt sân (tiết kiệm thời gian)
   - Quick filters trên trang danh sách sân
   - Grid layout để so sánh nhanh nhiều sân cùng lúc

3. **Real-time updates**:
   - Giá tự động cập nhật khi chọn giờ (không cần refresh)
   - Tính toán phụ phí, giảm giá tự động
   - Hiển thị tổng tiền liên tục

4. **Autocomplete và suggestions**:
   - Gợi ý tìm kiếm theo môn thể thao, địa điểm

### 4. Safety (An toàn)

Safety bảo vệ người dùng khỏi lỗi và hậu quả không mong muốn:

1. **Error Prevention (Ngăn chặn lỗi)**:
   - Form validation ngay khi nhập (real-time)
   - Disable nút submit khi form chưa hợp lệ
   - Confirmation dialogs cho các hành động quan trọng (đặt sân, đăng xuất)

2. **Error Handling (Xử lý lỗi)**:
   - Error messages rõ ràng, giải thích cách sửa
   - Highlight trường input bị lỗi
   - Thông báo lỗi không kỹ thuật, dễ hiểu

3. **Feedback và Recovery**:
   - Thông báo rõ ràng khi thành công/thất bại
   - Loading states để người dùng biết hệ thống đang xử lý
   - Cho phép hủy/hoàn tác các hành động
   - Hiển thị chính sách hủy và hoàn tiền rõ ràng

4. **Bảo vệ dữ liệu**:
   - Xác nhận trước khi xóa hoặc thực hiện hành động không thể hoàn tác
   - Mã OTP xác thực tài khoản
   - Mã xác nhận đặt sân qua email/SMS

## 📊 Đối chiếu với khảo sát người dùng

- ✅ **92.6%** yêu cầu navigation cố định → Đã triển khai
- ✅ **88.9%** yêu cầu màu sắc tươi sáng → Đã triển khai
- ✅ **61.1%** yêu cầu cập nhật giá chi tiết → **Đã triển khai với giá real-time**
- ✅ **51.9%** yêu cầu giao diện tối giản → Đã triển khai
- ✅ **100%** cần tính năng đặt sân online → Đã triển khai đầy đủ

## 🚀 Hướng dẫn sử dụng
**Mở `index.html`** trong trình duyệt

## 👤 Tài khoản mẫu để test

**Đã có sẵn trong hệ thống:**
- **Số điện thoại:** `0901234567`
- **Email:** `user@example.com`
- **Mật khẩu:** `123456`

Hoặc có thể **đăng ký tài khoản mới**!