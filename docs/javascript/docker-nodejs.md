---
sidebar_position: 4
---


# Docker cơ bản cho dự án Node.js

## Giới thiệu
Docker là một công cụ container hóa mạnh mẽ, cho phép bạn đóng gói ứng dụng và tất cả các phụ thuộc của nó vào một container độc lập. Điều này đảm bảo tính nhất quán của môi trường làm việc và dễ dàng triển khai ứng dụng. Trong bài viết này, chúng ta sẽ tìm hiểu một số lệnh Docker cơ bản thường được sử dụng trong quá trình phát triển và quản lý các ứng dụng Node.js.

## Các command Docker thường gặp

1. docker ps
- Chức năng: Liệt kê các container đang chạy.

```bash
docker ps
```

- Để xem tất cả các container (cả đang chạy và đã dừng), sử dụng:
  
```bash
docker ps -a
```

2. docker inspect

- Chức năng: Xem chi tiết thông tin của một container.

```bash
docker inspect <tên_container_hoặc_id>
```

Ví dụ:
```bash
docker inspect my_node_app
```

3. docker attach

- Chức năng: Gắn terminal vào một container đang chạy.

```bash
docker attach <tên_container_hoặc_ID>
```

Lưu ý: Để thoát khỏi terminal, nhấn Ctrl+P rồi Ctrl+Q.

4. docker run -it

- Chức năng: Tạo và khởi động một container tương tác, đồng thời gắn terminal vào container đó.

```bash
docker run -it <tên_image> <câu_lệnh>
```

Ví dụ:
```bash
docker run -it node:20 bash
```

## Ví dụ sử dụng Docker với dự án Node.js

Ví dụ về Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
```

Giải thích:

- FROM node:20-alpine
Ý nghĩa: Dòng này chỉ định image cơ sở cho việc xây dựng image mới.
node:20-alpine: Sử dụng image Node.js phiên bản 20 dựa trên hệ điều hành Alpine Linux. Alpine Linux là một hệ điều hành nhỏ gọn, thường được sử dụng để tạo các image Docker nhẹ.
- WORKDIR /app
Ý nghĩa: Thiết lập thư mục làm việc trong container là /app. Tất cả các lệnh sau sẽ được thực thi trong thư mục này.
- COPY package*.json ./
Ý nghĩa: Sao chép các file package.json và package-lock.json từ thư mục hiện tại của máy chủ vào thư mục /app trong container.
- RUN npm install
Ý nghĩa: Chạy lệnh npm install trong thư mục /app để cài đặt các dependency được liệt kê trong package.json.
- COPY . .
Ý nghĩa: Sao chép toàn bộ nội dung của thư mục hiện tại trên máy chủ vào thư mục /app trong container. Điều này bao gồm code ứng dụng, các file cấu hình, v.v.
- CMD ["npm", "start"]
Ý nghĩa: Chỉ định lệnh mặc định sẽ được thực thi khi container khởi động. Trong trường hợp này, lệnh npm start sẽ được chạy để khởi động ứng dụng Node.js.



Các bước thực hiện:

- Build image:
```bash
docker build -t my-node-app .
```

- Chạy container:
```bash
docker run -it --name my_node_app -p 3000:3000 my-node-app
```

-it: Tạo một container tương tác và gắn terminal.
--name my_node_app: Đặt tên cho container.
-p 3000:3000: Mở cổng 3000 của container và ánh xạ đến cổng 3000 của máy chủ.

- Kiểm tra container:
```bash
docker ps
```

- Xem chi tiết container:
```bash
docker inspect my_node_app
```

- Gắn terminal vào container:
```bash
docker attach my_node_app
```

## Docker Compose với ứng dụng NodeJS

1/ Lợi ích của sử dụng Docker Compose:

- Quản lý nhiều container: Định nghĩa và quản lý nhiều container trong một file cấu hình duy nhất.
- Dễ dàng triển khai: Khởi động, dừng và khởi động lại toàn bộ ứng dụng chỉ với một lệnh.
- Môi trường phát triển nhất quán: Đảm bảo rằng môi trường phát triển của bạn giống hệt với môi trường sản xuất.


2/ Ví dụ một file docker-compose.yml đơn giản:

YAML
```
version: '3.7'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: mongo
    ports:
      - "27017:27017"

```


Giải thích:

- version: Chỉ định phiên bản của Docker Compose.
- services: Định nghĩa các dịch vụ (container) trong ứng dụng.
- build: Chỉ ra thư mục chứa Dockerfile để xây dựng image.
- ports: Mở các cổng để truy cập vào dịch vụ.


Với cấu hình này, Docker Compose sẽ xây dựng một container cho ứng dụng Node.js chạy ở Port 3000 và một container cho cơ sở dữ liệu MongoDB chạy ở port 27017.
