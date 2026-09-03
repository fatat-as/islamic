"use client";
import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto mt-10 card">
      <h1 className="text-2xl font-bold mb-4 text-primary">تسجيل الدخول</h1>
      <form onSubmit={handleSignIn} className="flex flex-col gap-3">
        <input
          type="email" placeholder="البريد الإلكتروني" required
          className="border rounded-lg p-2"
          value={email} onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password" placeholder="كلمة المرور" required
          className="border rounded-lg p-2"
          value={password} onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "جارٍ الدخول..." : "دخول"}
        </button>
      </form>
      <p className="mt-4 text-sm">
        ليس لديك حساب؟ <a href="/auth/signup" className="text-primary font-semibold">أنشئ حسابًا</a>
      </p>
    </div>
  );
}
