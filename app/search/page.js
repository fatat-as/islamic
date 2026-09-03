import Script from "next/script";

export const metadata = {
  title: "ابحث بالمواقع الموثوقة | منارة العلم",
};

export default function TrustedSearchPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-2">ابحث بالمواقع الموثوقة</h1>
      <p className="text-gray-600 mb-6">
       ( هذا البحث مقيّد بمواقع شرعية موثوقة كـ الدرر السنية، موقع ابن باز، ابن عثيمين، إسلام ويب، إسلام سؤال وجواب...).
      </p>

      <div className="bg-white rounded-2xl p-4 border border-gray-100">
        <div className="gcse-search"></div>
      </div>

      {/* سكريبت گوگل الرسمي لعرض صندوق البحث — مجاني بالكامل وبلا حدود */}
      <Script async src="https://cse.google.com/cse.js?cx=33f88649d82cc46bc" strategy="afterInteractive" />
    </div>
  );
}