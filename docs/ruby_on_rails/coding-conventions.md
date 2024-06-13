---
sidebar_position: 2
---

# Coding conventions

"Convention" trong Ruby On Rails, cũng như trong các ngôn ngữ lập trình khác, đề cập đến các quy tắc và nguyên tắc chuẩn mà các lập trình viên được khuyến khích tuân thủ để viết mã nguồn nhất quán, dễ đọc và dễ bảo trì.

## Tại sao convention quan trọng?

1. **Đọc mã nguồn dễ dàng**: Khi mọi người tuân thủ cùng một bộ quy tắc, mã nguồn trở nên dễ đọc hơn đối với tất cả mọi người, không chỉ đối với người viết mã.
2. **Bảo trì dễ dàng**: Mã nguồn nhất quán giúp việc bảo trì và cập nhật mã dễ dàng hơn, vì các lập trình viên khác có thể nhanh chóng hiểu và tiếp tục làm việc trên mã nguồn đó.
3. **Giảm lỗi**: Các convention thường bao gồm các thực hành tốt giúp giảm thiểu lỗi phổ biến và cải thiện chất lượng mã nguồn.
4. **Hợp tác tốt hơn**: Khi làm việc trong một nhóm, tuân thủ các convention giúp mọi người làm việc hiệu quả hơn và giảm thiểu xung đột mã nguồn.

## Một số convention thông dụng trong Ruby On Rails

- **Đặt tên biến và phương thức**: Sử dụng chữ cái thường và dấu gạch dưới (`snake_case`) cho biến và phương thức. Ví dụ: `user_name`, `calculate_total`.
- **Đặt tên lớp và module**: Sử dụng chữ cái in hoa và viết liền các từ (`CamelCase`). Ví dụ: `UserProfile`, `ApplicationController`.
- **Độ dài dòng lệnh**: Hạn chế độ dài mỗi dòng lệnh (thường là 80 ký tự, tuy nhiên dự án thực tế thì thường để để 160) để mã nguồn dễ đọc hơn.
- **Sử dụng dấu cách**: Sử dụng hai dấu cách để thụt lề mã nguồn.
- **Khối mã**: Sử dụng dấu ngoặc nhọn `{}` cho các khối mã ngắn, và từ khóa `do...end` cho các khối mã dài hơn.
- **Độ phức tạp của thuật toán trong method**: Quy định tách nhỏ method để dễ đọc hơn.
...

## GEM rubocop

Rubocop là một công cụ phân tích mã nguồn Ruby On Rails, giúp kiểm tra các lỗi và đảm bảo mã nguồn tuân thủ các quy tắc nhất định. Sử dụng nó giúp giảm thiểu đáng kể thời gian review convention cũng như sự thiếu sót trong quá trình viết code.

- Link gem: [github_rubocop](https://github.com/rubocop/rubocop)

- Config tham khảo phổ biến tại **Sun*** (3 file):
  - [.rubocop_disabled.yml](/../static/rubocop_config/.rubocop_disabled.yml)
  - [.rubocop_enabled.yml](/../static/rubocop_config/.rubocop_enabled.yml)
  - [.rubocop.yml](/../static/rubocop_config/.rubocop.yml)
## Sửa lỗi rubocop cho Metrics/AbcSize, Metrics/PerceivedComplexity

- Rubocop cung cấp cho chúng ta công cụ tự động sửa lỗi qua câu lệnh:
```
 rubocop -a path_file_1 path_file_2 ...
```
- Tuy nhiên công cụ này không thể tự động sửa lỗi khi chung ta gặp lỗi liên quan Metrics/AbcSize, Metrics/PerceivedComplexity. Nguyên nhân, vấn đề này gặp phải khi method của chúng ta quá dài, quá nhiều đoạn xử lý logic phức tạp. Cách sửa: 
  - Tách nhỏ method thành nhiều method con, sao cho mỗi method trở thành một đơn vị nhỏ nhất.
  - Có thể viết các method trong private hoặc không tuỳ vào logic thực tế.

- Ví dụ:
```
# bad
def abc
  Records.each do |record|
    handle_logic_1 // biểu thị 1 đoạn xử lý dài
    handle_logic_2 // biểu thị 1 đoạn xử lý dài
    handle_logic_3 // biểu thị 1 đoạn xử lý dài
  end
end

# good
def abc
  Records.each do |record|
    method_common
  end
end

def method_common
  method_logic_1
  method_logic_2
  method_logic_3
end

private

def method_logic_1
  handle_logic_1
end

def method_logic_2
  handle_logic_2
end

def method_logic_3
  handle_logic_3
end
```

Còn rất nhiều lỗi rubocop và cách sửa khác mà chúng ta có thể tham khảo tại
- [rubydoc_gem_rubocop](https://www.rubydoc.info/gems/rubocop/0.27.0/RuboCop) 

## What's next?

- Init dự án ROR và các config hay gặp (Gem, capistrano, setting sidekiq, redis ...)
- Deploy được dự án ROR qua cách làm phổ biến ở **Sun***, sử dụng capistrano + rails_skeleton
