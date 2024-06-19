---
sidebar_position: 1
---

# Tại sao performance testing lại cần thiết

## Mở đầu

Đầu tiên chúng ta cần hiểu là, tại sao lại có khái niệm "performance testing" ra đời. Thông thường trong quá trình làm dự án chúng ta sẽ để ý có các loại test sau unit, functional, and system testing. Thực ra về mặt "cần" thiết thì ai cũng biết là "test" thì phải cần tuy nhiên không quá nhiều developer nhận ra được giá trị mà Performance Testing mang lại. Cũng giống như khi chúng ta viết unit test cũng vậy, rõ ràng là "code của tôi, code đúng, tôi đã phải self test rồi, chứ code sai tôi đẩy pull request làm gì". Điều đó vẫn đúng cho tới khi vì 1 lý do nào đó, một người nào đó đã sửa đoạn code của tôi để đối ứng cho 1 logic đầu ra cho 1 function khác của họ, và function tôi bị sai. Trong quá trình review code của người đó có thể tôi đã không để ý tới đoạn chỉnh sửa đó, có thể là vì đã rất lâu rồi đôi khi tôi còn không nhớ function đó chính là của tôi viết. Và lẽ dĩ nhiên, lúc này Unit Test chưa bao giờ là cần thiết hơn cả. 

## Non-Performance Application
Câu chuyện ở trên tôi muốn nhấn mạnh ở chỗ, Performance Test cũng vậy, nếu chúng ta nhìn thấy giá trị của nó từ trước thì mới biết nó đáng quý.
Vậy thì những ứng dụng non-performance ( hay gọi là hiệu suất kém ) sẽ có những rủi ro gì?
Tổng quan lại mình nghĩ có 3 gạch đầu dòng sau đây được coi là hệ quả của 1 hệ thống non-performance
1. **Chi phí thời gian**: Ứng dụng hiệu suất kém khiến cho các hoạt động liên quan mất nhiều thời gian hơn để hoàn thành, điều này không chỉ làm giảm năng suất mà còn có thể làm trì hoãn các hoạt động của người dùng, tiếp theo sẽ là đội phát triển 
2. **Chi phí tiền bạc**: Chi phí liên quan đến việc sửa chữa, nâng cấp, hoặc thay thế ứng dụng không hiệu quả, bao gồm cả chi phí cho nhân sự, nguồn lực và các nguồn lực khác được dành để khắc phục vấn đề.
3. **Mất sự uy tín từ người dùng**: Khi ứng dụng không đáp ứng được kỳ vọng, người dùng có thể cảm thấy thất vọng và không hài lòng, điều này có thể ảnh hưởng tiêu cực đến hình ảnh và uy tín của tổ chức trong mắt khách hàng và người dùng cuối

Từ góc nhìn là 1 dân kỹ thuật, việc chúng ta làm dự án để đóng góp giá trị cho tổ chức nhưng lỡ không may chúng ta góp tay 1 phần vào việc xây dựng 1 hệ thống non-performance thì giá trị của chúng ta gần như = 0 nếu so sánh với 3 hệ quả trên.

## Performance Measurement
Vậy để đo lường hiệu suất chúng ta nên bắt đầu từ đâu? 
Phần này khá là miên man, nhưng trước hết để đo được hiệu suất chúng ta cần phải có được các keyword để định nghĩa các thể loại trong bộ môn này trước.
Vì rõ ràng bất kể là chúng ta dùng tool nào tiến hành đo cũng sẽ có rất nhiều các thông số output, mà chúng ta cần nắm được. Về cơ bản những thông số này sẽ chia làm 2 hướng 

1. **Hướng dịch vụ (service-oriented)**: Các chỉ số hướng dịch vụ bao gồm khả năng sẵn có *(availability)* và thời gian phản hồi *(response time)* chúng đo lường mức độ tốt (hoặc không tốt) của ứng dụng trong việc cung cấp dịch vụ cho người dùng cuối
2. **Hướng hiệu quả (efficiency-oriented)**: Các chỉ số hướng hiệu quả là thông lượng *(throughput)* và sử dụng *(utilization)* chúng đo lường mức độ tốt (hoặc không tốt) mà ứng dụng tận dụng resource ứng dụng

### Định nghĩa các thuật ngữ
- **Availability**
  - Đây là thời gian mà ứng dụng có sẵn và có thể sử dụng được cho người dùng cuối. Nói cách khác, đây là phần trăm thời gian mà ứng dụng hoạt động mà không có sự cố nào ngăn cản người dùng truy cập và sử dụng các chức năng của ứng dụng. 
  - *Ví dụ, một ứng dụng thương mại điện tử không khả dụng có thể khiến khách hàng không thể đặt hàng, dẫn đến mất doanh thu và sự không hài lòng của khách hàng.*

- **Response time**
  - Thời gian mất để ứng dụng phản hồi yêu cầu của người dùng. Đối với kiểm thử hiệu suất, người ta thường đo thời gian phản hồi của hệ thống, là khoảng thời gian từ khi người dùng yêu cầu phản hồi từ ứng dụng cho đến khi phản hồi hoàn chỉnh đến người dùng

