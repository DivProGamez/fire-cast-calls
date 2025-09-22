# Fake Call Video - Fire TV & Tablet App

## 📋 نظرة عامة على المشروع

تطبيق **Fake Call Video** هو تطبيق ترفيهي مصمم خصيصاً لأجهزة Fire TV والأجهزة اللوحية، يحاكي مكالمات فيديو وهمية مع 12 شخصية مختلفة (6 مجانية + 6 مدفوعة).

### ⭐ الميزات الرئيسية
- **وضع الشاشة**: Landscape فقط (مناسب للتلفاز والأجهزة اللوحية)
- **طرق التحكم**: Fire TV Remote, لوحة المفاتيح, Gamepad, Touch
- **المحتوى**: 12 شخصية (6 مجانيين + 6 مدفوعين عبر Amazon IAP)
- **الإشعارات**: يدعم OneSignal و Amazon ADM
- **التدفق**: Splash → Menu → Main → Call Page → Video Overlay

---

## 🏗️ هيكل المشروع الكامل

```
fake-call-video/
├── 📁 public/
│   ├── 📁 images/
│   │   ├── 🖼️ logo.png
│   │   ├── 🖼️ tvbanner_1920x1080.png
│   │   ├── 🖼️ character_1_icon.png
│   │   ├── 🖼️ character_2_icon.png
│   │   ├── 🖼️ character_3_icon.png
│   │   ├── 🖼️ character_4_icon.png
│   │   ├── 🖼️ character_5_icon.png
│   │   ├── 🖼️ character_6_icon.png
│   │   ├── 🖼️ character_7_icon.png
│   │   ├── 🖼️ character_8_icon.png
│   │   ├── 🖼️ character_9_icon.png
│   │   ├── 🖼️ character_10_icon.png
│   │   ├── 🖼️ character_11_icon.png
│   │   └── 🖼️ character_12_icon.png
│   ├── 📁 videos/
│   │   ├── 🎥 character_1_video.mp4
│   │   ├── 🎥 character_2_video.mp4
│   │   ├── 🎥 character_3_video.mp4
│   │   ├── 🎥 character_4_video.mp4
│   │   ├── 🎥 character_5_video.mp4
│   │   ├── 🎥 character_6_video.mp4
│   │   ├── 🎥 character_7_video.mp4
│   │   ├── 🎥 character_8_video.mp4
│   │   ├── 🎥 character_9_video.mp4
│   │   ├── 🎥 character_10_video.mp4
│   │   ├── 🎥 character_11_video.mp4
│   │   └── 🎥 character_12_video.mp4
│   ├── 📁 audio/
│   │   ├── 🔊 ringtone.mp3
│   │   └── 🔊 cancel.mp3
│   └── 📄 robots.txt
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 screens/
│   │   │   ├── 📄 SplashScreen.tsx
│   │   │   ├── 📄 MenuScreen.tsx
│   │   │   ├── 📄 MainScreen.tsx
│   │   │   ├── 📄 CallScreen.tsx
│   │   │   ├── 📄 VideoOverlay.tsx
│   │   │   └── 📄 PurchaseDialog.tsx
│   │   ├── 📁 ui/ (shadcn components)
│   │   │   ├── 📄 button.tsx
│   │   │   ├── 📄 card.tsx
│   │   │   ├── 📄 dialog.tsx
│   │   │   └── ... (other UI components)
│   │   └── 📄 CharacterCard.tsx
│   ├── 📁 contexts/
│   │   └── 📄 AppContext.tsx
│   ├── 📁 hooks/
│   │   ├── 📄 useInput.tsx
│   │   ├── 📄 use-mobile.tsx
│   │   └── 📄 use-toast.ts
│   ├── 📁 lib/
│   │   └── 📄 utils.ts
│   ├── 📁 pages/
│   │   ├── 📄 Index.tsx
│   │   └── 📄 NotFound.tsx
│   ├── 📄 App.tsx
│   ├── 📄 App.css
│   ├── 📄 index.css
│   ├── 📄 main.tsx
│   └── 📄 vite-env.d.ts
├── 📄 index.html
├── 📄 tailwind.config.ts
├── 📄 vite.config.ts
├── 📄 eslint.config.js
├── 📄 README.md
└── 📄 PROJECT_DOCUMENTATION.md (هذا الملف)
```

