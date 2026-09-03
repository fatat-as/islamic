"use client";
import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Create matching profile row
    if (data.user) {
      await supabase.from("profiles").insert({ id: data.user.id, full_name: fullName });
    }

    setLoading(false);
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto mt-10 card">
      <h1 className="text-2xl font-bold mb-4 text-primary">إنشاء حساب جديد</h1>
      <form onSubmit={handleSignUp} className="flex flex-col gap-3">
        <input
          type="text" placeholder="الاسم الكامل" required
          className="border rounded-lg p-2"
          value={fullName} onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email" placeholder="البريد الإلكتروني" required
          className="border rounded-lg p-2"
          value={email} onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password" placeholder="كلمة المرور (6 أحرف على الأقل)" required minLength={6}
          className="border rounded-lg p-2"
          value={password} onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "جارٍ الإنشاء..." : "إنشاء حساب"}
        </button>
      </form>
      <p className="mt-4 text-sm">
        لديك حساب بالفعل؟ <a href="/auth/signin" className="text-primary font-semibold">تسجيل الدخول</a>
      </p>
    </div>
  );
}
