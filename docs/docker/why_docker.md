---
sidebar_position: 1
---

# Tổng quan

Chắc hẳn bạn đã từng nghe đến Docker, một công cụ mạnh mẽ trong việc đóng gói và triển khai ứng dụng.

Chuỗi bài viết này sẽ giới thiệu tổng quan về Docker và cung cấp các kiến thức cơ bản về cách sử dụng Docker đúng "chuẩn".

Không giống như những chuẩn coding khác như PSR (PHP Standard Recommendation) hay tool RuboCop, không có một chuẩn chính thức nào về cách sử dụng Docker.

Tuy nhiên, có một số nguyên tắc ([best practices](https://docs.docker.com/build/building/best-practices)) mà chúng ta nên tuân thủ khi sử dụng Docker để đảm bảo hiệu suất và bảo mật cho ứng dụng của mình.

Ngoài ra, chuỗi bài viết cũng tham khảo bộ [Docker Style Guide](https://github.com/Haufe-Lexware/docker-style-guide) của công ty Haufe-Lexware GmbH & Co. KG, một bộ quy tắc được thiết kế để giúp các nhà phát triển và quản trị hệ thống sử dụng Docker một cách tối ưu và hiệu quả.

# Tại sao lại cần tới Docker?

Docker là một công cụ mạnh mẽ trong việc đóng gói ứng dụng và triển khai chúng trong môi trường container hóa. Việc sử dụng Docker mang lại nhiều lợi ích đáng kể đối với các nhà phát triển và các nhóm quản lý hạ tầng công nghệ thông tin.

Docker giúp giải quyết các vấn đề phổ biến trong phát triển và triển khai phần mềm như:

1. **Tính đơn nhất và khả di động**: Docker cho phép đóng gói ứng dụng cùng với các phụ thuộc của nó vào một container duy nhất, đảm bảo rằng môi trường phát triển và môi trường sản phẩm giống hệt nhau. Điều này giúp đơn giản hóa quá trình triển khai và tránh được các vấn đề do sự khác biệt giữa môi trường phát triển và môi trường sản phẩm.
2. **Tăng tốc quá trình phát triển và triển khai**: Nhờ vào tính năng đóng gói và chia sẻ ứng dụng trong container, Docker giúp giảm thiểu thời gian và công sức cần thiết cho việc cấu hình và triển khai ứng dụng. Việc tạo ra môi trường phát triển đơn nhất và sử dụng các công cụ như Docker Compose cũng giúp tự động hóa quá trình triển khai và kiểm thử.
3. **Tiết kiệm tài nguyên hệ thống**: Container Docker sử dụng chia sẻ tài nguyên từ hệ điều hành host, cho phép triển khai nhiều ứng dụng trên cùng một máy chủ mà không cần phải cài đặt lại toàn bộ hệ thống điều hành.
4. **Khả năng mở rộng và linh hoạt**: Docker hỗ trợ việc mở rộng các ứng dụng một cách dễ dàng bằng cách sử dụng các container đã được đóng gói sẵn. Điều này giúp các nhóm phát triển và quản lý hạ tầng có thể linh hoạt trong việc thích ứng với sự thay đổi và mở rộng ứng dụng mà không lo ngại về sự phụ thuộc và tương tác giữa các thành phần khác nhau.

Tóm lại, Docker không chỉ giúp đơn giản hóa quá trình phát triển và triển khai ứng dụng mà còn cung cấp các giải pháp hiệu quả cho các vấn đề về môi trường và tài nguyên hệ thống, đồng thời tạo ra một nền tảng mạnh mẽ cho việc phát triển và vận hành các ứng dụng hiện đại.

# Những khái niệm cơ bản - Cơ chế hoạt động của Docker

Docker có một bộ công cụ ngày càng mở rộng mà chúng ta cần phải học cách sử dụng. Một bài giải thích đầy đủ về cách hoạt động của Docker có thể được xem tại đây [Understanding Docker](https://docs.docker.com/engine/understanding-docker/).

Một số công cụ phổ biến mà chúng ta cần phải biết bao gồm:

* [Docker Engine](https://docs.docker.com/engine/understanding-docker#what-is-docker-engine)
* [Docker Compose](https://docs.docker.com/compose/overview/)
* [Docker Machine](https://docs.docker.com/machine/overview/)
* [Docker Registries](https://docs.docker.com/engine/understanding-docker/#docker-registries)

# Best practices and style guides

* [Docker best practices](https://docs.docker.com/build/building/best-practices/)
* [Dockerfile](/docs/docker/docker-file.md)
* [Docker compose](/docs/docker/docker-compose.md)
* [Docker image in production](https://viblo.asia/p/docker-image-in-production-cau-chuyen-1gb-hay-100mb-LzD5dXyE5jY)
* [The Compose Specification](https://github.com/compose-spec/compose-spec/blob/main/spec.md)
