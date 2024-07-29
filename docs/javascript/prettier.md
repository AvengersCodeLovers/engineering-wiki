---
sidebar_position: 1
---

# Prettier

## Prettier là gì?
"Prettier is an opinionated code formatter" 
(Prettier là một công cụ định dạng mã theo quan điểm) có nghĩa là Prettier có một tập hợp các quy tắc định dạng mã được xác định trước và không cho phép người dùng tùy chỉnh nhiều. Điều này giúp đảm bảo tính nhất quán của mã nguồn trong toàn bộ dự án và giảm thiểu tranh luận về phong cách code.


## Triết lý của Prettier

Prettier has a few options because of history. But we won’t add more of them.
By far the biggest reason for adopting Prettier is to stop all the ongoing debates over styles.
https://prettier.io/docs/en/option-philosophy

Prettier ban đầu được tạo ra với một số tùy chọn định dạng để đáp ứng các nhu cầu khác nhau của người dùng. Tuy nhiên, đội ngũ phát triển nhận ra rằng việc có quá nhiều tùy chọn lại gây ra tranh cãi về phong cách code, điều mà Prettier muốn giải quyết.

Do đó, họ quyết định không thêm bất kỳ tùy chọn nào mới nữa và tập trung vào việc cung cấp một bộ quy tắc định dạng mặc định nhất quán. Mục tiêu chính của Prettier là giúp các lập trình viên tránh lãng phí thời gian vào việc tranh luận về các chi tiết nhỏ nhặt như khoảng trắng, thụt lề, hoặc dấu ngoặc kép, từ đó tập trung vào việc xây dựng sản phẩm và cải thiện chất lượng code.

Prettier tin rằng việc có một tiêu chuẩn định dạng chung sẽ giúp cộng đồng phát triển phần mềm làm việc hiệu quả hơn và giảm thiểu xung đột không cần thiết về phong cách code.

## So sánh Prettier với các công cụ Linter khác (ESLint, TSLint, stylelint...)

Các công cụ Linter (như ESLint, TSLint, stylelint) thường có hai loại quy tắc:

1. Quy tắc định dạng (Formatting rules):

Ví dụ: max-len (độ dài tối đa của dòng), no-mixed-spaces-and-tabs (không trộn lẫn dấu cách và tab), keyword-spacing (khoảng cách xung quanh từ khóa), comma-style (kiểu dấu phẩy)...

Prettier sẽ tự động định dạng lại toàn bộ mã nguồn theo một cách nhất quán, giúp loại bỏ các lỗi định dạng do lập trình viên gây ra.

Tức formatting rules có thể được điều chỉnh bởi cả Linters (như ESLint) và Prettier

2. Quy tắc chất lượng mã (Code-quality rules):

Ví dụ: no-unused-vars (không có biến không sử dụng), no-extra-bind (không ràng buộc thừa), no-implicit-globals (không có biến toàn cục ngầm), prefer-promise-reject-errors (khuyến khích sử dụng Promise.reject cho lỗi)...
Prettier không hỗ trợ các quy tắc này. Đây là những quy tắc quan trọng nhất của các công cụ Linter vì chúng giúp phát hiện các lỗi thực sự trong mã của bạn.

Tóm lại:
- Prettier: Chuyên về định dạng mã, giúp bạn có một mã nguồn nhất quán và đẹp mắt.
- Linters: Chuyên về kiểm tra chất lượng mã, giúp bạn phát hiện các lỗi tiềm ẩn và các vấn đề về cấu trúc, logic của chương trình.

Lời khuyên:
Sử dụng kết hợp Prettier cho việc định dạng mã và Linters (như ESLint) cho việc bắt lỗi là một cách tiếp cận hiệu quả để đảm bảo mã nguồn của bạn vừa đẹp, vừa sạch, vừa an toàn.

## Sample config Prettier


File .prettierrc.json

```JavaScript
{
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "trailingComma": "all",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "proseWrap": "preserve",
  "htmlWhitespaceSensitivity": "strict",
  "endOfLine": "lf"
}


```