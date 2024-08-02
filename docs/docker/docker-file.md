---
sidebar_position: 2
title: Dockerfile
---

# Dockerfile

Một tệp Dockerfile sẽ chứa các nội dung để định nghĩa nên một Docker Image và là đầu vào chính của Docker Engine khi câu lệnh `docker build ...` được thực thi.

## Không được phép nâng cấp phiên bản của hệ điều hành bằng câu lệnh.

**CÓ THỂ** "cập nhật" các gói phần mềm của hệ điều hành bên trong **Base Image**, nhưng **Không Được Phép** thay thế **Base Image** bằng việc "nâng cấp"" bên trong Dockerfile.

Như này thì không sao

```
FROM ubuntu: 14.04.1
RUN apt-get update \
    && apt-get install -y ...
# ...
```

Nhưng như này thì không được

```
FROM ubuntu: 14.04.1
RUN apt-get update \
    && apt-get upgrade -y
    && apt-get install -y ...
# ...
```

Câu lệnh `apt-get upgrade` (hoặc những câu lệnh nâng cấp **Base Image** khác tương đương) có thể làm thay đổi phiên bản của những phần mềm đã cài đặt sẵn hoặc thậm chí cài đặt hoặc xoá bỏ những gói phần mềm trên dependency mới. Kết quả là Docker Image không còn giống với **Base Image** nữa.

Nếu cần phải thay đổi điều gì khi chạy `docker build` bị lỗi, hãy **CÂN NHẮC** thay đổi luôn phiên bản **Base Image**

	FROM ubuntu: new-version
	# ...

## Bên trong Dockerfile, đừng sử dụng các phần mềm như puppet, ansible, salt, ...

