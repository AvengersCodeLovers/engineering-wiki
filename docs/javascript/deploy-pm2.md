# Deploy ứng dụng NodeJS với pm2

## Pm2 là gì?

pm2 là một công cụ quản lý tiến trình Node.js, giúp bạn khởi động, giám sát và quản lý các ứng dụng Node.js của mình một cách dễ dàng. Nó đặc biệt hữu ích trong production bởi đảm bảo zero-downtime
Document pm2: https://pm2.keymetrics.io/docs/usage/quick-start/

## Tại sao nên sử dụng pm2?

- Khởi động lại tự động: Khi ứng dụng gặp lỗi và bị crash, pm2 sẽ tự động khởi động lại.
- Quản lý nhiều tiến trình: Bạn có thể quản lý nhiều ứng dụng Node.js khác nhau cùng một lúc.
- Xem log: pm2 cung cấp các lệnh để xem log của các tiến trình một cách dễ dàng.
- Cân bằng tải: pm2 có khả năng phân phối tải cho các tiến trình trên nhiều CPU.
- Clustering: Tạo nhiều instance của ứng dụng để tăng khả năng xử lý.
- Zero downtime deployment: Triển khai ứng dụng mới mà không làm gián đoạn dịch vụ.

## Cài đặt và config


### Cài đặt pm2

```bash
npm install pm2 -g
```

### Config pm2

Có hai cách chính để cấu hình pm2:

1. Cấu hình qua dòng lệnh

```bash
pm2 start app.js
```

2. Cấu hình qua file ecosystem.config.js

Tạo một file tên ecosystem.config.js ở thư mục gốc của dự án và cấu hình các ứng dụng của bạn trong đó. 

Ví dụ:

```javascript
module.exports = {
  apps : [{
    name: 'my-app',
    script: 'app.js',
    instances: 'max', // Số lượng instance tối đa
    exec_mode: 'cluster', // Chế độ cluster
    env: {
      NODE_ENV: 'development'
    },
    env_production : {
      NODE_ENV: 'production'
    }
  }]
};
```

Sau đó, khởi động các ứng dụng bằng lệnh:

```bash
pm2 start ecosystem.config.js
```

## Các command cơ bản của pm2

- pm2 start app.js: Khởi động ứng dụng app.js.
- pm2 list: Liệt kê tất cả các tiến trình đang chạy.
- pm2 stop all: Dừng tất cả các tiến trình.
- pm2 restart all: Khởi động lại tất cả các tiến trình.
- pm2 delete all: Xóa tất cả các tiến trình.
- pm2 logs: Xem log của tất cả các tiến trình.
- pm2 monit: Theo dõi các tiến trình trong thời gian thực.
- pm2 save: Lưu cấu hình hiện tại.
- pm2 resurrect: Khôi phục cấu hình đã lưu.



Ví dụ sử dụng

```bash
# Khởi động ứng dụng app.js với 2 instance
pm2 start app.js -i 2

# Xem log của ứng dụng app.js
pm2 logs app.js

# Restart tất cả các tiến trình
pm2 restart all
```

## Pm2 deployment

Module này giúp bạn có thể deploy ứng dụng lên các môi trường khác nhau chỉ từ command line
Document: https://pm2.keymetrics.io/docs/usage/deployment/

- Bước 1: Cấu hình phần `deploy` trong file config

```javascript
module.exports = {
  apps : [{
    script: 'api.js',
  }, {
    script: 'worker.js'
  }],
   
  // Deployment Configuration
  deploy : {
    production : {
       "user" : "ubuntu",
       "host" : ["192.168.0.13", "192.168.0.14", "192.168.0.15"],
       "ref"  : "origin/master",
       "repo" : "git@github.com:Username/repository.git",
       "path" : "/var/www/my-repository",
       "post-deploy" : "npm install"
    }
  }
};
```

- Bước 2: Setup lần đầu cho server

```bash
pm2 deploy production setup
```

- Bước 3: Thực hiện deploy

```bash
pm2 deploy production
```


Tóm lại, **pm2** là một công cụ hữu ích cho các nhà phát triển Node.js, giúp bạn quản lý và giám sát ứng dụng của mình một cách hiệu quả. Với những lợi ích và tính năng đa dạng, pm2 sẽ giúp bạn tiết kiệm thời gian và công sức trong quá trình phát triển và triển khai ứng dụng.

