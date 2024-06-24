Deploy một ứng dụng lên Server cần trải qua nhiều bước, do vậy tốn nhiều thời gian và dễ xảy ra lỗi. Có thể tự động hóa việc deploy thông qua Capistrano. Capistrano được thiết lập để deploy chỉ với 1 câu lệnh.

Các files cấu hình được đặt trong **static/deploy_config/**

### 1. Cài đặt và cấu hình Capistrano

Capistrano deploy bằng SSH. Do đó, cần đảm bảo SSH đã được set up.

Capistrano sử dụng hệ thống phân cấp thư mục được xác định nghiêm ngặt trên mỗi Server để tổ chức source code và các dữ liệu liên quan đến deploy. Đường dẫn gốc của cấu trúc này được xác định bằng biến `:deploy_to` trong file **config/deploy.rb**.

```
├── current -> /var/www/[app_name]/releases/20150120114500/
├── releases
│   ├── 20150080072500
│   ├── 20150090083000
│   ├── 20150100093500
│   ├── 20150110104000
│   └── 20150120114500
├── repo
│   └── <VCS related data>
├── revisions.log
└── shared
    └── <linked_files and linked_dirs>
```
- **current**: Trỏ đến bản deploy thành công mới nhất
- **releases**: Lưu giữ các phiên bản đã được deploy của ứng dụng
- **repo**: Lưu giữ Git repository
- **revisions.log**: Được dùng để ghi log mỗi lần deploy hoặc rollback
- **shared**: Lưu trữ những file cố định trong quá trình deploy

Để cài đặt, thêm nội dung sau vào **Gemfile**:
```
group :staging, :production do
  gem "capistrano"
  gem "capistrano-rails"
  gem "capistrano-bundler"
  gem "capistrano-rvm"
  gem "capistrano3-puma"
end
```

Cài các gem mới chạy: `bundle install`

Khởi tạo Capistrano với lệnh: `bundle exec cap install`. Lệnh này tạo ra các files:
```
├── Capfile
├── config
│   ├── deploy
│   │   ├── production.rb
│   │   └── staging.rb
│   └── deploy.rb
└── lib
    └── capistrano
            └── tasks
```
- **Capfile**: Định nghĩa các thư viện con của Capistrano dùng cho deploy
- **config/deploy.rb**: Cấu hình chung cho tất cả các môi trường, cần lưu ý 3 mục dưới, ngoài ra xem thêm tại [đây](https://capistranorb.com/documentation/getting-started/configuration/):
  - `:application`: Tên của ứng dụng
  - `:repo_url`: URL tới Git repository
  - `:linked_files`: Liệt kê các files được sẽ được liên kết từ thư mục shared vào mỗi thư mục trong release. Mặc định `[]`
- **config/deploy/**: Chứa cấu hình cụ thể cho từng môi trường
- **lib/capistrano/tasks/**: Nơi định nghĩa các custom tasks

### 2. Tạo user deploy
Tạo một user có tên deploy: `sudo adduser deploy`

Khi deploy cần cài đặt một số packages do vậy user deploy cần có quyền root, thêm user deploy vào group sudo như sau: `sudo usermod -aG sudo deploy`

Để ssh vào Server bằng user deploy cần thêm public key từ local vào file **authorezied_keys** của user deploy:
- Ở local, chạy lệnh sau để in ra public key: `cat ~/.ssh/id_rsa.pub`
- ssh lại vào server, chuyển qua user deploy, tạo file **authorized_keys** và paste public key vào:
```
ssh [username]@[host_ip_address]
su - deploy
mkdir ~/.ssh
vim ~/.ssh/authorized_keys
```

### 3. Cài đặt Ruby On Rails
Truy cập https://gorails.com/setup/ubuntu/24.04, chọn phiên bản OS phù hợp và làm theo hướng dẫn.

### 4. Cài đặt mysql và tạo Database
Cài đặt MySQL:
```
sudo apt update
sudo apt install mysql-server
```

Chạy security script: `sudo mysql_secure_installation`. Nếu gặp lỗi, thay đổi phương thức xác thực của user root thành `password` rồi thử lại:
```
sudo mysql
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
mysql> exit
```

Tạo Database:
```
mysql -uroot -p
mysql> CREATE DATABASE [databasename];
```

### 5. Cài đặt và cấu hình nginx
```
sudo apt update
sudo apt install nginx
```

Tạo file **/etc/nginx/sites-enablede/[domain]**, copy nội dung từ **static/deploy_config/nginx.conf.sample**, chú ý 1 số dòng sau và sửa lại cho phù hợp:
- `server [path]`: Đường dẫn đến file puma.sock
- `server_name`: Tên Server
- `root`: Đường dẫn đến thư mục public của ứng dụng

Khởi động lại nginx: `sudo systemctl restart nginx`

### 6. Deploy
Commit source code lên Github.

Thêm các files:
- **config/database.yml**: `username` để là `root` và `password` vừa cài đặt ở trên
- **config/master.key** và **config/credentials.yml.enc**: Chạy `EDITOR=vim rails credentials:edit` để tạo mới
- **config/application.yml**

Copy các files trên vào **/var/www/[app_name]/shared/config/**

Ở local, tại folder ứng dụng chạy: `bundle exec cap [stage] deploy`

### 7. RollBack
Mặc định Capistrano sẽ lưu lại 5 phiên bản deploy thành công gần nhất, có thể rollback về bất kỳ phiên bản nào trong đó:
- Rollback về phiên bản ngay trước đó: `bundle exec cap [stage] deploy:rollback`
- Rollback về phiên bản cũ hơn: `bundle exec cap [stage] deploy:rollback ROLLBACK_RELEASE=[timestamped_folder_in_releases_folder]`
