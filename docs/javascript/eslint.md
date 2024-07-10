---
sidebar_position: 1
---

# ES Linter

## ESLint là gì?
ESLint là một công cụ "linter" mã nguồn mở dành cho JavaScript. Nó phân tích mã của bạn để tìm ra các vấn đề tiềm ẩn như lỗi cú pháp, lỗi logic, vi phạm quy ước đặt tên, cấu trúc mã không nhất quán và các vấn đề về hiệu suất. ESLint không chỉ giúp bạn phát hiện lỗi sớm mà còn khuyến khích bạn viết mã sạch hơn, dễ đọc hơn và dễ bảo trì hơn.

ESLint is a configurable JavaScript linter

"ESLint is a configurable JavaScript linter" nghĩa là ESLint là một công cụ kiểm tra mã JavaScript mà bạn có thể điều chỉnh và tùy biến theo ý muốn. Đây là một trong những điểm mạnh nổi bật của ESLint so với các công cụ linter khác.

Tại sao khả năng tùy chỉnh lại quan trọng?

- Đáp ứng nhu cầu đa dạng: Mỗi dự án, mỗi nhóm phát triển có những quy ước và tiêu chuẩn mã hóa riêng. ESLint cho phép bạn thiết lập các quy tắc kiểm tra phù hợp với đặc thù của từng dự án, đảm bảo tính nhất quán và chất lượng mã theo yêu cầu.
- Linh hoạt trong việc lựa chọn quy tắc: ESLint cung cấp một bộ quy tắc phong phú bao gồm cả quy tắc mặc định và quy tắc từ các plugin mở rộng. Bạn có thể chọn lọc, bật/tắt, hoặc tùy chỉnh mức độ nghiêm trọng của từng quy tắc để kiểm soát chính xác quá trình kiểm tra mã.
- Tiến hóa cùng dự án: Khi dự án phát triển, các yêu cầu về chất lượng mã cũng có thể thay đổi. ESLint cho phép bạn dễ dàng cập nhật và tinh chỉnh cấu hình để đáp ứng những thay đổi này.

## ESLint rule

Trong thế giới ESLint, "rule" (quy tắc) là những đơn vị kiểm tra cơ bản giúp đảm bảo mã JavaScript của bạn tuân thủ các tiêu chuẩn và quy ước đã định. Mỗi quy tắc tập trung vào một khía cạnh cụ thể của mã, từ cú pháp và định dạng đến các vấn đề về logic và tiềm ẩn lỗi.

### Phân loại: Sửa lỗi tự động và đề xuất sửa lỗi - Hai cách tiếp cận khác nhau

1. Rule Fix (Sửa lỗi tự động):

Bản chất: Rule fix là những thay đổi an toàn, không làm thay đổi logic ứng dụng của bạn. Ví dụ: thêm dấu chấm phẩy bị thiếu, thay đổi kiểu thụt lề, hoặc loại bỏ khoảng trắng thừa.
Cách hoạt động: ESLint có thể tự động áp dụng rule fix bằng cách sử dụng tùy chọn --fix khi chạy từ dòng lệnh. Ngoài ra, nhiều trình soạn thảo mã (như VS Code) có tích hợp ESLint và cho phép bạn tự động sửa lỗi ngay trong quá trình viết mã.

2. Rule Suggestion (Đề xuất sửa lỗi):

Bản chất: Rule suggestion là những đề xuất thay đổi mã có thể ảnh hưởng đến logic ứng dụng, do đó không thể tự động áp dụng. Ví dụ: đổi tên biến, thay đổi cấu trúc điều kiện, hoặc sửa lỗi logic phức tạp.
Cách hoạt động: ESLint không thể tự động áp dụng rule suggestion. Tuy nhiên, các trình soạn thảo mã thường hiển thị các đề xuất này, cho phép bạn xem xét và áp dụng thủ công nếu thấy phù hợp.


Tại sao lại có sự phân biệt này?

ESLint ưu tiên sự an toàn và tránh những thay đổi không mong muốn trong mã của bạn. Rule fix chỉ được áp dụng khi ESLint chắc chắn rằng chúng sẽ không làm hỏng logic ứng dụng. Trong khi đó, rule suggestion đòi hỏi sự đánh giá và quyết định của lập trình viên vì chúng có thể ảnh hưởng đến cách chương trình hoạt động.


### Cấu trúc của ESLint Rule

Mỗi quy tắc ESLint thường có cấu trúc sau:

JavaScript
{
    "rules": {
        "rule-name": [severity, options]
    }
}


- rule-name: Tên của quy tắc (ví dụ: quotes, semi, no-unused-vars).
- severity: Mức độ nghiêm trọng của quy tắc:
"off" hoặc 0: Tắt quy tắc.
"warn" hoặc 1: Đưa ra cảnh báo.
"error" hoặc 2: Báo lỗi.
- options: Các tùy chọn bổ sung cho quy tắc (tùy thuộc vào từng quy tắc).


Ví dụ:

JavaScript
{
    "rules": {
        "quotes": ["error", "double"], // Yêu cầu sử dụng dấu ngoặc kép đôi
        "semi": ["warn", "always"],    // Khuyến cáo nên sử dụng dấu chấm phẩy
        "no-console": "off"            // Tắt quy tắc cấm sử dụng console
    }
}