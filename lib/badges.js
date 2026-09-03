// import { supabase } from "./supabaseClient";
// // مثال داخل المكون الخاص بك
// const userProgress = 50;
// import Image  from "next/image";
// import myImage from "./badges/emag.jpeg";
// export const BADGE_DEFINITIONS = [
//   { key: "finished_reading", icon: '<img src={myImage}/>' , label: "أنهى القراءة", description: "أكملت قراءة الكتاب بالكامل" },
//   { key: "quiz_master", icon: "🏆", label: "علامة كاملة", description: "أجبت على كل أسئلة الاختبار بشكل صحيح" },
//   { key: "video_complete", icon: "🎬", label: "شاهد كل الفيديوهات", description: "أنهيت مشاهدة كل فيديوهات الشرح" },
//   { key: "shared_knowledge", icon: "💬", label: "شارك بالنقاش", description: "شاركت ما تعلمته مع باقي المستخدمين" },
// ];

// // يمنح بطاقة إنجاز للمستخدم إذا لم يكن قد حصل عليها من قبل (upsert آمن، ما بيكرر)
// export async function awardBadge(userId, bookId, badgeKey) {
//   if (!userId || !bookId) return;
//   await supabase
//     .from("user_badges")
//     .upsert({ user_id: userId, book_id: bookId, badge_key: badgeKey }, { onConflict: "user_id,book_id,badge_key" });
// }
import { supabase } from "./supabaseClient";

export const BADGE_DEFINITIONS = [
  {
    key: "finished_reading",
    iconType: "image",
    icon: "/images/badges/cent.jpeg",
    label: "أنهى القراءة",
    description: "أكملت قراءة الكتاب بالكامل",
  },
  { key: "quiz_master", iconType: "image", icon: "/images/badges/fii.jpeg", label: "علامة كاملة", description: "أجبت على كل أسئلة الاختبار بشكل صحيح" },
  { key: "video_complete", iconType: "image", icon: "/images/badges/video.jpeg", label: "شاهد كل الفيديوهات", description: "أنهيت مشاهدة كل فيديوهات الشرح" },
  { key: "shared_knowledge", iconType: "image", icon: "/images/badges/chat.jpeg", label: "شارك بالنقاش", description: "شاركت ما تعلمته مع باقي المستخدمين" },
];

// يمنح بطاقة إنجاز للمستخدم إذا لم يكن قد حصل عليها من قبل (upsert آمن، ما بيكرر)
export async function awardBadge(userId, bookId, badgeKey) {
  if (!userId || !bookId) return;
  await supabase
    .from("user_badges")
    .upsert({ user_id: userId, book_id: bookId, badge_key: badgeKey }, { onConflict: "user_id,book_id,badge_key" });
}