---

## 🎨 نظام التصميم والألوان

### 🎯 الثيم المستخدم
- **الثيم الأساسي**: Dark Theme مُحسّن للتلفاز
- **الألوان الرئيسية**: 
  - Primary: `hsl(195 100% 50%)` (أزرق سماوي)
  - Background: `hsl(216 24% 8%)` (أسود مزرق)
  - Success: `hsl(142 76% 36%)` (أخضر)
  - Destructive: `hsl(0 84% 60%)` (أحمر)
  - Warning: `hsl(38 92% 50%)` (أصفر)

### 🎨 الميزات التصميمية
- **Gradients**: تدرجات لونية احترافية
- **Focus States**: حالات التركيز للتنقل بالريموت
- **Animations**: رسوم متحركة سلسة
- **Responsive**: متجاوب مع جميع الأحجام

---

## 🖥️ الشاشات والوظائف

### 1. 🌟 شاشة Splash
**الملف**: `src/components/screens/SplashScreen.tsx`

**الوظائف**:
- عرض شعار التطبيق مع انيميشن
- شريط تحميل متحرك
- انتقال تلقائي إلى القائمة الرئيسية بعد 3 ثواني
- تحذير من وضع Portrait

**المكونات**:
- شعار التطبيق مع تأثير Pulse Glow
- عنوان التطبيق مع Gradient
- شريط التحميل المتحرك

### 2. 🏠 شاشة Menu
**الملف**: `src/components/screens/MenuScreen.tsx`

**الوظائف**:
- زر "Call Video" للانتقال لاختيار الشخصيات
- زر "More Apps" لفتح متجر Amazon
- زر "Restore Purchases" لاسترجاع المشتريات
- تصميم احترافي مع خلفية منقطة

**التحكم**:
- Enter/Space: تفعيل الزر المحدد
- Escape: لا يوجد إجراء (الشاشة الرئيسية)

### 3. 👥 شاشة Main (اختيار الشخصيات)
**الملف**: `src/components/screens/MainScreen.tsx`

**الوظائف**:
- عرض 12 شخصية في صفين (6 مجانية + 6 مدفوعة)
- بطاقات تفاعلية لكل شخصية
- تمييز الشخصيات المقفولة والمفتوحة
- نظام التنقل الشبكي للريموت

**التنظيم**:
- **الصف الأول**: الشخصيات المجانية (1-6)
- **الصف الثاني**: الشخصيات المدفوعة (7-12)

### 4. 📞 شاشة Call
**الملف**: `src/components/screens/CallScreen.tsx`

**الوظائف**:
- عرض صورة الشخصية المختارة مع انيميشن
- تشغيل نغمة الرنين تلقائياً
- زر أخضر للرد وزر أحمر للإلغاء
- تأثيرات بصرية واقعية للمكالمة

**التحكم**:
- Enter/Space: الرد على المكالمة
- Escape: إلغاء المكالمة والعودة للقائمة

### 5. 🎥 شاشة Video Overlay
**الملف**: `src/components/screens/VideoOverlay.tsx`

**الوظائف**:
- تشغيل فيديو الشخصية بكامل الشاشة
- أزرار تحكم مخفية (تظهر عند Hover)
- إمكانية كتم الصوت
- إنهاء تلقائي عند انتهاء الفيديو

**التحكم**:
- Escape: إنهاء الفيديو
- Enter: تبديل كتم الصوت

### 6. 💳 شاشة Purchase Dialog
**الملف**: `src/components/screens/PurchaseDialog.tsx`

**الوظائف**:
- عرض معلومات الشخصية المراد شراؤها
- معلومات السعر والميزات
- تكامل مع نظام Amazon IAP
- رسوم متحركة أثناء عملية الشراء

**المنطق**:
- محاكاة عملية الشراء (1.5 ثانية)
- حفظ المشتريات في LocalStorage
- تحديث حالة الشخصيات فوراً

---

## 🎮 نظام التحكم والتنقل

### 📱 طرق التحكم المدعومة

