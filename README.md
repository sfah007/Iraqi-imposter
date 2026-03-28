<div dir="rtl" align="center">

# 🕵️‍♂️ الإمبوستر (خارج السالفة)

**لعبة جماعية حماسية تعتمد على الذكاء، المراوغة، وقوة الملاحظة!**
<br/>
مبنية بلهجة عراقية خالصة وتصميم عصري جذاب (Neon Dark Theme).

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.x-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

</div>

---

<div dir="rtl">

## 📌 عن اللعبة (Overview)
"الإمبوستر" أو "خارج السالفة" هي لعبة جماعية (Pass & Play) تلعب على جهاز واحد. يتم اختيار كلمة سرية (السالفة) وتوزيعها على جميع اللاعبين باستثناء شخص واحد (أو أكثر) يكون هو "الإمبوستر". 
الهدف: المواطنين يحاولون كشف الإمبوستر من خلال تلميحات بسيطة، والإمبوستر يحاول يندمج ويعرف "السالفة" بدون ما ينفضح!

## ✨ المميزات (Features)
* 🎮 **لعب جماعي محلي:** من 3 لاعبين فما فوق، على جهاز واحد.
* 🎭 **إعدادات مرنة:** تحكم بعدد الإمبوسترية حسب عدد اللاعبين.
* ⏱️ **مؤقت ذكي:** مؤقت نقاش قابل للتعديل (من 1 إلى 10 دقائق) مع خيار **"بدون مؤقت"** للانتقال المباشر للتصويت.
* 💡 **نظام تلميحات متطور:** الإمبوستر يحصل على "كلمة مشابهة" للسالفة الأصلية حتى يگدر يراوغ بذكاء.
* 🇮🇶 **محتوى عراقي أصيل:** تصنيفات متنوعة (أكل عراقي، أماكن، أشياء يومية) قابلة للتوسيع.
* 🎨 **تصميم احترافي:** واجهة مستخدم زجاجية (Glassmorphism) مع إضاءات نيون وحركات (Animations) سلسة جداً.
* 📱 **متجاوبة بالكامل:** تعمل بشكل ممتاز على شاشات الموبايل والتابلت واللابتوب.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

| التقنية | الاستخدام |
| :--- | :--- |
| **React (Vite)** | بناء واجهة المستخدم وإدارة حالة اللعبة (State Management). |
| **TypeScript** | كتابة كود نظيف، آمن، وخالي من الأخطاء (Type Safety). |
| **Tailwind CSS** | تنسيق العناصر بسرعة وبناء الـ Neon Theme والـ Glassmorphism. |
| **Framer Motion** | إضافة حركات انتقالية (Transitions) سلسة بين شاشات اللعبة. |
| **Lucide React** | مكتبة أيقونات عصرية وخفيفة. |

---

## 🎲 طريقة اللعب (How to Play)

1. **الإعدادات (Setup):** ضيف أسماء اللاعبين، اختار عدد الإمبوسترية، حدد الفئة (أكل، أماكن، الخ)، واضبط وقت النقاش.
2. **تمرير الجهاز (Pass Device):** كل لاعب يستلم الجهاز لوحده ويضغط مطولاً حتى يشوف دوره (مواطن أو إمبوستر).
3. **النقاش (Discussion):** يبدأ المؤقت. كل لاعب يگول كلمة وحدة أو جملة قصيرة توصف "السالفة" بدون ما يفضحها بشكل مباشر.
4. **التصويت (Voting):** بعد انتهاء الوقت (أو تخطيه)، كل لاعب يصوت على الشخص اللي يشك بيه إمبوستر.
5. **النتيجة (Results):** تنكشف الأدوار! إذا أخذ الإمبوستر أعلى أصوات يفوزون المواطنين، وإذا لا.. يفوز الإمبوستر!

---

## 📂 هيكلية المشروع (Project Structure)

```text
src/
├── components/           # مكونات واجهة المستخدم (شاشات اللعبة)
│   ├── SetupScreen.tsx   # شاشة الإعدادات وإضافة اللاعبين
│   ├── PassDeviceScreen.tsx # شاشة تمرير الجهاز بين اللاعبين
│   ├── RevealScreen.tsx  # شاشة كشف الدور (مواطن/إمبوستر)
│   ├── DiscussionScreen.tsx # شاشة المؤقت والنقاش
│   ├── VotingScreen.tsx  # شاشة التصويت السري
│   └── ResultsScreen.tsx # شاشة إعلان النتائج الفائزين
├── lib/
│   └── words.ts          # قاعدة بيانات الكلمات والتصنيفات والتلميحات
├── App.tsx               # المكون الرئيسي (مدير حالة اللعبة والتنقل)
├── main.tsx              # نقطة البداية لتطبيق React
└── index.css             # التنسيقات العامة ومتغيرات الـ Tailwind
```

---

## 🚀 التشغيل المحلي (Installation & Setup)

لتشغيل اللعبة على جهازك وتعديلها، اتبع الخطوات التالية:

1. **استنساخ المستودع (Clone):**
   ```bash
   git clone https://github.com/yourusername/imposter-game.git
   cd imposter-game
   ```

2. **تثبيت الحزم (Install Dependencies):**
   ```bash
   npm install
   ```

3. **تشغيل خادم التطوير (Run Dev Server):**
   ```bash
   npm run dev
   ```
   *افتح الرابط `http://localhost:5173` في متصفحك.*

4. **بناء المشروع للإنتاج (Build for Production):**
   ```bash
   npm run build
   ```

---

## 📊 إحصائيات الكود (Code Stats)
* **المكونات (Components):** 6 شاشات رئيسية منفصلة.
* **إدارة الحالة (State):** تعتمد على `useState` و `useEffect` في `App.tsx` لضمان تدفق منطقي وسلس للعبة.
* **الكلمات (Words DB):** أكثر من 70 كلمة مقسمة على 3 تصنيفات رئيسية مع تلميحات مخصصة لكل كلمة.

---

## 🤝 المساهمة (Contributing)
نرحب بأي مساهمة لتطوير اللعبة! إذا عندك أفكار لتصنيفات جديدة، كلمات عراقية رهيبة، أو تحسينات على الكود:
1. سوي Fork للمشروع.
2. سوي Branch جديد (`git checkout -b feature/AmazingFeature`).
3. احفظ تعديلاتك (`git commit -m 'Add some AmazingFeature'`).
4. ارفع الـ Branch (`git push origin feature/AmazingFeature`).
5. افتح Pull Request.

---

## 📄 الترخيص (License)
هذا المشروع مفتوح المصدر ومتاح تحت ترخيص [MIT](https://choosealicense.com/licenses/mit/). يمكنك استخدامه، تعديله، ونشره بحرية.

</div>
