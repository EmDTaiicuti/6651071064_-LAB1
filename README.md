# PucciCot · LAB1 Thiết kế Web

Mở `index.html` bằng trình duyệt. Website dùng HTML, CSS và JavaScript thuần. Hãy dùng cùng một địa chỉ HTTP khi thử luồng giỏ hàng qua nhiều trang để trình duyệt lưu dữ liệu nhất quán.

Nếu máy có Python, chạy lệnh này từ thư mục dự án và truy cập `http://localhost:8000`:

```powershell
python -m http.server 8000
```

## Đổi ảnh và nội dung

Mở [ANH-UNIQLO.html](ANH-UNIQLO.html) để xem các màu thiếu ảnh và tên tệp cần dùng. Có thể gửi [CAN-GEMINI-TIM.txt](CAN-GEMINI-TIM.txt) để tìm ảnh. Nguồn ảnh của toàn bộ catalog nằm trong [ANH-UNIQLO.md](ANH-UNIQLO.md).

1. Chép ảnh vào thư mục `Images/`.
2. Mở `Scripts/catalog.js`. Điền tên tệp vào `image` của banner, danh mục, sản phẩm hoặc bài viết. Ví dụ `image: 'ao-khoac.jpg'`. Giữ `image: ''` để hiện placeholder.
3. Với banner, điền thêm `mobileImage` nếu có ảnh cắt riêng cho màn hình nhỏ.

`heroTiles` là tám ô ảnh trên banner WOMEN. `menTiles` là tám ô xung quanh chữ PucciCot trên banner MEN. Có thể điền `image` vào mục tương ứng trong `heroes` để dùng một ảnh banner hoàn chỉnh. Với sản phẩm có mẫu màu, điền ảnh riêng cho từng màu trong `productColors`.

Ví dụ, áo khoác Casual, áo thun cotton và vớ kẻ sọc có nhiều màu. Bấm chấm màu ngay trên thẻ để xem trước, rồi mở sản phẩm để giữ màu đang chọn. Giỏ hàng tính riêng cho mỗi cặp màu và kích cỡ.

Ví dụ, đặt `troi: 'so-mi-xanh.jpg'` trong `pc006: variants({ ... })` để thêm ảnh áo sơ mi xanh da trời. Với các mẫu khai báo từng màu bằng `{ id, name, hex, image }`, điền tên tệp vào `image`.

Đổi ngày bắt đầu và kết thúc bộ đếm Black Friday trong `blackFriday`. Giờ kết thúc hiện là 23:59:59 ngày 24/11/2026 theo giờ Việt Nam.

Trang chủ MEN dùng ảnh áo len và video PUFFTECH theo thứ tự trong `campaigns`. Tệp video nằm trong `Videos/`. Trang chủ BABY có `babyLeggings` và `babyFeature` riêng. Trường `for` của mỗi mẫu điều khiển nhóm hiển thị, còn `sizes` dùng cho các mẫu có dãy kích cỡ riêng.

Mỗi mẫu có một `type` xác định loại đồ. Các danh mục ghép như **Đồ mặc trong & tất** lấy từ `categoryTypes`. Dùng `collections` cho những nhóm như **Khuyến mãi**, **Giữ nhiệt** và **Đồ thể thao** khi sản phẩm phù hợp.

Giá và sản phẩm là dữ liệu mẫu. Giỏ hàng và yêu thích dùng bộ nhớ trình duyệt. Đặt hàng, liên hệ, tài khoản và đăng ký nhận tin là các luồng minh họa.

## Nộp LAB1

1. Đổi tên thư mục `MSSV_LAB1` bằng mã số sinh viên.
2. Đưa nội dung thư mục lên repository GitHub của nhóm. Giữ `index.html` ở thư mục gốc repository.
3. Trong **Settings → Pages**, chọn **Deploy from a branch**, nhánh `main` và thư mục `/ (root)`. Mở và thử lại trên URL GitHub Pages.
4. Quay video chạy trên trình duyệt và lưu MP4 dưới `Videos/`. Có thể demo theo thứ tự trang chủ, đổi nhóm WOMEN/MEN, danh mục, tìm kiếm và sắp xếp, chọn màu, yêu thích, giỏ hàng, đặt hàng mẫu, nhật ký và liên hệ. Dùng dữ liệu giả trong biểu mẫu.
5. PDF nộp trên LMS cần họ tên và MSSV của từng thành viên, URL repository và URL GitHub Pages.
