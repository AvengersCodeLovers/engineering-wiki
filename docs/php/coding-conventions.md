---
sidebar_position: 1
---

# Coding conventions

## PSRs

Follow theo các chuẩn sau để đảm bảo các dự án có format code thống nhất, dễ dàng follow cho tất cả mọi người
- [PSR-1: Basic Coding Standard](https://www.php-fig.org/psr/psr-1/)
- [PSR-4: Autoloader](https://www.php-fig.org/psr/psr-4/)
- [PSR-12: Extended Coding Style](https://www.php-fig.org/psr/psr-12/) hoặc mới hơn là [PER Coding Style](https://www.php-fig.org/per/coding-style/)

## Tools

Trước đây, khi làm setup conventions cho dự án, chúng ta thường dùng tích hợp tool [`phpcs`](https://github.com/squizlabs/PHP_CodeSniffer) để lint, đảm bảo code follow theo các chuẩn chung.

Tuy nhiên, cách làm này có nhược điểm là bắt buộc mọi người phải nhớ conventions và tốn effort fix thủ công nếu có lỗi sai.

Đối với các dự án mới hiện nay, cách làm được recommend là tích hợp tool auto format code, tức là chúng ta sẽ không cần phải nhớ hết conventions, cũng như không cần tốn thời gian fix lỗi convention một cách thủ công. Focus nhiều hơn vào logic code thay vì lo lắng về conventions.

Golang có `gofmt`, Rust có `rustfmt` là các tool được phát triển bởi chính core team của ngôn ngữ, Javascript có `prettier`,...

Đối với PHP, tool được recommend là [`php-cs-fixer`](https://github.com/PHP-CS-Fixer/PHP-CS-Fixer), ngoài chức năng fix lỗi conventions, nó còn có thể tích hợp vào CI để kiểm tra code đã follow theo chuẩn chưa.

## File config

Các dự án trong organization có thể share file config dùng chung. Hiện tại, organization đã có package [`laravel-coding-standards`](https://github.com/AvengersCodeLovers/laravel-coding-standards). Việc sử dụng package này giúp dễ dàng chia sẻ file config và đảm bảo sự thống nhất trong việc format code cho các dự án Laravel trong organization.

Chi tiết về cách sử dụng, tích hợp CI, vui lòng đọc [README](https://github.com/AvengersCodeLovers/laravel-coding-standards) của package.
