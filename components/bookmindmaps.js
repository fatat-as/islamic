"use client";
import { useState } from "react";

export default function BookMindMap({ bookTitle }) {
  const [centralIdea, setCentralIdea] = useState(bookTitle || "عنوان الكتاب الرئيسي");
  const [branches, setBranches] = useState([
    { id: 1, text: "" },
    { id: 2, text: "" },
    { id: 3, text: "" },
    { id: 4, text: "" },
  ]);
  const [isSaved, setIsSaved] = useState(false);

  const handleBranchChange = (index, value) => {
    const newBranches = [...branches];
    newBranches[index].text = value;
    setBranches(newBranches);
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    // يمكنك ربطها لاحقاً بقاعدة البيانات (Supabase) لحفظ أفكار المستخدم
  };

  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-white rounded-3xl shadow-sm border border-gray-100 text-center">
      <h2 className="text-xl font-bold mb-1 text-primary">maza ta3lmt  </h2>
      <p className="text-xs text-gray-400 mb-6">قومي بتلخيص أهم الأفكار والدروس المستفادة بأسلوبك الخاص</p>

      {/* العقدة المركزية (العنوان) */}
      <div className="mb-6">
        <div className="inline-block bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-sm">
          ✨ {centralIdea} ✨
        </div>
      </div>

      {/* خطوط التوصيل البصرية */}
      <div className="w-0.5 h-6 bg-primary/30 mx-auto mb-2"></div>

      {/* فروع الخريطة الذهنية (حيث يكتب المستخدم أفكاره) */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {branches.map((branch, index) => (
          <div key={branch.id} className="relative">
            <input
              type="text"
              value={branch.text}
              onChange={(e) => handleBranchChange(index, e.target.value)}
              placeholder={`الفكرة الرئيسية ${index + 1}...`}
              className="w-full py-3 px-4 bg-gray-50 hover:bg-gray-100 focus:bg-white border border-gray-100 focus:border-primary rounded-xl text-xs font-medium text-gray-700 outline-none transition-all shadow-sm text-center"
            />
          </div>
        ))}
      </div>

      {/* زر الحفظ */}
      <button
        onClick={handleSave}
        className={`w-full py-3 rounded-xl font-bold text-xs transition-all shadow-sm ${
          isSaved
            ? "bg-green-500 text-white"
            : "bg-primary text-white hover:opacity-90"
        }`}
      >
        {isSaved ? "تم حفظ أفكارك في الخريطة بنجاح! 🎉" : "حفظ الخريطة الذهنية 💾"}
      </button>
    </div>
  );
}