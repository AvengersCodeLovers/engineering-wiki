---
sidebar_position: 2
---

# Các nguyên tắc cơ bản trong kiểm thử hiệu suất

Trong phần này, chúng ta đề cập đến một nhiệm vụ cơ bản mà ngay cả các công ty thực hiện performance testing cũng thường né tránh: **xác định yêu cầu hiệu suất.** Đó cũng là vấn đề mà team [Performance Testing](https://avengers.sun-asterisk.vn/team/performance-test) thường hay gặp phải trong các dự án cần Performance Testing

Ý tưởng về một phương pháp tiếp cận chính thức đối với **application performance testing** vẫn còn mới mẻ đối với nhiều người. Điều này thật khó hiểu, vì giống như bất kỳ dự án nào, nếu không lập kế hoạch đúng cách, sẽ dẫn đến những hiểu lầm và vấn đề. **Performance testing** không phải là ngoại lệ. Với suy nghĩ này, có một nguyên tắc quan trọng ở đây:

[**Performance awareness**](./why_performance_test.md) nên được tích hợp vào vòng đời ứng dụng càng sớm càng tốt. Nói cách khác, nếu bạn không bắt đầu lập kế hoạch với hiệu suất trong tâm trí, thì bạn tự đặt mình vào rủi ro đáng kể rằng ứng dụng của bạn sẽ không bao giờ đạt được hiệu suất như mong đợi.

## Sự khởi đầu cho dự án
Với bất kỳ dự án mới nào, chúng ta nên đặt ra những câu hỏi sau:

- Có bao nhiêu người dùng cuối mà ứng dụng cần hỗ trợ khi ra mắt? Sau 6 tháng, 12 tháng, 2 năm?
- Những người dùng này sẽ ở đâu và họ sẽ kết nối với ứng dụng như thế nào?
- Có bao nhiêu người dùng sẽ đồng thời tại thời điểm ra mắt? Sau 6 tháng, 12 tháng, 2 năm?

Câu trả lời sau đó sẽ dẫn đến các câu hỏi khác, chẳng hạn như:

- Tôi cần bao nhiêu máy chủ và cấu hình như thế nào cho mỗi tầng của ứng dụng?
- Tôi cần cung cấp loại cơ sở hạ tầng mạng nào?

Chúng ta có thể không thể trả lời ngay lập tức, nhưng điều quan trọng là chúng ta đã bắt đầu suy nghĩ sớm về hai yếu tố quan trọng: **capacity** và **performance**.

Chúng ta sẽ cần giải quyết nhiều yếu tố trước khi có thể triển khai một chiến lược performance testing hiệu quả. Tất nhiên, performance testing không chỉ đơn giản là tạo ra tải và quan sát những gì xảy ra. Theo kinh nghiệm của tôi, những yêu cầu quan trọng nhất bao gồm:

- **Lựa chọn công cụ** performance testing phù hợp
- **Thiết kế môi trường** performance test thích hợp
- Đặt ra các **mục tiêu hiệu suất** thực tế và **phù hợp**
- Đảm bảo ứng dụng của bạn **đủ ổn định** để thực hiện performance testing
- **Đóng băng** mã nguồn (source code freeze)
- Xác định và **lập kịch bản** cho các **giao dịch quan trọng**
- Cung cấp đủ **dữ liệu thử nghiệm**
- Đảm bảo **thiết kế** performance test chính xác
- Phân bổ đủ **thời gian** để performance test hiệu quả

## Lựa chọn công cụ

Testing Tool Architecture

Các công cụ automated performance test thường có các thành phần sau, phạm vi nội dung này mình sẽ đề cập tới 2 công cụ mình thấy nhiều người sử dụng nhất là [Jmeter](https://jmeter.apache.org/) và [K6](https://k6.io/):

- **Scripting module**:
    - **JMeter**: JMeter cung cấp một giao diện đồ họa cho phép người dùng ghi lại hoạt động của người dùng cuối, như các yêu cầu HTTP, và hỗ trợ nhiều giao thức middleware khác nhau. Sau khi ghi lại, các script có thể được chỉnh sửa để liên kết với dữ liệu từ cơ sở dữ liệu hoặc các nguồn bên ngoài khác, và bạn cũng có thể điều chỉnh độ chi tiết của việc đo response-time.
    - **k6**: Với k6, bạn viết các script kiểm tra hiệu suất bằng ngôn ngữ JavaScript. k6 không có giao diện đồ họa để ghi lại hành động, nhưng nó cho phép bạn viết các script rất linh hoạt và mạnh mẽ, hỗ trợ nhiều giao thức và API.

- **Test management module**:
    - **JMeter**: Cho phép tạo và quản lý các phiên kiểm tra tải hoặc kịch bản phức tạp với nhiều người dùng đồng thời. Bạn có thể cấu hình và quản lý các phiên kiểm tra từ giao diện đồ họa, và dễ dàng điều chỉnh cấu hình để chạy các thử nghiệm với nhiều loại tải khác nhau.
    - **k6**: k6 hỗ trợ việc tạo và quản lý các phiên kiểm tra tải thông qua các file cấu hình và command-line. Bạn có thể sử dụng các script để mô phỏng các tình huống sử dụng khác nhau và chạy chúng đồng thời.

- **Load injector(s)**:
    - **JMeter**: Sử dụng nhiều workstation hoặc server để tạo tải, đặc biệt là khi thực hiện các bài kiểm tra quy mô lớn. JMeter cho phép phân tán các phiên kiểm tra qua nhiều máy chủ để tạo ra tải lớn hơn.
    - **k6**: k6 cũng có thể sử dụng nhiều máy chủ để tạo tải, và hỗ trợ việc phân tán kiểm tra qua nhiều máy nhằm đảm bảo tải đủ lớn cho các bài kiểm tra quy mô lớn.

- **Analysis module**:
    - **JMeter**: Cung cấp khả năng phân tích dữ liệu kiểm tra qua các báo cáo tự động, biểu đồ và bảng. Bạn có thể dễ dàng thấy các kết quả, biểu đồ phản hồi, và thậm chí tạo ra các báo cáo chi tiết về hiệu suất.
    - **k6**: k6 cung cấp các báo cáo kiểm tra trực tiếp trên terminal và cũng có thể xuất dữ liệu sang các hệ thống giám sát khác như Grafana. Tính năng "premium" của k6 có thể được tùy chỉnh để thực hiện phân tích tự động và nêu bật các khu vực cần chú ý.

## Thiết kế môi trường kiểm thử

Khi thiết kế **performance test environment**, lý tưởng nhất là nó sẽ là một bản sao chính xác của **deployment environment**, nhưng điều này hiếm khi xảy ra vì nhiều lý do.

- **Number and specification of servers**: Do chi phí và độ phức tạp, thường không khả thi để sao chép chính xác nội dung và kiến trúc của máy chủ trong môi trường triển khai.

- **Bandwidth and connectivity of network infrastructure**: Vị trí có thể là một vấn đề, cần đảm bảo vị trí máy chủ giữa môi trường test performance và production.

- **Number of application tiers**: Số lượng application tiers thường có tác động lớn hơn đến tính hợp lệ của performance testing so với chỉ số lượng máy chủ. Vì vậy, đảm bảo application tiers performance environment càng giống với production càng tốt.

- **Sizing of application databases**: Kích thước của cơ sở dữ liệu trong test environment nên gần như tương đương với cơ sở dữ liệu trên production. Nếu không, sự khác biệt sẽ ảnh hưởng đáng kể đến tính hợp lệ của kết quả performance test.


**Tóm tắt, có ba mức độ ưu tiên khi thiết kế một test environment:**

    - **An exact or very close copy of the live environment**: Đây là lý tưởng nhất nhưng thường khó đạt được vì các lý do thực tế và thương mại.

    - A subset of the live environment with fewer servers but specification and tier-deployment matches: Đây là lựa chọn khả thi nhất, miễn là cấu hình máy chủ ở mỗi tầng khớp với live environment. Điều này cho phép đánh giá chính xác giới hạn capacity của từng máy chủ.

    - A subset of the live environment with fewer servers of lower specification: Đây là tình huống phổ biến nhất; test environment đủ để triển khai ứng dụng nhưng số lượng, triển khai tầng, và cấu hình máy chủ khác biệt đáng kể so với live environment.


## Performance Environment Checklist

Dưới đây là checklist giúp dự án xác định mức độ tương đồng giữa test environment và production environment. Từ mô hình triển khai ứng dụng, thu thập các thông tin sau đây cho mỗi tầng máy chủ. Điều này bao gồm các thiết bị black-box như load balancers và content servers nếu có.

* **Number of servers**: Số lượng máy chủ vật lý hoặc ảo cho tầng này.
* **Load balancing strategy**: Loại cơ chế cân bằng tải đang sử dụng (nếu có liên quan).
* **Hardware inventory**: Số lượng và loại CPU, dung lượng RAM, số lượng và loại NIC (Network Interface Cards).
* **Software inventory**: Danh sách phần mềm tiêu chuẩn cài đặt, ngoại trừ các thành phần của ứng dụng sẽ được kiểm tra hiệu suất.
* **Application component inventory**: Mô tả các thành phần của ứng dụng sẽ được triển khai trên tầng máy chủ này.
* **External Service**: Bất kỳ service nào đến các hệ thống nội bộ khác hoặc bên thứ ba. Những service này thường khó sử dụng trong test environment và thường bị bỏ qua hoặc thay thế bằng một mô phỏng nào đó. Tối thiểu, dự án nên cung cấp chức năng mô phỏng hành vi mong đợi của function sử dụng 3rd.

## Key Performance Targets

Khi nói về các mục tiêu hiệu suất, có ba mục tiêu chính áp dụng cho bất kỳ performance test nào, dựa trên các service-oriented performance indicators:

1. **Availability** or **Uptime**:

    - Ứng dụng phải luôn sẵn sàng cho người dùng cuối, ngoại trừ các khoảng thời gian bảo trì đã được lên kế hoạch. Ứng dụng không được phép gặp lỗi trong khi đạt đến mức **concurrency** hoặc **throughput** mục tiêu.
    - Kiểm tra tính sẵn sàng thực sự là một vấn đề phức tạp. Việc ping thành công máy chủ không nhất thiết có nghĩa là ứng dụng đang hoạt động. Tương tự, chỉ vì có thể kết nối với máy chủ web không có nghĩa là trang chủ của ứng dụng có sẵn. Ứng dụng có thể hoạt động tốt với tải nhẹ nhưng có thể gặp sự cố hoặc trả về lỗi khi tải tăng lên, điều này cho thấy ứng dụng thiếu khả năng chịu tải.

2. **Concurrency**, **Scalability**, and **Throughput**:

    - **Concurrency** là mục tiêu hiệu suất thường bị hiểu sai. Nhiều khi, khách hàng đưa ra số lượng người dùng đồng thời mà ứng dụng phải hỗ trợ mà không xem xét đầy đủ về yêu cầu thực tế.
    - Theo Scott Barber trong bài báo [“Get performance requirements right: Think like a user,”](http://www.perftestplus.com/resources/requirements_with_compuware.pdf) tính toán **concurrency** dựa trên số liệu theo giờ là cách thực tế hơn. **Concurrency** từ góc độ của công cụ **performance testing** là số lượng người dùng ảo hoạt động mà phần mềm tạo ra, điều này không nhất thiết tương đương với số lượng người dùng thực sự đang truy cập ứng dụng.
    - **Throughput** đôi khi quan trọng hơn **concurrency**, đặc biệt đối với các ứng dụng "stateless," nơi số lượng người dùng đồng thời ít quan trọng hơn số lượng truy cập hoặc "hits" trong một khoảng thời gian nhất định.

3. **Network Utilization** and **Server Utilization**:

    - Đây là những chỉ số đo lường mức độ sử dụng của tài nguyên mạng và máy chủ trong quá trình performance testing. Chúng là các thước đo quan trọng không chỉ về khả năng chịu tải mà còn về hiệu suất tổng thể của ứng dụng. Việc hiểu rõ network utilization và server utilization giúp bạn xác định được các điểm nghẽn và tối ưu hóa tài nguyên hệ thống.

> **Tip**: Một nguyên tắc hữu ích là **thêm 10%** vào mục tiêu **concurrency** hoặc **throughput** mà bạn dự đoán cho thời điểm triển khai, để đảm bảo rằng bạn đang kiểm tra vượt quá các yêu cầu dự đoán.


## Đảm bảo ứng dụng is stable enough for Performance Testing

Sau khi đã thiết lập **test environment** và đặt ra các **mục tiêu hiệu suất**, chúng ta cần đảm bảo rằng ứng dụng của mình đủ ổn định để thực hiện performance testing. Điều này có vẻ hiển nhiên, nhưng thường performance testing biến thành một bài tập sửa lỗi đầy khó khăn, làm giảm nhanh chóng thời gian dành cho dự án.

**Stability** là sự tự tin rằng ứng dụng hoạt động đúng như mong đợi. Nếu bạn muốn tạo một đơn hàng trong ứng dụng của mình, thì quá trình này phải **thành công mỗi lần**, không phải chỉ **8 trong 10 lần**. Nếu có các vấn đề lớn về chức năng của ứng dụng, thì không nên tiếp tục performance testing vì những vấn đề này sẽ che lấp những vấn đề có thể xuất hiện do tải và áp lực.

**Code Quality** là yếu tố quan trọng hàng đầu cho **good performance**. Chúng ta cần có một chiến lược kiểm thử đơn vị (Unit Testing) và chức năng (Functional Testing) hiệu quả.

Đảm bảo rằng ứng dụng của dự án ổn định trước khi thực hiện performance testing là bước quan trọng để tránh lãng phí thời gian và đảm bảo rằng chúng ta đang đo lường hiệu suất thực tế của hệ thống, không phải là các vấn đề do lỗi chức năng cơ bản.

## Obtaining a Code Freeze

Để performance testing hiệu quả, cần thực hiện trên một phiên bản mã ổn định. Nếu phát hiện lỗi cần sửa mã, hãy đảm bảo rằng mã không thay đổi giữa các chu kỳ thử nghiệm trừ khi cần thiết và được thông báo kịp thời cho đội ngũ kiểm thử. Các kịch bản kiểm thử phụ thuộc vào phiên bản mã, nên bất kỳ thay đổi không mong đợi nào có thể làm vô hiệu hóa hoặc làm sai lệch kết quả kiểm thử, gây ảnh hưởng lớn đến dự án. Code freeze giúp giữ môi trường thử nghiệm ổn định và đảm bảo kết quả chính xác.

## Xác định và viết kịch bản kiểm thử

Cốt lõi của **performance testing** là các **script test**. Ví dụ đơn giản là đăng nhập, tìm kiếm, và đăng xuất khỏi ứng dụng. Chúng ta cần xác định các hoạt động quan trọng mà người dùng thực hiện hàng ngày. Đây sẽ là cơ sở cho tất cả các bài kiểm tra hiệu suất, vì vậy cần xác định chúng một cách chính xác.

### Transaction (Script) Checklist:

- Định nghĩa và tài liệu hóa từng bước thực hiện: Mỗi bước phải được mô tả rõ ràng, bao gồm đầu vào và đầu ra, để tạo kịch bản chính xác và xác định phần nào của giao dịch sẽ được đo lường.
- Xác định yêu cầu đầu vào và phản hồi mong đợi: Xác định thông tin cần nhập và kết quả mong đợi từ mỗi bước, ví dụ như đăng nhập, nhập mật khẩu.
- Xác định loại người dùng: Loại người dùng như giám sát viên, khách hàng, hoặc nhân viên sẽ xác định giao dịch là cao hay thấp về khối lượng.
- Xác định giao dịch là active hay passive: Giao dịch chủ động là các hoạt động người dùng thấy, còn giao dịch thụ động là các hoạt động nền để tạo tải thực tế, ví dụ:
    - Transaction chủ động: Ngươi dùng đăng nhập, tìm kiếm thông tin khách hàng, cập nhật hồ sơ, rồi đăng xuất. Đây là hoạt động mà người dùng thực hiện nhiều bước và tương tác liên tục với hệ thống.
    - Transaction thụ động: Một người dùng đăng nhập vào hệ thống để kiểm tra tin nhắn nhưng không làm gì khác trong 10 phút, sau đó đăng xuất. Trong thời gian đó, người dùng không thực hiện bất kỳ thao tác nào khác ngoài việc duy trì kết nối với hệ thống

##  Test Data Chất Lượng

Khi đã có các **mục tiêu hiệu suất** và **giao dịch cần kiểm tra**, bước tiếp theo là đảm bảo cung cấp đủ **dữ liệu kiểm thử chất lượng**. Chất lượng và số lượng dữ liệu kiểm thử đóng vai trò quyết định đối với thành công của performance testing. Dưới đây là hai loại dữ liệu quan trọng:

1. **Input Data**:
    Đây là dữ liệu nhập vào cho các giao dịch. Ví dụ, thông tin đăng nhập người dùng (ID và mật khẩu) cần được cung cấp đủ để tránh việc nhiều người dùng cùng sử dụng một thông tin đăng nhập, gây ra lỗi và kết quả không chính xác. Ngoài ra, bạn cũng cần chuẩn bị dữ liệu tìm kiếm đa dạng, như tên khách hàng, số hóa đơn, hoặc mã sản phẩm, và có thể bao gồm cả tìm kiếm wildcard để kiểm tra khả năng xử lý của hệ thống.

2. **Target Data**:
    Cơ sở dữ liệu đích cần được điền với lượng dữ liệu thực tế và phù hợp. Nếu cơ sở dữ liệu kiểm thử chỉ có 50 MB trong khi cơ sở dữ liệu thực tế là 50 GB, kết quả kiểm thử có thể không đáng tin cậy. Bạn nên đảm bảo kích thước cơ sở dữ liệu gần đúng với thực tế và thực hiện data rollback sau mỗi lần kiểm thử để đảm bảo tính nhất quán giữa các lần thử nghiệm.

## Performance Test Type Design

Sau khi xác định các **kịch bản chính** và yêu cầu **dữ liệu** của chúng, bước tiếp theo là tạo ra các loại kiểm thử hiệu suất khác nhau. Dưới đây là các loại kiểm thử phổ biến:

1. **Baseline test**:
    Xác định điểm so sánh cho các lần kiểm thử sau, thường để đo thời gian phản hồi giao dịch. Kiểm thử này thường được thực hiện với một giao dịch duy nhất, một người dùng ảo, và không có hoạt động nào khác trên hệ thống. Kết quả sẽ được dùng để so sánh mức độ suy giảm hiệu suất khi số lượng người dùng hoặc tải tăng lên.

2. **Load test**:
    Kiểm thử cổ điển nhằm tải ứng dụng lên mức concurrency mục tiêu để xem liệu ứng dụng có đạt được các mục tiêu hiệu suất như availability, throughput, và response time không. Kiểm thử này mô phỏng việc sử dụng ứng dụng thực tế, bao gồm các tương tác và phản hồi của người dùng.

3. **Stress test**:
    Mục đích của stress test là đẩy ứng dụng hoặc hạ tầng hỗ trợ đến mức **giới hạn**, để xác định điểm mà hệ thống bắt đầu gặp lỗi. Kiểm thử này tiếp tục cho đến khi hệ thống **không thể đăng nhập thêm người dùng**, thời gian phản hồi vượt quá **giới hạn chấp nhận** được, hoặc ứng dụng trở nên **không khả dụng**. Kết quả của stress test giúp xác định **giới hạn capacity của hệ thống**.

4. **Soak or stability test**:
    Dùng để xác định các vấn đề xuất hiện sau một khoảng **thời gian dài**, như rò rỉ bộ nhớ hoặc giới hạn không lường trước trong số lần giao dịch có thể thực hiện. Soak test yêu cầu giám sát máy chủ liên tục để phát hiện các vấn đề này, thường biểu hiện qua việc thời gian phản hồi chậm dần hoặc sự mất khả dụng đột ngột của ứng dụng.

5. **Smoke test**:
    Tập trung vào những gì đã thay đổi. Smoke test performance có thể chỉ bao gồm các giao dịch bị ảnh hưởng bởi sự thay đổi mã.

6. **Isolation test**:
    Dùng để tập trung vào một vấn đề đã được xác định, thường bằng cách lặp lại các giao dịch cụ thể gây ra vấn đề hiệu suất.


> **TIP**: Bạn nên luôn thực hiện baseline, load, và stress test. Soak test và smoke test phụ thuộc vào ứng dụng và thời gian có sẵn, trong khi isolation test được thực hiện dựa trên các vấn đề đã được phát hiện.

## Phân bổ effort cho Performance Test hiệu quả

Để thực hiện performance testing hiệu quả, việc phân bổ đủ thời gian là rất quan trọng. Dưới đây là các yếu tố cần cân nhắc:

1. **Lead time to prepare test environment**:
    Nếu dự án đã có môi trường kiểm thử sẵn sàng, thời gian chuẩn bị sẽ ít. Nếu không, dự án sẽ cần xây dựng từ đầu, bao gồm việc cài đặt và cấu hình phần cứng, ứng dụng.

2. **Lead time to prepare the injection environment**:
    Cần thời gian để chuẩn bị các tài nguyên cho việc tạo tải, server để quản lý và thực hiện load injection (May mắn là ở Sun Asterisk đã có tool [Atlas](https://atlas.sun-asterisk.vn)).

3. **Time to identify and script business transactions**:
    Xác định và kịch bản hóa các trường hợp kinh doanh là cốt lõi của kiểm thử hiệu suất. Quá trình này có thể kéo dài từ vài ngày đến vài tuần, với việc viết kịch bản mất khoảng nửa ngày cho mỗi giao dịch.

4. **Time to identify and create enough test data**:
    Dữ liệu kiểm thử là chìa khóa, nên cần đủ thời gian để chuẩn bị, có thể mất nhiều ngày hoặc tuần. Cũng cần tính thời gian để đặt lại hoặc tạo lại dữ liệu kiểm thử giữa các lần thử nghiệm.

5. **Time to instrument the test environment**:
    Thời gian để cài đặt giám sát môi trường kiểm thử, theo dõi hành vi của các máy chủ và mạng trong quá trình performance test.

6. **Time to prepare and execute performance test runs**:
    Đây thường là phần ngắn nhất trong quá trình kiểm thử hiệu suất, bao gồm việc tạo và thực hiện các bài kiểm thử thực tế.

7. **Time to deal with any problems identified**:
    Dành thời gian để xử lý các vấn đề phát sinh, có thể liên quan đến thay đổi mã và yêu cầu sự tham gia của các nhà phát triển ứng dụng.

> Việc lập kế hoạch thời gian cẩn thận cho từng yếu tố này sẽ giúp đảm bảo quá trình performance testing diễn ra suôn sẻ và đạt được kết quả mong muốn.

## Summary
- Ở trên là toàn bộ những điều chia sẻ làm kim chỉ nam cho 1 dự án chuẩn bị, đã và đang bước vào khâu Performance test, về các nguyên tắc làm sao cho đạt được một kết quả thuận lợi và khoa học.

## What's next?
- Viết script test với công cụ K6 ở các Case Study thực tế

