# Kết nối lưu kết quả bài Bài ca về mặt trời

## Triển khai backend
1. Mở https://script.google.com/ và chọn Dự án mới.
2. Mở tệp apps-script/Code.gs trên GitHub, sao chép toàn bộ mã và dán vào Apps Script.
3. Nhấn Lưu.
4. Chọn Triển khai > Triển khai mới > Ứng dụng web.
5. Thực thi với tư cách: Tôi.
6. Ai có quyền truy cập: Bất kỳ ai (nếu tài khoản cho phép).
7. Nhấn Triển khai, cấp quyền, rồi sao chép URL ứng dụng web kết thúc bằng /exec.
8. Mở URL trong trình duyệt. Nếu thấy JSON có ok:true, dịch vụ đã phản hồi.

## Lưu ý quan trọng
- Mã này tạo Google Sheets tự động khi nhận bài làm đầu tiên.
- Triển khai backend chưa tự kết nối website; URL /exec vẫn cần được gắn vào mã website và kiểm thử nộp bài.
- Bảng tính được tạo trong tài khoản Google của người triển khai.