#### 1. Fire TV Remote
- **D-Pad**: التنقل بين العناصر
- **OK Button**: تفعيل العنصر المحدد
- **Back Button**: العودة للشاشة السابقة
- **Menu Button**: فتح القوائم الإضافية

#### 2. لوحة المفاتيح
- **الأسهم**: التنقل
- **Enter/Space**: التفعيل
- **Escape**: العودة/الإلغاء

#### 3. Gamepad
- **D-Pad أو Left Stick**: التنقل
- **A Button**: التفعيل
- **B Button**: الإلغاء/العودة

#### 4. Touch (للأجهزة اللوحية)
- **Tap**: تفعيل مباشر
- **Swipe**: التمرير (حيثما ينطبق)

### 🗂️ نظام التنقل الشبكي
**الملف**: `src/hooks/useInput.tsx`

**الميزات**:
- تنقل ذكي في الشبكات ثنائية الأبعاد
- تذكر الموضع الحالي
- تركيز تلقائي على العناصر
- دعم متعدد المنصات

---

## 💰 نظام الشراءات والتسعير

### 🔐 الشخصيات المدفوعة
- **Character 7**: `sku.niche7` - شخصية غامضة
- **Character 8**: `sku.niche8` - شخصية أنيقة  
- **Character 9**: `sku.niche9` - شخصية مستقبلية
- **Character 10**: `sku.niche10` - شخصية سحرية
- **Character 11**: `sku.niche11` - شخصية ملكية
- **Character 12**: `sku.niche12` - شخصية بطل خارق

### 💳 نظام الدفع
- **التكامل**: Amazon In-App Purchase (IAP)
- **السعر**: $0.99 لكل شخصية
- **التخزين**: LocalStorage للمشتريات
- **الاستعادة**: وظيفة Restore Purchases متاحة

---

## 🎵 الملفات الصوتية والمرئية

### 🔊 الملفات الصوتية
```
public/audio/
├── ringtone.mp3     # نغمة الرنين (تكرار مستمر)
└── cancel.mp3       # صوت الإلغاء
```

### 🎥 ملفات الفيديو
```
public/videos/
├── character_1_video.mp4   # فيديو الشخصية الأولى
├── character_2_video.mp4   # فيديو الشخصية الثانية
├── ...
└── character_12_video.mp4  # فيديو الشخصية الثانية عشرة
```

### 🖼️ الصور والرموز
```
public/images/
├── logo.png                 # شعار التطبيق (512x512)
├── tvbanner_1920x1080.png  # بانر التلفاز
├── character_1_icon.png     # أيقونة الشخصية الأولى
├── ...
└── character_12_icon.png    # أيقونة الشخصية الثانية عشرة
```

---

## 🧩 المكونات والسياق

### 🎯 App Context
**الملف**: `src/contexts/AppContext.tsx`

**الوظائف**:
- إدارة حالة التطبيق الشاملة
- التنقل بين الشاشات
- إدارة بيانات الشخصيات
- معالجة عمليات الشراء
- تخزين واسترجاع البيانات

**البيانات المُدارة**:
- الشاشة الحالية
- الشخصية المختارة
- قائمة الشخصيات وحالة الشراء
- العنصر المركز عليه
- قائمة المشتريات

### 🎮 Custom Hooks

#### 1. useInput Hook
**الملف**: `src/hooks/useInput.tsx`
- معالجة جميع طرق الإدخال
- دعم لوحة المفاتيح والريموت والGamepad
- نظام callback مرن

#### 2. useGridNavigation Hook
- تنقل ذكي في الشبكات
- حساب المواضع التلقائي
- تركيز العناصر DOM

#### 3. useMobile Hook
**الملف**: `src/hooks/use-mobile.tsx`
- كشف الأجهزة المحمولة
- تكييف الواجهة حسب نوع الجهاز

### 🎨 Character Card Component
**الملف**: `src/components/CharacterCard.tsx`

**الميزات**:
- عرض معلومات الشخصية
- حالات مختلفة (مجاني/مشترى/مقفول)
- تأثيرات بصرية تفاعلية
- معالجة الأخطاء للصور

---

## 🚀 الخطوات التي تمت في إنشاء المشروع

