---
sidebar_position: 3
---

# Viết script test với công cụ K6 ở các Case Study thực tế

## Giới Thiệu Chung
<center>![image](https://gist.github.com/user-attachments/assets/304ff367-d9c5-43ba-954f-31c3e34c21d9)</center>

### K6 Là gì và làm gì ?

Sử dụng k6, bạn có thể kiểm tra độ tin cậy và hiệu suất của ứng dụng cũng như cơ sở hạ tầng của mình.

k6 giúp các đội ngũ kỹ thuật ngăn ngừa lỗi và vi phạm SLO, cho phép họ xây dựng các ứng dụng có khả năng chống chịu tốt và hiệu suất cao khi mở rộng.

Các đội ngũ kỹ thuật, bao gồm nhà phát triển (Developers), kỹ sư kiểm thử (QA Engineers), SDET (Software Development Engineers in Test), và SRE (Site Reliability Engineers), thường sử dụng k6 cho các mục đích sau:

- **Kiểm thử tải và hiệu suất:**  
  k6 được tối ưu hóa cho việc tiêu thụ tài nguyên ở mức tối thiểu và được thiết kế để chạy các bài kiểm thử hiệu suất cao như kiểm thử đột biến, kiểm thử căng thẳng, hoặc kiểm thử kéo dài.

- **Kiểm thử hiệu suất trình duyệt:**  
  Thông qua API trình duyệt của k6, bạn có thể chạy các bài kiểm thử hiệu suất dựa trên trình duyệt và thu thập các số liệu liên quan để xác định các vấn đề về hiệu suất liên quan đến trình duyệt. Bạn cũng có thể kết hợp các bài kiểm thử trình duyệt với các kiểm thử hiệu suất khác để có cái nhìn toàn diện về hiệu suất của trang web.

- **Giám sát hiệu suất và giám sát tổng hợp:**  
  Bạn có thể lên lịch để chạy các bài kiểm thử với tải tối thiểu một cách thường xuyên, liên tục xác thực hiệu suất và khả năng sẵn sàng của môi trường sản xuất. Để làm điều này, bạn cũng có thể sử dụng Grafana Cloud Synthetic Monitoring, hỗ trợ việc chạy các script k6.

- **Tự động hóa kiểm thử hiệu suất:**  
  k6 tích hợp liền mạch với các công cụ CI/CD và tự động hóa, cho phép các đội ngũ kỹ thuật tự động hóa kiểm thử hiệu suất như một phần của chu kỳ phát triển và phát hành.

- **Kiểm thử hỗn loạn và khả năng chịu lỗi:**  
  Bạn có thể sử dụng k6 để mô phỏng lưu lượng truy cập như một phần của các thử nghiệm hỗn loạn, kích hoạt chúng từ các bài kiểm thử k6 hoặc chèn các loại lỗi khác nhau vào Kubernetes với xk6-disruptor.

- **Kiểm thử cơ sở hạ tầng:**  
  Với các phần mở rộng của k6, bạn có thể thêm hỗ trợ cho k6 đối với các giao thức mới hoặc sử dụng một client cụ thể để kiểm thử trực tiếp các hệ thống riêng lẻ trong cơ sở hạ tầng của mình.




### Mối quan hệ giữa Sun * Atlas và K6 

Như được mô tả ở [Guideline Atlas](https://docs.google.com/document/d/1Tua943igvVk-DwnVshRRafWiCXSzR0v9NYQKky8TjNY/edit)

-   Atlas là một hệ thống cho phép người dùng tiến hành kiểm tra hiệu suất cho các hệ thống/dịch vụ bằng cách tạo các kịch bản kiểm tra linh hoạt thông qua **giao diện người dùng trực quan**.
-   Atlas sử dụng OSS được gọi là **K6** trong nền để thực hiện kiểm tra. Bạn có thể xem tài liệu K6 để biết thêm thông tin về bài kiểm tra tập lệnh.

Về bản chất Atlas sẽ đóng vai trò giao diện người dùng tiện lợi cho đội ngũ non-tech sử dụng, phía sau đó về phần lên kịch bản cũng như tiến hành chạy thử nghiệm thì Atlas đang sử dụng OpenSource là K6, về guideline sử dụng Atlas ở trên cũng đã đề cập tới nên phạm vi của chủ đề này mình sẽ đi vào việc lên kịch bản bằng k6 cũng sẽ phần nào đáp ứng được việc sử dụng Atlas vì Atlas có support Script Editor

## Cấu Hình Chạy K6
### Yêu cầu về phần cứng

-   K6 có thể tạo ra rất nhiều tải từ một máy duy nhất. Với giám sát và tối ưu hóa tập lệnh phù hợp, bạn có thể chạy một bài kiểm tra tải khá lớn mà không cần thực thi phân tán 
-   Tối đa hóa tải trọng mà máy tạo ra là một quá trình đa chiều, bao gồm:
    - Thay đổi cài đặt hệ điều hành để tăng giới hạn mạng và người dùng mặc định.
    - Theo dõi tài nguyên của máy chạy test để đảm bảo đủ tải.
    - Thiết kế các bài kiểm tra hiệu quả, chú ý đến kịch bản, tùy chọn k6 và các file uploads nếu có.
    - Theo dõi quá trình chạy thử để phát hiện lỗi được k6 ghi lại, lỗi này có thể chỉ ra những hạn chế của máy chạy test hoặc hệ thống đang được test (SystemUnderTest).
-   Một phiên bản k6 đơn lẻ có thể chạy 30.000-40.000 người dùng đồng thời (VU). Trong một số trường hợp, số lượng VU này có thể tạo ra tới 300.000 yêu cầu HTTP mỗi giây (RPS). Một process K6 có thể tận dụng tốt tất cả các CPU Core trên instance

#### OS fine-tuning
-   Các hệ điều hành hiện đại được cấu hình với giới hạn khá thấp về số lượng kết nối mạng đồng thời mà một ứng dụng có thể tạo. Đây là mặc định an toàn vì hầu hết các chương trình không cần mở hàng nghìn kết nối TCP đồng thời như k6. Tuy nhiên, nếu chúng ta muốn sử dụng toàn bộ dung lượng mạng và đạt hiệu suất tối đa, chúng ta cần thay đổi một số cài đặt mặc định này.

Trên hệ điều hành GNU/Linux, hãy chạy các lệnh sau với tư cách `root` user:
```bash
sysctl -w net.ipv4.ip_local_port_range="1024 65535"
sysctl -w net.ipv4.tcp_tw_reuse=1
sysctl -w net.ipv4.tcp_timestamps=1
ulimit -n 250000
```

Các lệnh này cho phép tái sử dụng các kết nối mạng, tăng giới hạn kết nối mạng và phạm vi của các cổng cục bộ.

Các lệnh `sysctl` áp dụng ngay lập tức cho toàn bộ hệ thống và sẽ đặt lại về giá trị mặc định nếu bạn khởi động lại dịch vụ mạng hoặc khởi động lại máy. Lệnh `ulimit` chỉ áp dụng cho phiên shell hiện tại và bạn sẽ cần chạy lại để lệnh được đặt trong một phiên shell khác.

#### Network
Thông lượng mạng của máy là một cân nhắc quan trọng khi chạy các thử nghiệm lớn. Nhiều máy AWS EC2 có kết nối 1Gbit/giây, điều này có thể hạn chế tải mà k6 có thể tạo ra.

Khi chạy thử nghiệm, hãy sử dụng một công cụ như `iftop` trong terminal để xem lượng lưu lượng mạng được tạo ra theo thời gian thực. Nếu lưu lượng không đổi ở mức 1Gbit/giây, thử nghiệm của bạn có thể bị giới hạn bởi card mạng.

#### CPU
k6 có khả năng đa luồng mạnh mẽ và có thể sử dụng hiệu quả tất cả các lõi CPU có sẵn.
Tuy nhiên chúng ta cũng cần theo dõi tài nguyên của máy chạy k6 cho các trường hợp tải lớn, recommend ở đây là k6 chỉ nên chạy tối đa ở **ngưỡng 80% CPU và 20% CPU nhàn rỗi**, trường hợp chạy tới 100% CPU có thể ảnh hưởng tới kết quả của performance

### Cài đặt K6

K6 hỗ trợ nhiều hệ điều hành khác nhau có thể cài đặt theo các hướng dẫn dưới đây
hoặc tham khảo trang chủ: [https://k6.io/docs/get-started/installation/](https://k6.io/docs/get-started/installation/)

#### Linux
```bash
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

#### MacOS
```bash
brew install k6
```

#### Windows
```bash
choco install k6
```
or
```bash
winget install k6 --source winget
```

## Các câu lệnh chính trong K6

### Cấu Trúc Cơ Bản Của Script K6
Để làm quen có thể chạy lệnh sau k6 sẽ generate ra 1 sample script
```bash
k6 new
```
```jsx title="script.js"
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 10,
  // A string specifying the total duration of the test run.
  duration: '30s',
  // Uncomment this section to enable the use of Browser API in your tests.
  //
  // See https://grafana.com/docs/k6/latest/using-k6-browser/running-browser-tests/ to learn more
  // about using Browser API in your test scripts.
  //
  // scenarios: {
  //   // The scenario name appears in the result summary, tags, and so on.
  //   // You can give the scenario any name, as long as each name in the script is unique.
  //   ui: {
  //     // Executor is a mandatory parameter for browser-based tests.
  //     // Shared iterations in this case tells k6 to reuse VUs to execute iterations.
  //     //
  //     // See https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/ for other executor types.
  //     executor: 'shared-iterations',
  //     options: {
  //       browser: {
  //         // This is a mandatory parameter that instructs k6 to launch and
  //         // connect to a chromium-based browser, and use it to run UI-based
  //         // tests.
  //         type: 'chromium',
  //       },
  //     },
  //   },
  // }
};

// The function that defines VU logic.
//
// See https://grafana.com/docs/k6/latest/examples/get-started-with-k6/ to learn more
// about authoring k6 scripts.
//
export default function() {
  http.get('https://test.k6.io');
  sleep(1);
}
```

Một script K6 cơ bản thường được chia thành bốn phần chính: `init code`, `setup code`, `VU code`, và `teardown code`. Mỗi phần có một vai trò cụ thể trong quá trình chạy kiểm thử hiệu suất.

```jsx title="The four lifecycle stages"
// 1. init code

export function setup() {
  // 2. setup code
}

export default function (data) {
  // 3. VU code
}

export function teardown(data) {
  // 4. teardown code
}
```

| Test stage  | Mục đích                                                       | Ví dụ                                                            | Called                                                       |
|-------------|---------------------------------------------------------------|--------------------------------------------------------------------|--------------------------------------------------------------|
| 1. init     | Load local files, import modules, declare lifecycle functions | Open JSON file, Import module                                      | Once per VU*                                                 |
| 2. Setup    | Set up data for processing, share data among VUs              | Call API to start test environment                                 | Once                                                         |
| 3. VU code  | Run the test function, usually default                        | Make https requests, validate responses                            | Once per iteration, as many times as the test options require |
| 4. Teardown | Process result of setup code, stop test environment           | Validate that setup had a certain result, send webhook notifying that test has finished | Once **                                                      |

> Có một lưu ý là nếu `setup` bị lỗi ( ném ra ngoại lệ ) thì `teardown` sẽ không được gọi vì thế chúng ta cần xử lý lỗi hết sức có thể khi `setup`

> Tất cả các đoạn code nằm ngoài lifecycle thì đều được coi là `init` chúng sẽ luôn được thực thi đầu tiên

```jsx title="Example of init context"
// init context: importing modules
import http from 'k6/http';
import { Trend } from 'k6/metrics';

// init context: define k6 options
export const options = {
  vus: 10,
  duration: '30s',
};

// init context: global variables
const customTrend = new Trend('oneCustomMetric');

// init context: define custom function
function myCustomFunction() {
  // ...
}
```
### Setup and teardown stages

Bạn có thể gọi API k6 trong giai đoạn `setup` và `teardown`, không giống như giai đoạn `init`. Ví dụ, bạn có thể thực hiện các yêu cầu HTTP:

```jsx title="script.js"
// K6 Modules ref: https://k6.io/docs/using-k6/modules/
import http from 'k6/http';

export function setup() {
  const res = http.get('https://httpbin.test.k6.io/get');
  return { data: res.json() };
}

export function teardown(data) {
  console.log(JSON.stringify(data));
}

export default function (data) {
  console.log(JSON.stringify(data));
}

```
Bạn có thể đã nhận thấy các tham số hàm của `default()` Và `teardown()` lấy một đối số, được gọi ở ví dụ trên là `data`.
Có một số hạn chế sau 

- Bạn chỉ có thể truyền dữ liệu (tức là JSON) giữa `setup` các giai đoạn khác. Bạn không thể truyền vào các function.
- Nếu dữ liệu được trả về bởi `setup()` lớn sẽ tốn nhiều bộ nhớ hơn.
- Bạn không thể thao tác dữ liệu trong `default()`, sau đó chuyển nó cho `teardown()`.

<center>![image](https://gist.github.com/user-attachments/assets/4812d42a-9e69-4ce4-b6c7-ea3518706461)</center>

### Modules

Việc viết script k6 có thể sử dụng nhiều modules khác nhau, trong k6 có 3 kiểu import modules như sau :
-   Built-in modules
-   Local filesystem modules
-   Remote HTTP(S) modules

#### Built-in modules

K6 có tích hợp nhiều loại module khác nhau, thường thấy nhất là `http`, để đọc về tài liệu API của module có thể tham khảo tại đây
[https://k6.io/docs/javascript-api/](https://k6.io/docs/javascript-api/)
```jsx
import http from 'k6/http';
```

#### Local filesystem modules
Các module này được lưu trữ trên hệ thống tệp cục bộ và được truy cập thông qua đường dẫn hệ thống tệp tương đối hoặc tuyệt đối
```jsx title="helper.js"
export function someHelper() {
  // ...
}
```
```jsx title="mytest.js"
import { someHelper } from './helpers.js';

export default function () {
  someHelper();
}
```

#### Remote HTTP(S) modules
Các module này được truy cập qua HTTP(S), từ một nguồn như [k6 JSLib](https://k6.io/docs/using-k6/modules/#the-jslib-repository) hoặc từ bất kỳ máy chủ web nào có thể truy cập công khai

```jsx title="test.js"
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export default function () {
  randomItem();
}
```
> Tham khảo thêm remote modules: https://jslib.k6.io/ .

### Metrics
Khi thực hiện chạy 1 kịch bản test với k6, ngoài việc đảm bảo kịch bản chạy thành công không gặp lỗi từ API thì về output của K6 cũng cho chúng ta rất nhiều
các metrics khác nhau, như ví dụ dưới đây

```jsx title="test.js"
import http from 'k6/http';

export default function () {
  http.get('https://test-api.k6.io/');
}

```

Thực hiện chạy command
```bash
k6 run test.js
```

```bash title="output"
k6 run script.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: http_get.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
           * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)


running (00m03.8s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m03.8s/10m0s  1/1 iters, 1 per VU

     data_received..................: 22 kB 5.7 kB/s
     data_sent......................: 742 B 198 B/s
     http_req_blocked...............: avg=1.05s    min=1.05s    med=1.05s    max=1.05s    p(90)=1.05s    p(95)=1.05s
     http_req_connecting............: avg=334.26ms min=334.26ms med=334.26ms max=334.26ms p(90)=334.26ms p(95)=334.26ms
     http_req_duration..............: avg=2.7s     min=2.7s     med=2.7s     max=2.7s     p(90)=2.7s     p(95)=2.7s
       { expected_response:true }...: avg=2.7s     min=2.7s     med=2.7s     max=2.7s     p(90)=2.7s     p(95)=2.7s
     http_req_failed................: 0.00% ✓ 0        ✗ 1
     http_req_receiving.............: avg=112.41µs min=112.41µs med=112.41µs max=112.41µs p(90)=112.41µs p(95)=112.41µs
     http_req_sending...............: avg=294.48µs min=294.48µs med=294.48µs max=294.48µs p(90)=294.48µs p(95)=294.48µs
     http_req_tls_handshaking.......: avg=700.6ms  min=700.6ms  med=700.6ms  max=700.6ms  p(90)=700.6ms  p(95)=700.6ms
     http_req_waiting...............: avg=2.7s     min=2.7s     med=2.7s     max=2.7s     p(90)=2.7s     p(95)=2.7s
     http_reqs......................: 1     0.266167/s
     iteration_duration.............: avg=3.75s    min=3.75s    med=3.75s    max=3.75s    p(90)=3.75s    p(95)=3.75s
     iterations.....................: 1     0.266167/s
     vus............................: 1     min=1      max=1
     vus_max........................: 1     min=1      max=1
```

Vậy chúng ta nên quan tâm những **metrics nào** ?

Theo kinh nghiệm của mình, việc quan tâm tới các metrics nào còn phụ thuộc vào mục tiêu kiểm thử của chúng ta, thông thường có 3 metrics sau mình thấy hay quan tâm nhất
-   **http_reqs**, to measure requests
-   **http_req_failed**, to measure error rate
-   **http_req_duration**, to measure duration

### Checks

Checks trong k6 là một khái niệm mục đích để mình thực hiện check validation boolean condition, trong khuôn khổ các testing framework khác nó giống như là `assert`

#### Check for HTTP response code

```jsx title="script.js"
import { check } from 'k6';
import http from 'k6/http';

export default function () {
  const res = http.get('http://test.k6.io/');
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}
```

#### Check for text in response body

```jsx title="script.js"
import { check } from 'k6';
import http from 'k6/http';

export default function () {
  const res = http.get('http://test.k6.io/');
  check(res, {
    'verify homepage text': (r) =>
      r.body.includes('Collection of simple web-pages suitable for load testing'),
  });
}
```

#### Theo dõi tỉ lệ check passed ở output

```bash title="output"
k6 run script.js

  ...
    ✓ is status 200

  ...
  checks.........................: 100.00% ✓ 1        ✗ 0
  data_received..................: 11 kB   12 kB/s
```

### Ngưỡng (Thresholds)

Ngưỡng (thresholds) là tiêu chí để đánh giá kết quả đạt/không đạt cho các chỉ số trong bài kiểm thử. Nếu hệ thống kiểm thử (SUT) không đáp ứng các ngưỡng này, bài kiểm thử sẽ bị đánh giá là thất bại.

Ngưỡng thường được dùng để xác định các SLO (Service Level Objectives), ví dụ:

-   Dưới 1% yêu cầu trả về lỗi.
-   95% yêu cầu có thời gian phản hồi dưới 200ms.
-   99% yêu cầu có thời gian phản hồi dưới 400ms.
-   Một endpoint cụ thể luôn phản hồi trong 300ms.
-   Các điều kiện cho chỉ số tùy chỉnh.

Ngưỡng cũng rất quan trọng trong việc tự động hóa kiểm thử tải:

1.  Thiết lập ngưỡng cho bài kiểm thử.
2.  Tự động hóa quá trình kiểm thử.
3.  Cấu hình cảnh báo khi kiểm thử thất bại.
Khi thiết lập ngưỡng, nếu điều kiện không đạt, bài kiểm thử sẽ bị coi là thất bại.

#### Ví dụ threshold cho http error và response time

Ví dụ dưới đây thiết lập hai ngưỡng: một ngưỡng đánh giá tỷ lệ lỗi HTTP (http_req_failed), và một ngưỡng đánh giá 95% phản hồi trong khoảng thời gian nhất định (http_req_duration).

```jsx title="script.js"
import http from 'k6/http';

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },
};

