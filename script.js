// تفعيل التأثيرات الخاصة بـ AOS
AOS.init();

<script>
  function sendToWhatsApp(event) {
    event.preventDefault(); // منع إرسال النموذج بالطريقة العادية

    // الحصول على البيانات من الحقول
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    // تنسيق الرسالة التي ستظهر في واتساب
    var text = "مرحبًا!%0A";
    text += "الاسم: " + encodeURIComponent(name) + "%0A";
    text += "البريد الإلكتروني: " + encodeURIComponent(email) + "%0A";
    text += "الرسالة: " + encodeURIComponent(message);

    // رابط واتساب مع النص المحدد
    var whatsappURL = "https://wa.me/201234567890?text=" + text;

    // فتح رابط واتساب
    window.open(whatsappURL, "_blank");
  }
</script>
