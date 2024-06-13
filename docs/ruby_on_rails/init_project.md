---
sidebar_position: 1
---

# Init Project, Gem phổ biến

## Mục tiêu của bài viết
- Tổng hợp tài liệu từ tutorial ruby on rails, kết hợp với list gem thường được sử dụng trong các dự án thực tế (có giải thích và link gem tương ứng). 
- Bài viết là một checklist dành cho người init dự án ROR.

## Tutorial Ruby on Rails
- [Tutorial](https://www.railstutorial.org/book/toy_app)

## Các cài đặt cần thiết
1. **Ruby**
- Mac: [install rbenv, ruby](https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rbenv-on-macos)
- Ubuntu 20.04: [install rvm, ruby](https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rvm-on-ubuntu-20-04)

2. **Mysql**
- Mac: [install with file .pkg](https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-shell-install-macos-quick.html)
- Ubuntu 20.04: [install](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04)

3. **Redis**
- Mac: [install](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-mac-os/)
- Ubuntu 20.04: [install](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-20-04)

## List Gem và giải thích
- *Lưu ý*: version của các gem cần update đối với dự án hiện tại

```
# Gemfile
source "https://rubygems.org"
git_source(:github){|repo| "https://github.com/#{repo}.git"}

ruby "2.5.1"

# Activerecord-import: Tăng tốc độ import dữ liệu vào database với ActiveRecord
# [activerecord-import](https://github.com/zdennis/activerecord-import)
gem "activerecord-import"

# Bcrypt: Hashing mật khẩu một cách an toàn
# [bcrypt](https://github.com/codahale/bcrypt-ruby)
gem "bcrypt", "~> 3.1.7"

# Bindata: Làm việc với dữ liệu nhị phân theo cấu trúc
# [bindata](https://github.com/dmendel/bindata)
gem "bindata"

# Bootsnap: Tăng tốc độ khởi động của Rails bằng cách cache một số hoạt động
# [bootsnap](https://github.com/Shopify/bootsnap)
gem "bootsnap", ">= 1.1.0", require: false

# Carrierwave: Upload và quản lý file dễ dàng
# [carrierwave](https://github.com/carrierwaveuploader/carrierwave)
gem "carrierwave", "~> 1.0"

# Config: Dễ dàng quản lý các file cấu hình
# [config](https://github.com/railsconfig/config)
gem "config"

# Dotenv-rails: Quản lý biến môi trường từ file `.env`
# [dotenv-rails](https://github.com/bkeepers/dotenv)
gem "dotenv-rails"

# MiniMagick: Sử dụng ImageMagick trong Ruby một cách dễ dàng
# [mini_magick](https://github.com/minimagick/minimagick)
gem "mini_magick"

# Mysql2: MySQL client cho Ruby
# [mysql2](https://github.com/brianmario/mysql2)
gem "mysql2", ">= 0.4.4", "< 0.6.0"

# Puma: Máy chủ HTTP hiệu năng cao cho Ruby/Rails
# [puma](https://github.com/puma/puma)
gem "puma", "~> 3.11"

# Pundit: Cung cấp các hàm trợ giúp để xây dựng các chính sách kiểm soát truy cập
# [pundit](https://github.com/varvet/pundit)
gem "pundit"

# Rack-cors: Middleware xử lý CORS (Cross-Origin Resource Sharing) cho Rack ứng dụng
# [rack-cors](https://github.com/cyu/rack-cors)
gem "rack-cors"

# Rails: Framework phát triển web mạnh mẽ và phổ biến
# [rails](https://github.com/rails/rails)
gem "rails", "~> 5.2.1"

# Redis: Client cho Redis, một hệ thống lưu trữ dữ liệu key-value trong bộ nhớ
# [redis](https://github.com/redis/redis-rb)
gem "redis"

# Redis-rails: Tích hợp Redis với Rails
# [redis-rails](https://github.com/redis-store/redis-rails)
gem "redis-rails"

# Rest-client: HTTP client đơn giản cho Ruby
# [rest-client](https://github.com/rest-client/rest-client)
gem "rest-client"

# Sidekiq: Xử lý background job dựa trên Redis
# [sidekiq](https://github.com/mperham/sidekiq)
gem "sidekiq"

# Sidekiq-limit_fetch: Giới hạn số lượng job được fetch từ queue trong Sidekiq
# [sidekiq-limit_fetch](https://github.com/brainopia/sidekiq-limit_fetch)
gem "sidekiq-limit_fetch"

# Simplecov-cobertura: Formatter cho SimpleCov để xuất báo cáo theo định dạng Cobertura
# [simplecov-cobertura](https://github.com/daniel-szabo/simplecov-cobertura)
gem "simplecov-cobertura"

# Whenever: Cron jobs dễ dàng với Ruby
# [whenever](https://github.com/javan/whenever)
gem "whenever", require: false

group :development, :test do
  # Brakeman: Kiểm tra bảo mật cho các ứng dụng Rails
  # [brakeman](https://github.com/presidentbeef/brakeman)
  gem "brakeman", "3.4.1", require: false

  # Bullet: Phát hiện N+1 queries và các vấn đề về sử dụng query trong Rails
  # [bullet](https://github.com/flyerhzm/bullet)
  gem "bullet"

  # Bundler-audit: Kiểm tra các lỗ hổng bảo mật trong các gem đã cài đặt
  # [bundler-audit](https://github.com/rubysec/bundler-audit)
  gem "bundler-audit"

  # Byebug: Công cụ debug cho Ruby
  # [byebug](https://github.com/deivid-rodriguez/byebug)
  gem "byebug", platforms: [:mri, :mingw, :x64_mingw]

  # Database_cleaner: Dọn dẹp cơ sở dữ liệu trong quá trình test
  # [database_cleaner](https://github.com/DatabaseCleaner/database_cleaner)
  gem "database_cleaner"

  # Factory_bot_rails: Thư viện cho việc tạo các object giả lập trong test
  # [factory_bot_rails](https://github.com/thoughtbot/factory_bot_rails)
  gem "factory_bot_rails"

  # Faker: Tạo dữ liệu giả ngẫu nhiên
  # [faker](https://github.com/faker-ruby/faker)
  gem "faker"

  # Mock_redis: Redis giả lập cho test
  # [mock_redis](https://github.com/brigade/mock_redis)
  gem "mock_redis"

  # Pry: IRB thay thế với nhiều tính năng mạnh mẽ
  # [pry](https://github.com/pry/pry)
  gem "pry"

  # Pry-byebug: Kết hợp giữa Pry và Byebug để debug
  # [pry-byebug](https://github.com/deivid-rodriguez/pry-byebug)
  gem "pry-byebug"

  # Pundit-matchers: Matchers cho Pundit trong RSpec
  # [pundit-matchers](https://github.com/chrisalley/pundit-matchers)
  gem "pundit-matchers"

  # Rails_best_practices: Công cụ phân tích tĩnh cho Rails
  # [rails_best_practices](https://github.com/railsbp/rails_best_practices)
  gem "rails_best_practices"

  # Reek: Phân tích code để tìm các bad smells
  # [reek](https://github.com/troessner/reek)
  gem "reek"

  # Rspec-rails: Testing framework cho Rails
  # [rspec-rails](https://github.com/rspec/rspec-rails)
  gem "rspec-rails"

  # Rubocop: Công cụ phân tích code theo chuẩn Ruby style guide
  # [rubocop](https://github.com/rubocop/rubocop)
  gem "rubocop", "~> 0.52.1", require: false

  # Rubocop-checkstyle_formatter: Formatter cho Rubocop để xuất báo cáo theo định dạng Checkstyle
  # [rubocop-checkstyle_formatter](https://github.com/rubocop/rubocop-checkstyle_formatter)
  gem "rubocop-checkstyle_formatter", require: false
end

group :development do
  # Listen: Theo dõi thay đổi file và thực hiện các hành động tương ứng
  # [listen](https://github.com/guard/listen)
  gem "listen", ">= 3.0.5", "< 3.2"

  # Rails-erd: Tạo sơ đồ quan hệ giữa các model trong Rails
  # [rails-erd](https://github.com/voormedia/rails-erd)
  gem "rails-erd"

  # Seed-fu: Quản lý seed data trong Rails
  # [seed-fu](https://github.com/mbleigh/seed-fu)
  gem "seed-fu", "~> 2.3"

  # Spring: Tăng tốc độ khởi động ứng dụng Rails
  # [spring](https://github.com/rails/spring)
  gem "spring"

  # Spring-watcher-listen: Tự động khởi động lại Spring khi có thay đổi file
  # [spring-watcher-listen](https://github.com/spring/spring-watcher-listen)
  gem "spring-watcher-listen", "~> 2.0.0"
end

group :test do
  # Rspec-sidekiq: Testing cho Sidekiq với RSpec
  # [rspec-sidekiq](https://github.com/philostler/rspec-sidekiq)
  gem "rspec-sidekiq"

  # Shoulda-matchers: Matchers cho testing trong RSpec và Minitest
  # [shoulda-matchers](https://github.com/thoughtbot/shoulda-matchers)
  gem "shoulda-matchers"

  # Simplecov: Đo độ bao phủ code
  # [simplecov](https://github.com/simplecov-ruby/simplecov)
  gem "simplecov"

  # Simplecov-json: Formatter cho SimpleCov để xuất báo cáo theo định dạng JSON
  # [simplecov-json](https://github.com/vicentllongo/simplecov-json)
  gem "simplecov-json"

  # Simplecov-rcov: Formatter cho SimpleCov để xuất báo cáo theo định dạng Rcov
  # [simplecov-rcov](https://github.com/fguillen/simplecov-rcov)
  gem "simplecov-rcov"
end

group :staging, :production do
  # Capistrano: Triển khai ứng dụng dễ dàng và tự động hóa
  # [capistrano](https://github.com/capistrano/capistrano)
  gem "capistrano", "~> 3.7"

  # Capistrano-bundler: Tự động chạy bundler trong quá trình deploy
  # [capistrano-bundler](https://github.com/capistrano/bundler)
  gem "capistrano-bundler"

  # Capistrano-rails: Tasks cho Rails trong Capistrano
  # [capistrano-rails](https://github.com/capistrano/rails)
  gem "capistrano-rails"

  # Capistrano-rvm: Tích hợp RVM với Capistrano
  # [capistrano-rvm](https://github.com/rvm/capistrano)
  gem "capistrano-rvm"
end

```

## Một số Gem đáng chú ý
- Với việc cài Gemfile trên thông qua câu lệnh `bundle install` một số Gem yêu cầu phải có những file config đặc biệt:

1. **config/puma.rb**
- [puma](https://github.com/puma/puma)

2. **config/initializers/redis.rb**
- [redis](https://github.com/redis/redis-rb)

3. **Sidekiq config**
- [sidekiq](https://github.com/mperham/sidekiq)
- [sidekiq-limit_fetch](https://github.com/brainopia/sidekiq-limit_fetch)

4. **Cors config**
- [rack-cors](https://github.com/cyu/rack-cors)

5. **Rspec config**
- [rspec-rails](https://github.com/rspec/rspec-rails)
- [pundit-matchers](https://github.com/pundit-community/pundit-matchers)
- [mock_redis](https://github.com/brigade/mock_redis)

6. **Bullet config**
- [bullet](https://github.com/flyerhzm/bullet)
- [bundler-audit](https://github.com/rubysec/bundler-audit)

7. **Pundit config**
- [pundit](https://github.com/varvet/pundit)

8. **Capistrano config**
- [capistrano](https://github.com/pundit-community/pundit-matchers)
- Sẽ có một bài riêng về phần này.

## Một số GEM nổi tiếng khác
1. **Devise: Authentication dễ dàng cho Rails**
- [devise](https://github.com/heartcombo/devise)
2. **Paranoia: Soft delete cho ActiveRecord**
- [paranoia](https://github.com/rubysherpas/paranoia)
3. **Googleauth: Xác thực OAuth 2.0 với Google**
- [googleauth](https://github.com/googleapis/google-auth-library-ruby)
4. **Redis-namespace: Namespacing các key trong Redis**
- [redis-namespace](https://github.com/resque/redis-namespace)
5. **Redis-objects: Cung cấp các object cao cấp cho Redis**
- [redis-objects](https://github.com/nateware/redis-objects)
6. **Counter Culture: Tự động cập nhật các counter caches**
- [counter_culture](https://github.com/magnusvk/counter_culture)
7. **Switch Point: Cho phép sử dụng nhiều kết nối cơ sở dữ liệu với ActiveRecord**
- [switch_point](https://github.com/eagletmt/switch_point)
- *Lưu ý*: Tuy nhiên gem không hoạt động tốt trong `transactions`, cần sử dụng `auto_writable`
8. **Carrierwave: Upload và quản lý file dễ dàng**
- [carrierwave](https://github.com/carrierwaveuploader/carrierwave)
9. **FCM: Gửi thông báo qua Firebase Cloud Messaging**
- [fcm](https://github.com/spacialdb/fcm)
10. **Ransack: Công cụ tìm kiếm và lọc cho Rails**
- [ransack](https://github.com/activerecord-hackery/ransack)
11. **MiniMagick: Sử dụng ImageMagick trong Ruby một cách dễ dàng**
- [mini_magick](https://github.com/minimagick/minimagick)
12. **Parallel: Thực hiện các tác vụ song song để tăng tốc độ xử lý**
- [parallel](https://github.com/grosser/parallel)
13. **Với những dự án sử dụng sidekiq**
- [Leak Memory Ruby on Rails và cài đặt jemalloc](https://viblo.asia/p/leak-memory-ruby-on-rails-va-cai-dat-jemalloc-Qbq5Q7YzZD8)

## What's next?

- DockerFile, docker-compose.yml hay dùng cho dự án ROR.
- Deploy được dự án ROR qua cách làm phổ biến ở **Sun***, sử dụng capistrano + rails_skeleton