export default function () {
  http.get('https://test-api.k6.io/public/crocodiles/1/');
}
```
> Tham khảo thêm `options` API tại https://k6.io/docs/using-k6/k6-options/reference/

## Biến Môi Trường (Environment Variables)

Thường thì các script chỉ cần điều chỉnh nhỏ để tái sử dụng trong các bối cảnh khác nhau. Thay vì tạo ra nhiều script riêng biệt cho các môi trường khác nhau, bạn có thể sử dụng biến môi trường để làm cho các phần của script dễ điều chỉnh hơn.

### Truyền Biến Môi Trường vào Script k6
Trong k6, các biến môi trường được truy cập thông qua biến toàn cục __ENV, là một đối tượng JS. 

```jsx
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  const res = http.get(`http://${__ENV.MY_HOSTNAME}/`);
  sleep(1);
}
```

Cách khuyến nghị để truyền biến môi trường vào script là sử dụng flag -e hoặc --env trên CLI:
```bash
$ k6 run -e MY_HOSTNAME=test.k6.io script.js
```

### Cấu Hình Options k6 Bằng Biến Môi Trường
Bạn cũng có thể cấu hình các tùy chọn của k6 bằng biến môi trường. Ví dụ:
```jsx
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  const res = http.get('https://test.k6.io');
  sleep(1);
}
```

Mặc định, script này sẽ chạy một lần lặp với một người dùng ảo (VU). Để thay đổi hành vi mặc định, bạn có thể truyền các tùy chọn k6 qua biến môi trường:
```bash
$ K6_VUS=10 K6_DURATION=10s k6 run script.js
```

### Lưu ý giữa Atlas và K6 ENV

Có một lưu ý nhỏ là trong quá trình viết script nếu chạy bằng k6 cloud hoặc k6 cli (local hoặc CI/CD) chúng ta có thể sử dụng biến môi trường `__ENV`
tuy nhiên nếu script được viết và chạy trên hệ thống **Atlas** sẽ cần sửa biến môi trường thành `__SECRET`

## Ví Dụ: Kịch Bản Kiểm Thử Đăng Nhập Và Lấy Thông Tin Người Dùng

Trong ví dụ này, chúng ta sẽ thực hiện một kịch bản kiểm thử với mục tiêu kiểm tra hiệu suất của hệ thống đăng nhập và lấy thông tin người dùng. Kịch bản này sử dụng công cụ K6 để mô phỏng việc đăng nhập của nhiều người dùng ảo (VU - Virtual Users) vào hệ thống và truy xuất thông tin tài khoản của họ. Kịch bản được thiết kế với hai phần chính: setup để chuẩn bị dữ liệu và LOAD_TESTING_NORMAL_TIMES để thực hiện kiểm thử.

### Cấu Hình Kịch Bản
Kịch bản được cấu hình để chạy một bài kiểm thử tải nhẹ (smoke test) với 6 người dùng ảo, mỗi người thực hiện 6 lần lặp. Thời gian tối đa cho mỗi phiên kiểm thử là 3 phút và thời gian dừng an toàn là 30 giây. Mục tiêu của kịch bản là đảm bảo rằng 95% các yêu cầu HTTP hoàn thành trong vòng 5000ms.

```jsx title="script.js"
export const options = {
    thresholds: { http_req_duration: ["p(95)<5000"] },
    scenarios: {
        smoke_test: {
            executor: 'per-vu-iterations',
            exec: 'LOAD_TESTING_NORMAL_TIMES',
            vus: 6,
            iterations: 6,
            gracefulStop: '30s',
            maxDuration: '3m',
        },
    },
};
```

### Phần Setup: Chuẩn Bị Tài Khoản Đăng Nhập

Trong phần setup, chúng ta tạo ra một danh sách các tài khoản người dùng giả định để sử dụng trong quá trình kiểm thử. Mỗi người dùng ảo sẽ được gán một tài khoản duy nhất. Việc tạo trước danh sách tài khoản giúp quá trình kiểm thử diễn ra mượt mà hơn mà không cần phải tạo tài khoản trong mỗi lần lặp.

```jsx title="script.js"
export function setup() {
  const accounts = [];

  for (let X = 1; X <= 30; X++) {
      for (let Y = 1; Y <= 10; Y++) {
          accounts.push(`accountVU+${X}-${Y}@sun-asterisk.com`);
      }
  }

  return accounts;
}
```

### Phần Thực Thi: Đăng Nhập Và Lấy Thông Tin Người Dùng
Trong hàm LOAD_TESTING_NORMAL_TIMES, mỗi người dùng ảo sẽ thực hiện các bước sau:

1.  **Lấy Token XSRF**: Mỗi phiên đăng nhập bắt đầu bằng việc gửi yêu cầu GET để lấy token XSRF từ máy chủ. Token này sẽ được sử dụng để bảo vệ các yêu cầu tiếp theo khỏi các cuộc tấn công CSRF.

2.  **Đăng Nhập**: Sử dụng token XSRF vừa lấy được, người dùng sẽ gửi yêu cầu POST để đăng nhập vào hệ thống với tài khoản đã được cấp. Cookie và token xác thực sẽ được lưu lại để sử dụng cho các yêu cầu tiếp theo.

3.  **Lấy Thông Tin Người Dùng**: Sau khi đăng nhập thành công, người dùng gửi yêu cầu GET để truy xuất thông tin cá nhân từ hệ thống.

```jsx title="script.js"
export function LOAD_TESTING_NORMAL_TIMES(accounts) {
    let response;
    
    if (!cookie[accounts[__VU - 1]]) {
        response = http.get(apiUrl + "/api/sanctum/csrf-cookie", {
            headers: {
                Referer: url,
            },
        });

        xsrfToken[__VU - 1] = decodeURIComponent(
            response.headers["Set-Cookie"].split(";")[0].split("=")[1]
        );
  
        response = http.post(
            apiUrl + "/api/auth/login",
            JSON.stringify({
                email: accounts[__VU - 1],
                password: "Aa@123456",
            }),
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-XSRF-TOKEN": xsrfToken[__VU - 1],
                    Referer: url,
                },
            }
        );
        cookie[__VU - 1] = response.headers["Set-Cookie"].split(";")[0] + ';' + response.headers["Set-Cookie"].split(";")[6].split(',')[1];
    }
  
  http.get(apiUrl + "/api/me", {
    headers: {
      Accept: "application/json",
      Cookie: cookie[__VU - 1],
      Referer: url,
    },
  });
}
```

Ở trên là ví dụ về một kịch bản kiểm thử hiệu suất luồng đăng nhập và lấy thông tin người dùng ( sử dụng cookie ) sẽ có những kịch bản khác tương tự nhưng là JWT Token hoặc có sử dụng Basic Auth thì chỉ thay đổi một chút về luồng ở trên, ở trong kịch bản này không sử dụng `default()` mà đặt tên hàm là `LOAD_TESTING_NORMAL_TIMES` mục đích là trong options chúng ta có thể có nhiều `scenarios` kịch bản khác nhau và có thể viết nhiều function thực thi test tương ứng với mỗi kịch bản khác nhau.