### 1. 🎨 إعداد نظام التصميم
- **إنشاء ألوان مخصصة** في `src/index.css`
- **إعداد Tailwind Config** في `tailwind.config.ts`
- **كلاسات CSS مخصصة** للتلفاز والتركيز
- **Gradients وانيميشن** احترافية

### 2. 🏗️ هيكل التطبيق الأساسي
- **تعديل App.tsx** لنظام الشاشات
- **إنشاء AppContext** لإدارة الحالة
- **إعداد نظام التنقل** بدون React Router

### 3. 🖥️ إنشاء الشاشات
- **SplashScreen**: شاشة البداية مع انيميشن
- **MenuScreen**: القائمة الرئيسية
- **MainScreen**: اختيار الشخصيات
- **CallScreen**: واجهة المكالمة
- **VideoOverlay**: تشغيل الفيديو
- **PurchaseDialog**: شراء الشخصيات

### 4. 🎮 نظام التحكم
- **useInput Hook** للإدخال المتعدد
- **useGridNavigation** للتنقل الشبكي
- **دعم Fire TV Remote** والGamepad
- **تركيز تلقائي** للعناصر

### 5. 💰 نظام الشراءات
- **هيكل Amazon IAP** جاهز
- **LocalStorage** للمشتريات
- **Restore Purchases** وظيفية
- **Purchase Dialog** تفاعلية

### 6. 🎨 إنشاء الأصول المرئية
- **12 أيقونة شخصية** بألوان مختلفة
- **شعار التطبيق** احترافي
- **TV Banner** بدقة 1920x1080
- **ملفات placeholder** للصوت والفيديو

### 7. 📱 التوافق والاستجابة
- **Landscape-only** مع تحذير Portrait
- **TV-friendly** تصميم وتنقل
- **Multi-input** دعم شامل
- **Error handling** للميديا

### 8. 🔧 التحسينات النهائية
- **SEO metadata** في index.html
- **Accessibility** للقارئات
- **Performance** تحسينات
- **Professional polish** لمسات أخيرة

---

## 🛠️ التقنيات المستخدمة

### ⚛️ Frontend Framework
- **React 18.3.1** - مكتبة الواجهة الأساسية
- **TypeScript** - للتطوير الآمن
- **Vite** - أداة البناء السريعة

### 🎨 Styling & UI
- **Tailwind CSS** - نظام التصميم المرن
- **shadcn/ui** - مكونات الواجهة الجاهزة
- **Radix UI** - مكونات إمكانية الوصول
- **Lucide Icons** - مجموعة الأيقونات

### 🔧 State Management
- **React Context** - إدارة الحالة الشاملة
- **Custom Hooks** - منطق قابل للإعادة
- **LocalStorage** - تخزين المشتريات

### 📱 Device Support
- **Responsive Design** - لجميع الأحجام
- **Multi-input** - ريموت، لوحة مفاتيح، gamepad، لمس
- **Fire TV** - محسن خصيصاً

### 🎵 Media Handling
- **HTML5 Video/Audio** - تشغيل الوسائط
- **Error Fallbacks** - معالجة أخطاء التحميل
- **Preloading** - تحسين الأداء

---

## 📋 قائمة المهام المكتملة

### ✅ التصميم والواجهة
- [x] إعداد نظام الألوان المظلم للتلفاز
- [x] إنشاء كلاسات CSS مخصصة للتركيز
- [x] تصميم شاشات احترافية بانيميشن
- [x] إعداد responsive design كامل
- [x] إنشاء تدرجات لونية جميلة

### ✅ الوظائف الأساسية  
- [x] نظام التنقل بين الشاشات
- [x] إدارة حالة التطبيق الشاملة
- [x] اختيار وعرض الشخصيات
- [x] محاكاة المكالمات الواقعية
- [x] تشغيل الفيديو بكامل الشاشة

### ✅ نظام التحكم
- [x] دعم Fire TV Remote كامل
- [x] تحكم بلوحة المفاتيح والGamepad  
- [x] تنقل شبكي ذكي للشخصيات
- [x] تركيز تلقائي للعناصر
- [x] واجهة لمس للأجهزة اللوحية