- **Throughput**
  - Tốc độ xảy ra các sự kiện hướng ứng dụng. Điều này nghĩa là thông lượng đo lường tốc độ mà các sự kiện liên quan đến ứng dụng được thực hiện. Các "sự kiện" này có thể là bất kỳ hoạt động nào do ứng dụng thực hiện, như xử lý dữ liệu, trả lời các yêu cầu, hoặc bất kỳ tương tác nào giữa người dùng và ứng dụng. Nghe nó khá giống như thuật ngữ **RPS (Requests Per Second)**, nhưng thông lượng có thể bao gồm nhiều loại sự kiện hơn, không chỉ giới hạn ở yêu cầu HTTP. Thông lượng có thể bao gồm việc xử lý dữ liệu, các tác vụ nền, giao tiếp giữa các dịch vụ, và nhiều hoạt động khác

- **Utilization**
  - Chỉ số này đo lường tỷ lệ phần trăm của công suất tối đa có thể của một tài nguyên cụ thể (như CPU, bộ nhớ, băng thông mạng) mà ứng dụng đang sử dụng. Ví dụ bao gồm việc sử dụng bao nhiêu network bandwidth cho application traffic và lượng bộ nhớ được sử dụng trên máy chủ khi có một nghìn khách truy cập hoạt động. Sử dụng hiệu quả các resource cho thấy ứng dụng được tối ưu hóa tốt, không lãng phí nhưng cũng không quá tải làm giảm hiệu suất. Tuy nhiên, một mức sử dụng quá cao có thể chỉ ra rằng ứng dụng đang đòi hỏi quá nhiều từ hệ thống, có thể dẫn đến chậm trễ và hư hỏng, trong khi một mức sử dụng quá thấp có thể là dấu hiệu của việc tài nguyên không được tận dụng triệt để.

## 10 Ví dụ về Non-performance application
Các ví dụ thực tế về một ứng dụng "non-performance" (hoạt động không hiệu quả) có thể bao gồm nhiều trường hợp khác nhau, ảnh hưởng đến khả năng hoạt động của ứng dụng đó cũng như trải nghiệm của người dùng cuối. Dưới đây là 10 ví dụ về tình trạng chạy ở local với dev ngon, deploy lên production ngon nhưng sau 1 khoảng thời gian thì lại toạch trong các ứng dụng:

- **Thời gian tải trang web chậm** : Một trang web thương mại điện tử mất hơn 10 giây để tải hoàn toàn, dẫn đến tỷ lệ bỏ giỏ hàng cao và mất doanh thu.

- **Sập sơ vịt trong giờ cao điểm**: Một ứng dụng đặt vé trực tuyến gặp sự cố đứt service hoặc không thể truy cập vào những thời điểm cao điểm, khiến khách hàng không thể hoàn tất các giao dịch.

- **GUI Not Responding**: Trong một ứng dụng chỉnh sửa ảnh, các công cụ chỉnh sửa không phản hồi ngay lập tức khi người dùng áp dụng các bộ lọc hoặc chỉnh sửa, làm gián đoạn quá trình sáng tạo.

- **Tính năng đồng bộ hóa thất bại**: Trong một ứng dụng quản lý công việc, tính năng đồng bộ hóa dữ liệu giữa các thiết bị khác nhau không hoạt động chính xác, gây ra mất mát dữ liệu hoặc thông tin không cập nhật.

- **Độ trễ cao trong ứng dụng trò chuyện**: Một ứng dụng nhắn tin mà trong đó tin nhắn mất vài giây để được gửi đi hoặc nhận, ảnh hưởng đến khả năng tương tác nhanh chóng giữa người dùng.

- **Crash liên tục khi sử dụng tính năng**: Một ứng dụng chỉnh sửa video bị crash mỗi khi người dùng cố gắng xuất video ở độ phân giải cao.

- **Memory leaks**: Một ứng dụng chỉnh sửa văn bản tiêu thụ ngày càng nhiều bộ nhớ càng sử dụng lâu, dẫn đến việc ứng dụng chậm lại đáng kể và cuối cùng là bị crash.

- **Cập nhật gây ra sự cố**: Sau khi cập nhật, một ứng dụng quản lý email không thể mở các tệp đính kèm hoặc liên kết trong email không hoạt động, làm gián đoạn quy trình làm việc thông thường của người dùng.

- **Khả năng mở rộng kém**: Một ứng dụng xã hội không thể xử lý lượng người dùng tăng vọt vào dịp sự kiện đặc biệt, dẫn đến trải nghiệm người dùng không đồng đều và thường xuyên bị gián đoạn.

- **Tính năng tìm kiếm không hiệu quả**: Trong một ứng dụng thư viện số, tính năng tìm kiếm mất nhiều phút để trả về kết quả, hoặc đôi khi không trả về kết quả nào, làm gián đoạn quá trình tìm kiếm thông tin của người dùng.

## Summary
- Ở trên mình đã đưa ra các hệ quả của 1 non-performance application đồng thời với những ví dụ mà mình biết ai là dân IT cũng sẽ gặp trong đời không phải là dự án của mình thì cũng là phần mềm khác mà mình từng sử dụng. Dựa vào điều đó để mình thấm nhuần về độ quan trọng của Performance Testing

## What's next?
- Các nguyên tắc cơ bản trong kiểm thử hiệu suất


