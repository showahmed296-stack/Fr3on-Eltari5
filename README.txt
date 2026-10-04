فرعون التاريخ — موقع الأستاذ محمد عنتر

المحتويات:
- index.html: الموقع الرئيسي.
- videos.js: قائمة فيديوهات YouTube، عدّل العناوين والروابط من هنا.
- server.js: Backend لمساعد الذكاء الاصطناعي.
- package.json: اعتماديات الـBackend.
- .env.example: مثال لمتغيرات البيئة.

الفيديوهات:
افتح videos.js واستبدل روابط embed التجريبية بروابط فيديوهاتك.

الـAI:
1) على جهاز/خادم الـBackend شغّل npm install ثم npm start.
2) عيّن OPENAI_API_KEY كمتغير بيئة سري، ولا تضعه داخل index.html أو GitHub.
3) لو الـBackend على دومين مختلف، عدّل API_URL في index.html إلى رابط الـBackend، مثل:
   const API_URL = "https://YOUR-BACKEND-DOMAIN.com";

مهم:
GitHub Pages يستضيف الواجهة الثابتة فقط. الـAI يحتاج Backend منفصل لأن مفتاح OpenAI يجب ألا يظهر للزوار.