Theo như tài liệu mô tả về Dockerfile [Dockerfile reference](https://docs.docker.com/engine/reference/builder/) có định nghĩa như sau:

> [...] is a text document that contains **all** the commands a user could **call on the command line** to assemble an image.

> [...] là một tệp tin văn bản chứa **tất cả** những câu lệnh mà người dùng có thể **gọi trên command line** để lắp ráp thành một image.

Nếu sử dụng các công cụ quản lý cấu hình bên (configuration management tool) trong container, dù vẫn được phép nhưng có những rủi ro sau:

1. Vô hình chung cài đặt những phần mềm và dịch vụ không cần thiết hoặc có rủi ro khi chạy (ví dụ một cơ sở dữ liệu thì không cần phải có [puppet](https://www.puppet.com/)).
2. Có những bước cài đặt ngầm được thực hiện bởi bất cứ ai sở hữu Dockerfile, làm mất đi tính minh bạch của Dockerfile.
3. Hầu hết mọi người sẽ quen với các phần mềm quản lý package như apt, apk, yum,..., thay vì các công cụ quản lý cấu hình.

## Chỉ sử dụng những image được phát triển từ những nguồn tin cậy

Việc download (pull) và sử dụng các image được dựng sẵn từ những nguồn cộng đồng khá là tiện lợi và dễ dàng.

Tuy nhiên, để tránh rủi ro từ những image thiếu chuẩn chỉnh hoặc bị ngừng phát triển, chúng ta chỉ nên sử dụng những Docker Image **chính thức** từ **Docker Hub** tại [https://hub.docker.com/](https://hub.docker.com/) cho các môi trường chính (không phải môi trường thử nghiệm ).

Ví dụ về một Dockerfile sử dụng **Docker Hub**

```
# official image, because there is NO account or the "library" account being used
FROM ubuntu:14.04.1
# FROM library/ubuntu:14.04.1
# FROM hub.docker.com/library/ubuntu:14.04.1
```

## Không được phép chứa thông tin bí mật trong Dockerfile (hoặc repository tương ứng)

Một ví dụ xấu của Dockerfile

```
FROM ubuntu:14.04.1
MAINTAINER ...
ENV API_KEY=4711101 \
    USR=admin \
    PWD=the_admin_password \
    CREDITCARD=5555 3333 2222
ADD the_same_secrets.txt /etc
# ...
```

Bắt buộc phải giữ các thông tin bí mật (secret keys) ra khỏi Dockerfile **VÀ** repository tương ứng.

Docker repository có thể được chia sẻ công khai, và thông tin bí mật có thể bị lộ ra ngoài.
Ngay cả những private repository, việc sử dụng các thông tin bí mật trong Dockerfile cũng là một rủi ro.

Có thể giải quyết vấn đề bằng những cách sau:
- cung cấp thông tin bí mật dưới dạng **biến môi trường** khi khởi động container với `docker run -e API_KEY=4711 ...`
- tạo **repository riêng biệt cho các container chứa thông tin bí mật** mà không bao giờ bị công khai ra ngoài
- tạo các container chỉ chứa **cấu hình "tạm thời"** trong quá trình cài đặt
- để **entrypoint hoặc command của container lấy thông tin bí mật** khi khởi động.


## Verify các artifacts đã download

Khi sử dụng Dockerfile với câu lệnh `docker build`, các tệp từ hệ thống tệp cục bộ (build context) có thể được sử dụng hoặc được lấy từ các dịch vụ trong mạng nội bộ hoặc internet.

Bắt buộc phải verify các tệp được download từ bên ngoài.

### Verify các artifacts đã download (I)

Có thể verify bằng một trong những cách sau:
- Sử dụng chữ ký ở một tệp riêng biệt
- Sử dụng một file đã được hash và kết hợp với một file chữ ký từ public keyserver.

```
     # ...
    ENV HASHICORP_KEYIDS=51852D87348FFC4C
     # ...
    RUN curl -sL https://releases.hashicorp.com/vault/0.5.0/vault_0.5.0_linux_amd64.zip >  vault_0.5.0_linux_amd64.zip \
        && curl -sL https://releases.hashicorp.com/vault/0.5.0/vault_0.5.0_SHA256SUMS > app.sha \
        && curl -sL https://releases.hashicorp.com/vault/0.5.0/vault_0.5.0_SHA256SUMS.sig > app.sig \
        && gpg --recv-keys ${HASHICORP_KEYIDS} \
        && gpg --verify app.sig app.sha \
        && grep linux_amd64 app.sha | sha256sum -sc \
        && echo "We only get here if sha256sum succeeded ..."
```

> Sử dụng keyserver với giao thức HTTP (cổng 80) có thể giúp giải quyết các vấn đề với tường lửa (firewall), thay vì HTTPS.

```
     # ...
    ENV HASHICORP_KEYIDS=51852D87348FFC4C
     # ...
	RUN curl -sL https://releases.hashicorp.com/vault/0.5.0/vault_0.5.0_linux_amd64.zip >  vault_0.5.0_linux_amd64.zip \
        && curl -sL https://releases.hashicorp.com/vault/0.5.0/vault_0.5.0_SHA256SUMS > app.sha \
        && curl -sL https://releases.hashicorp.com/vault/0.5.0/vault_0.5.0_SHA256SUMS.sig > app.sig \
        && gpg --keyserver http://pool.sks-keyservers.net:80 --recv-keys ${HASHICORP_KEYIDS} \
        && gpg --verify app.sig app.sha \
        && grep linux_amd64 app.sha | sha256sum -sc \
        && echo "We only get here if sha256sum succeeded ..."
```


### Verify các artifacts đã download (II)

Nếu không có lựa chọn nào tốt hơn, bạn **NÊN** sử dụng HASH từ một nguồn tin cậy (ví dụ như đặt trực tiếp trong Dockerfile)

```
     # ...
	ENV VAULT_SHA256=f81accce15313881b8d53b039daf090398b2204b1154f821a863438ca2e5d570
     # ...
    RUN curl -sL https://releases.hashicorp.com/vault/0.5.0/vault_0.5.0_linux_amd64.zip > /tmp/my_file \
        && echo "${VAULT_SHA256}  /tmp/my_file" | sha256sum -sc  \
        && echo "We only get here if sha256sum succeeded ..."
```

## Hạn chế các tiến trình với quyền "root" trong container

Một tiến trình bên trong container không nên chạy với quyền root (với uid "0") để giảm thiểu rủi ro khi chạy - đặc biệt là với các volume (root-owned ?) từ host. Ngay cả Docker Engine > 1.10 (với các tính năng bảo mật mới được kích hoạt) cũng là một rủi ro cần tránh.

Nếu có thể, hãy sử dụng một user riêng biệt để chạy các tiến trình bên trong Dockerfile.

```
host$ cat dockerfile
FROM ubuntu

# Installing as almighty "root"
RUN ...
COPY ...

# now switching to harmless "guest" runtime user
USER guest

ENTRYPOINT ["/my_entrypoint.sh"]
CMD ["/my_command.sh"]
```

> Một số tiến trình - như Apache hoặc Nginx - phải được khởi động với quyền root,
nhưng thiết lập để chuyển sang một user runtime khác sẽ ít rủi ro hơn.

## Chỉ EXPOSE những cổng cần thiết

Trong Dockerfile, chỉ nên `EXPOSE` những cổng cần thiết ra bên ngoài container. Nếu một tiến trình cung cấp API qua cổng 80 VÀ 443, nhưng lại không cần tới cổng 80, thì điều này nên được phản ánh trong Dockerfile:

```
 #
ADD ...

 # Disabled
 # EXPOSE 80

 #
EXPOSE 443
```

## Ghi Log/Error ra Stdout/Stderr

Docker Daemon (trình quản lý Docker) lưu hoặc chuyển tiếp dữ liệu (chuỗi văn bản) được ghi ra stdout hoặc stderr bởi tiến trình bên trong container. Container nên sử dụng chức năng này, nếu có thể, để hỗ trợ một phương thức quản lý log chuẩn chỉnh.

Stdout nên chứa những thông tin thông thường về hoạt động của các tiến trình, trong khi stderr nên được giới hạn với những thông báo về lỗi kỹ thuật hoặc cảnh báo mà người vận hành hoặc quản trị viên phải chú ý.

Những nội dung trong log nên được chuẩn hoá (ví dụ như định dạng json) để tránh việc phải phân tích nhiều bước trong quá trình xử lý sau này.

Đương nhiên, ứng dụng có thể sử dụng các phương tiện khác (bổ sung) để chuyển tiếp log nhưng việc ghi log ra stdout/stderr là một cách tiếp cận tức thời nhất.

## Sử dụng Exec thay vì Shell

Nên viết các câu lệnh [CMD](https://docs.docker.com/engine/reference/builder/#cmd) và [ENTRYPOINT](https://docs.docker.com/engine/reference/builder/#entrypoint) bằng cách sử dụng Exec-form.

Sử dụng shell form sẽ kích hoạt tới `/bin/sh -c` với câu lệnh và tham số đã chỉ định.

Hệ quả, khi sử dụng lệnh `docker stop` hoặc `docker kill`, tín hiệu POSIX chỉ được gửi tới tiến trình bên trong container chạy với PID 1, và nếu tiến trình đó là `/bin/sh` thì thay vì tiến trình gốc đã khởi tạo và `/bin/sh` không chuyển tiếp tín hiệu tới bất kỳ tiến trình con nào, chúng ta sẽ không thể [dừng tiến trình đúng cách](https://web.archive.org/web/20220905230623/https://www.ctl.io/developers/blog/post/gracefully-stopping-docker-containers/).

## Một tiến trình/dịch vụ trên mỗi container

Một Dockerfile chỉ nên cài đặt các phần mềm cho một service duy nhất.

Một service có thể là một tiến trình như web server hoặc database server.

```
FROM ubuntu:14.04.1
CMD [ "/opt/myservice/myprogram" ]
```

Lý do cho việc này là STREAMS (Stdin/Stdout/Stderr) và SIGNAL giữa Docker Engine và
các tiến trình chạy trong Docker Container. Khi không được xây dựng/xử lý
cẩn thận, một số vấn đề tương tự như "unix process zombies" có thể nảy sinh ...

Việc chạy nhiều service cùng lúc đòi hỏi việc cài đặt và khởi động ứng dụng phải theo "đúng cách"

> Có những giải pháp để xử lý "đúng cách" nhiều tiến trình trong một container như [Việc sử dụng Supervisor bên trong Docker](https://docs.docker.com/engine/admin/using_supervisord/)

## Một Dockerfile cho mỗi Source Repository

Khi có nhiều Dockerfile trong một repository, việc theo dõi các thay đổi và xây dựng Dockerimage sẽ trở nên phức tạp.

Đối với các tool CI/CD, autobuilds \(gocd, jenkins, ...\), việc theo dõi các thay đổi của một repository cho **một** Dockerimage và các phần mềm liên quan là rất quan trọng.

## Sử dụng chế độ `interactive` để kiểm tra các câu lệnh

Ví dụ, có thể viết Dockerfile như sau

```
$ cat Dockerfile
FROM ubuntu:14.04
RUN curl -sL https://github.com/hlgr360/docker-templates/archive/master.zip \
  -o /tmp/master.zip
```

và sau đó kiểm tra nó ...

```
$ docker build .
Sending build context to Docker daemon 2.048 kB
Step 1 : FROM ubuntu:14.04
 ---> 14b59d36bae0
Step 2 : RUN curl -sL https://github.com/hlgr360/docker-templates/archive/master.zip   -o /tmp/master.zip
 ---> Running in 5c9deb4eb14a
/bin/sh: 1: curl: not found
The command '/bin/sh -c curl -sL https://github.com/hlgr360/docker-templates/archive/master.zip   -o /tmp/master.zip' returned a non-zero code: 127
```

chỉnh sửa Dockerfile, kiểm tra lại ...

Lặp lại các bước trên sẽ tốn thời gian.

Việc sử dụng chế độ `interactive` sẽ giúp dễ dàng kiểm tra các câu lệnh và kiểm tra xem chúng có hoạt động hay không, trước khi build, giảm thời gian xây dựng Dockerfile.
```
docker run -it [image] [command-or-shell]
```

```
$ docker run -it ubuntu:14.04 /bin/bash
root@10f5608e9db3:/# curl -sL  https://github.com/hlgr360/docker-templates/archive/master.zip   -o /tmp/master.zip
bash: curl: command not found
root@10f5608e9db3:/# apt-get update && apt-get install -y curl
Ign http://archive.ubuntu.com trusty InRelease
Get:1 http://archive.ubuntu.com trusty-updates InRelease [65.9 kB]
[...]
Setting up curl (7.35.0-1ubuntu2.6) ...
Processing triggers for libc-bin (2.19-0ubuntu6.7) ...
Processing triggers for ca-certificates (20160104ubuntu0.14.04.1) ...
Updating certificates in /etc/ssl/certs... 173 added, 0 removed; done.
Running hooks in /etc/ca-certificates/update.d....done.
root@10f5608e9db3:/# curl -sL  https://github.com/hlgr360/docker-templates/archive/master.zip   -o /tmp/master.zip
root@10f5608e9db3:/#
```

## Giảm số lượng layer

Hầu hết các câu lệnh trong Dockerfile tạo ra các layer bổ sung cho Dockerimage trong quá trình chạy `docker build`. Nếu nối các câu lệnh đó, image có thể được tối ưu hóa lại:

Thay vì

```
FROM debian:wheezy
WORKDIR /tmp

ENV TEST1 1
ENV TEST2 2

RUN wget -nv
RUN tar -xvf someutility-v1.0.0.tar.gz
RUN mv /tmp/someutility-v1.0.0/someutil /usr/bin/someutil
RUN rm -rf /tmp/someutility-v1.0.0
RUN rm /tmp/someutility-v1.0.0.tar.gz
```

Nên nối lại các câu lệnh

```
FROM debian:wheezy
WORKDIR /tmp

ENV TEST1=1 \
    TEST2=2

RUN wget -nv && tar -xvf someutility-v1.0.0.tar.gz
  && mv /tmp/someutility-v1.0.0/someutil /usr/bin/someutil
  && rm -rf /tmp/someutility-v1.0.0
  && rm /tmp/someutility-v1.0.0.tar.gz
```

Kết quả là image có ít layer hơn và do đó chiếm ít không gian lưu trữ hơn so với ví dụ đầu tiên.

## Ưu tiên cài đặt các phần mềm trước

Các câu lệnh chạy lâu dài nên được đặt trước, để cache build có thể hiệu quả.

Ví dụ sau là chưa ổn - vì bất kỳ thay đổi nào trong các tệp trong thư mục `./root` sẽ xoá bỏ cache build và kích hoạt lại câu lệnh `apk --update...`.

```
# Add changed files from context
ADD root /

# Update package information, install packages and clear package cache
RUN apk --update add curl ca-certificates gnupg jq \
&& rm -rf /var/cache/apk/* 
```

Cải thiện hơn như sau - vì khả năng cao, kết quả cache của `apk --update...` sẽ không thay đổi trong thời gian sắp tới. Thay đổi trong các tệp trong thư mục `./root` chỉ dẫn đến một layer mới cho các tệp tin đã thay đổi.

```
# Update package information, install packages and clear package cache
RUN apk --update add curl ca-certificates gnupg jq \
&& rm -rf /var/cache/apk/* 

# Add changed files from context
ADD root /
```

## Đừng sử dụng ADD với URL

Ví dụ câu lệnh sau đã vô hiệu hóa cache của các câu lệnh Docker tiếp theo.

```
ADD https://.../filename /tmp/filename
# not using cache anymore :-(
```

Tốt hơn hãy sử dụng curl hoặc wget (bất kể phần mềm nào có sẵn)

```
RUN curl -L https://.../filename > /tmp/filename
# caching still in effect :-)
```

## Thêm \(nhiều\) tệp tin thông qua thư mục có cấu trúc

Thông thường, sẽ thêm các tệp tin bằng câu lệnh ADD như sau

```
ADD file1.txt /some/path1/file1.txt
ADD file2.txt /some/path2/
ADD file3.txt /some/other/path3/
```

Cùng kết quả có thể đạt được (dễ dàng hơn) bằng cách sử dụng một cấu trúc thư mục con có sẵn trong build-context. Ví dụ về danh sách tệp

```
host$ find .
.
./root
./root/etc
./root/etc/vault
./root/etc/vault/vault.json
./root/entrypoint.sh
./Dockerfile
host$ cat Dockerfile
FROM ubuntu
# Add all files from a directory structure
ADD root /
# The image now contains /etc/vault/vault.json AND /entrypoint.sh
```

## Thiết lập quyền truy cập cho tệp tin bên ngoài Dockerfile đúng cách

Làm như sau là không tốt, vì nó tốn thời gian và tạo ra một layer mới:

```
host$ cat Dockerfile
FROM ubuntu
# creates one layer
ADD entrypoint.sh /
# creates another layer
RUN chmod +x /entrypoint.sh
```

Như này thì ổn hơn:

```
host$ chmod +x entrypoint.sh
host$ cat Dockerfile
FROM ubuntu
# creates one layer and preserves the (already set) execution flag
ADD entrypoint.sh /
```

## Entrypoint vs CMD {#entrypoint-vs-cmd}

Nên sử dụng Entrypoint để chỉ định chương trình mặc định sẽ được gọi khi container được khởi động và các đối số mặc định mà có khả năng dễ bị thay đổi nên được cung cấp thông qua CMD.

Có thể tìm hiểu sâu hơn [ở đây](https://web.archive.org/web/20220318023927/https://www.ctl.io/developers/blog/post/dockerfile-entrypoint-vs-cmd/)