### ✅ نظام الشراءات
- [x] هيكل Amazon IAP جاهز
- [x] 6 شخصيات مجانية + 6 مدفوعة
- [x] حفظ المشتريات محلياً
- [x] وظيفة استعادة المشتريات
- [x] واجهة شراء تفاعلية

### ✅ الأصول المرئية
- [x] 12 أيقونة شخصية مولدة بالذكي الاصطناعي
- [x] شعار تطبيق احترافي
- [x] بانر تلفاز بدقة عالية
- [x] ملفات صوت ومقاطع فيديو placeholder

### ✅ التحسينات المتقدمة
- [x] وضع landscape-only مع تحذير
- [x] معالجة أخطاء الميديا
- [x] SEO metadata محسن
- [x] إمكانية الوصول للمعاقين
- [x] تحسينات الأداء

---

## 🚀 الخطوات التالية للنشر

### 1. 📁 إعداد ملفات الميديا الحقيقية
- استبدال ملفات الفيديو placeholder بمحتوى حقيقي
- إضافة ملفات الصوت للرنين والتأثيرات
- تحسين أحجام الملفات للأداء

### 2. 🔧 إعداد Cordova/Capacitor
- إضافة plugins للكاميرا والصوت
- إعداد Amazon IAP SDK
- إضافة OneSignal للإشعارات
- إعداد permissions مناسبة

### 3. 🏪 النشر على Amazon App Store
- إنشاء حساب Amazon Developer
- إعداد IAP products في Amazon Console
- تحضير screenshots وmetadata
- اختبار على Fire TV أجهزة حقيقية

### 4. 🔔 إعداد الإشعارات
- ربط OneSignal account
- إعداد Amazon ADM
- إنشاء إشعارات تفاعلية
- جدولة إشعارات دورية

### 5. 📊 التحليلات والمتابعة
- إضافة Google Analytics
- مراقبة استخدام الميزات
- تحليل معدلات الشراء
- تحسينات مستمرة

---

## 📞 معلومات الدعم التقني

### 🔧 المتطلبات التقنية
- **Fire OS 5.0+** أو **Android 5.0+**
- **1GB RAM** minimum
- **50MB** storage space
- **Internet connection** للمشتريات

### 📱 الأجهزة المدعومة
- **Fire TV Stick** (جميع الأجيال)
- **Fire TV Cube**
- **Fire TV Edition TVs**
- **Android Tablets** (7" فأكبر)
- **iPad** (9.7" فأكبر)

### 🎮 طرق التحكم المدعومة
- Fire TV Voice Remote
- Fire TV Gaming Controller
- أي Bluetooth gamepad متوافق
- لوحة مفاتيح USB/Bluetooth
- واجهة اللمس للأجهزة اللوحية

---

## 📄 ملاحظات مهمة

### ⚠️ تحذيرات
- التطبيق يتطلب **وضع landscape** إجباري
- ملفات الفيديو والصوت حالياً **placeholder** تحتاج استبدال
- نظام الشراءات يحتاج **إعداد Amazon Developer Account**
- الإشعارات تتطلب **مفاتيح OneSignal وAmazon ADM**

### ✨ مميزات فريدة
- **تصميم مُحسن خصيصاً للتلفاز** مع تنقل ريموت احترافي
- **دعم شامل لجميع طرق التحكم** بدون تعقيد
- **نظام شراءات متكامل** مع Amazon IAP
- **واجهة عربية** قابلة للتدويل بسهولة
- **أداء عالي** مع تحميل سريع

---

## 👨‍💻 معلومات المطور

**تم تطوير هذا المشروع بواسطة**: Lovable AI  
**التاريخ**: سبتمبر 2024  
**الإصدار**: 1.0.0  
**الترخيص**: MIT License  

**للدعم التقني أو الاستفسارات**:
- Documentation: [Lovable Docs](https://docs.lovable.dev/)
- Community: [Lovable Discord](https://discord.com/channels/1119885301872070706/1280461670979993613)
- YouTube: [Lovable Tutorials](https://www.youtube.com/watch?v=9KHLTZaJcR8&list=PLbVHz4urQBZkJiAWdG8HWoJTdgEysigIO)

---

*تم إنشاء هذا المشروع باستخدام Lovable - منصة تطوير التطبيقات بالذكاء الاصطناعي* 🚀