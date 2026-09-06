// import "./globals.css";
// import Navbar from "../components/Navbar";

// export const metadata = {
//   title: "رحلة إلى الجنة | Islamic Library",
//   description: "Islamic educational and library platform",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="ar" dir="rtl">
//       <body>
//         <Navbar />
//         <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
//       </body>
//     </html>
//   );
// }
import "./globals.css";
import Navbar from "../components/Navbar";
import StudyTimer from "../components/StudyTimer";
import ChatBot from "../components/ChatBot";
import { Analytics } from "@vercel/analytics/next"
export const metadata = {
  title: "منارة العلم | Islamic Library",
  description: "Islamic educational and library platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
        <StudyTimer />
           {/* <main className="max-w-6xl mx-auto px-4 py-6">{children}</main> */}
        <ChatBot />
        <Analytics />
      </body>
    </html>
  );
}