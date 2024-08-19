---
sidebar_position: 3
title: Docker Compose
---

# Docker Compose

Tài liệu [Docker Compose](https://docs.docker.com/compose/overview/) có đề cập rằng

> Compose is a tool for defining and running multi-container Docker applications.

> Compose là một công cụ để định nghĩa và chạy các ứng dụng Docker đa-container.

Thực tế là chúng ta có thể làm nhiều hơn thế, tài liệu này sẽ đưa ra một số lưu ý khi sử dụng Docker Compose.

## Không lưu trữ các khoá bí mật bên trong **Docker Compose** (hoặc repository tương ứng)

Tương tự như việc [Không được phép chứa thông tin bí mật trong Dockerfile (hoặc repository tương ứng)](/docs/docker/docker-file.md#kh%C3%B4ng-%C4%91%C6%B0%E1%BB%A3c-ph%C3%A9p-ch%E1%BB%A9a-th%C3%B4ng-tin-b%C3%AD-m%E1%BA%ADt-trong-dockerfile-ho%E1%BA%B7c-repository-t%C6%B0%C6%A1ng-%E1%BB%A9ng), không được phép lưu các khoá bí mật bên trong **Docker Compose**.

```
$ cat docker-compose.yml
  mysql:
    image: mysql
    container_name: mysql
    volumes:
    - "./data/mysql:/var/lib/mysql"
    environment:
    - "MYSQL_ROOT_PASSWORD=root"
    - "MYSQL_DATABASE=saml"
    - "MYSQL_USER=saml"
    - "MYSQL_PASSWORD=saml"
```

Cải thiện đầu tiên là sử dụng một tệp tin được lưu trữ bên ngoài **Dockerfile's** hoặc **Docker Compose's** và chỉ được lấy hoặc tạo ra khi deploy.

```
$ cat docker-compose.yml
  mysql:
    image: mysql
    container_name: mysql
    volumes:
    - "./data/mysql:/var/lib/mysql"
$ cat .env
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=saml
MYSQL_USER=saml
MYSQL_PASSWORD=saml
```

Từ **Docker Compose** 0.6, có thể sử dụng [variable expansion](https://docs.docker.com/compose/compose-file/#variable-substitution) để thực hiện điều này.

```
$ cat docker-compose.yml
  mysql:
    image: mysql
    container_name: mysql
    volumes:
    - "./data/mysql:/var/lib/mysql"
    environment:
    - "MYSQL_ROOT_PASSWORD=$(ADMPWD)"
    - "MYSQL_DATABASE=$(DB)"
    - "MYSQL_USER=$(DBU)"
    - "MYSQL_PASSWORD=$(DBUPWD)"
$ ADMPWD=root DB=saml DBU=saml DBUPWD=saml docker-compose up -d
```

Câu lệnh này có thể được tạo ra và thực thi bởi các công cụ deploy mà không để lộ các tham số dưới dạng "plain text".

## Container-Compositions are **Microservices**

## Các container thành phần được xem như là những **Microservices**

Một container thành phần có thể hoặc nên được xem như là một microservice.
Khi container khởi chạy, nó nên hoạt động thành công và cung cấp một service tương ứng.

## Use Environment Variables

## Sử dụng  Biến Môi Trường

Ở các phiên bản 1.5 trở về trước, một tệp tin docker-compose chỉ có thể được sử dụng một cách cố định và cần phải xử lý thông tin cụ thể về môi trường "thủ công" bằng cách sử dụng các bản sao của tệp compose hoặc bằng cách sử dụng các thư mục khác nhau với các tệp env cụ thể.
Ví dụ:
* docker-compose-dev.yml
* docker-compose-production.yml

Kể từ phiên bản 1.5, có thể sử dụng **biến môi trường** để tổ chức các cài đặt cụ thể về môi trường một cách dễ dàng hơn.
Dưới đây là một ví dụ cho thấy cách sử dụng biến môi trường "ENV" để chọn một "env_file" cụ thể.

docker-compose file:

```
$ cat docker-compose.yml
version: "2"
services:
  dummy:
    env_file: ${ENV}
    image: ubuntu
    command: /bin/sh -c "echo $${ME}"
```

Với 2 tệp env_file:

```
$ cat .env1
ME=me

$cat .env2
ME=I
```

Kiểm tra xem biến môi trường "ENV" đã làm thay đổi cài đặt env_file trong docker-compose.yml như sau:

```
$ ENV=.env1 docker-compose up dummy
Recreating identityandservices_dummy_1
Attaching to identityandservices_dummy_1
dummy_1 | me
identityandservices_dummy_1 exited with code 0

$ ENV=.env2 docker-compose up dummy
Recreating identityandservices_dummy_1
Attaching to identityandservices_dummy_1
dummy_1 | I
identityandservices_dummy_1 exited with code 0
```