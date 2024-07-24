---
sidebar_position: 3
---

# Ruby on Rails với Docker

## 1. Giới Thiệu

### 1.1. Mục Đích

Mục đích của bộ tiêu chuẩn này là hướng dẫn cách thiết lập môi trường phát triển Ruby on Rails sử dụng Docker.

### 1.2. Đối Tượng Sử Dụng

Các nhà phát triển Ruby on Rails, đội ngũ IT, và bất kỳ ai muốn thiết lập môi trường Rails với Docker.

## 2. Cài Đặt Các Công Cụ Cần Thiết

### 2.1. Cài Đặt Docker

#### Hướng Dẫn Cài Đặt

- **Windows:** [Hướng dẫn cài đặt Docker trên Windows](https://docs.docker.com/docker-for-windows/install/)
- **macOS:** [Hướng dẫn cài đặt Docker trên macOS](https://docs.docker.com/docker-for-mac/install/)
- **Linux:** [Hướng dẫn cài đặt Docker trên Linux](https://docs.docker.com/engine/install/)

#### Tài Liệu Tham Khảo

[Docker Documentation](https://docs.docker.com/)

### 2.2. Cài Đặt Docker Compose

#### Hướng Dẫn Cài Đặt

- **Windows/macOS/Linux:** [Hướng dẫn cài đặt Docker Compose](https://docs.docker.com/compose/install/)

#### Tài Liệu Tham Khảo

- [Docker Compose Documentation](https://docs.docker.com/compose/)

## 3. Cấu Hình Docker
### 3.1. Tạo Dockerfile
#### Mục Đích

Giải thích mục đích của Dockerfile trong việc xây dựng Docker image.

#### Nội Dung

- Cài đặt Ruby và các dependencies.
- Sao chép mã nguồn vào container.
- Thiết lập lệnh khởi động container.

- File cấu hình:

```DockerFile
# Sử dụng image của Ruby
FROM ruby:3.1

ENV APP_ROOT /app
# Cài đặt các gói phụ thuộc
RUN apt-get update -qq && apt-get install -y \
    build-essential \
    libpq-dev \
    nodejs \
    yarn

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép file Gemfile và Gemfile.lock vào thư mục làm việc
COPY ./Gemfile $APP_ROOT
COPY ./Gemfile.lock $APP_ROOT

# Cài đặt các gem được liệt kê trong Gemfile
RUN bundle install

# Sao chép toàn bộ mã nguồn ứng dụng vào thư mục làm việc
COPY . $APP_ROOT

# Timezone (nếu cần)
RUN ln -sf  /usr/share/zoneinfo/Asia/Ho_CHi_Minh /etc/localtime
```

### 3.2. Tạo docker-compose.yml
#### Mục Đích

Giải thích vai trò của docker-compose.yml trong việc quản lý các dịch vụ.

#### Nội Dung
- Cấu hình dịch vụ cho Ruby on Rails.
- Cấu hình dịch vụ cho cơ sở dữ liệu (PostgreSQL, MySQL, etc.).
- Cấu hình mạng và volume.

- File cấu hình: [docker-compose](/../static/docker_with_ror/docker-compose.yml)

### 3.3. Tạo .dockerignore
#### Mục Đích
Giải thích vai trò của .dockerignore trong việc loại bỏ các tập tin không cần thiết khi build Docker image.

#### Nội Dung

Các mục nên được loại bỏ như thư mục node_modules, log, tmp, etc.

- File cấu hình:

```.dockerignore
.git
log/*
tmp/*
!.gitkeep
.bundle
vendor/bundle
node_modules
```

### 3.4 Cấu hình database, mailhog, sideki

Các file cấu hình như database.yml, mailhog, sidekiq.yml vẫn được cấu hình như bình thường, có thể tham khảo

- Database.yml: [database.yml](/../static/docker_with_ror/database.yml)
- Sidekiq.yml: [sidekiq.yml](/../static/docker_with_ror/sidekiq.yml)
- Mailhog:
```
#config/environments/development.rb

config.action_mailer.delivery_method = :smtp
config.action_mailer.smtp_settings = {
  address: ENV['MAILHOG_HOST'],
  port: 1025
}
```
## 4. Một số CLI rails hay được sử dụng với Docker

### 4.1. docker build, up, down

```
docker-compose build
docker-compose up
docker-compose down
```

### 4.2. docker start, restart, stop container

```
docker-compose start {service_name}
docker-compose restart {service_name}
docker-compose stop {service_name}
```

### 4.3. create, migrate database, bundle

```
docker-compose exec runner bundle install
docker-compose exec runner rake db:create db:migrate
```

### 4.4. rails c, attach with binding.pry

```
docker-compose exec runner rails c
docker attach {container_id}
```

## 5. Kết luận

Bên trên là những config hay dùng đối với các dự án Ruby on Rails thường gặp, tùy dự án, thì chúng ta sẽ có các tùy chỉnh riêng. Việc sử dụng `Docker` mang lại tính nhất quán trong môi trường phát triển, dễ dàng triển khai, mở rộng. Và đặc biệt nó sẽ dễ dàng tích hợp với CI/CD và K8s, phù hợp với định hướng deploy mới của Sun* trong tương lai.
