"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const handleAuth = async (e) => {
    e.preventDefault();
    if (isLogin) {
      setMessage("Login ဝင်နေပါသည်...");
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage("Error: " + error.message);
      else router.push("/dashboard");
    } else {
      setMessage("အကောင့်ဖွင့်နေပါသည်...");
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      });
      if (error) setMessage("Error: " + error.message);
      else setMessage("အကောင့်ဖွင့်ခြင်း အောင်မြင်ပါသည်။ Email စစ်ပေးပါ။");
    }
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ backgroundColor: "#ffffff", width: "100%", maxWidth: "450px", padding: "35px 25px", borderRadius: "16px", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)" }}>
        
        <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#0f172a", marginBottom: "8px" }}>
          {isLogin ? "Welcome back" : "Create your account"}
        </h2>
        <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "25px" }}>
          {isLogin ? "Sign in to manage your OTP services." : "Start receiving SMS easily. It takes less than a minute."}
        </p>

        <form onSubmit={handleAuth}>
          {!isLogin && (
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Full name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1.5px solid #cbd5e1", fontSize: "15px", boxSizing: "border-box", outline: "none" }}
              />
            </div>
          )}

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1.5px solid #cbd5e1", fontSize: "15px", boxSizing: "border-box", outline: "none" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Password</label>
            <input
              type="password"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1.5px solid #cbd5e1", fontSize: "15px", boxSizing: "border-box", outline: "none" }}
            />
          </div>

          <button
            type="submit"
            style={{ width: "100%", padding: "14px", backgroundColor: "#2563eb", color: "white", fontWeight: "bold", fontSize: "16px", border: "none", borderRadius: "10px", cursor: "pointer", boxShadow: "0 4px 12px rgba(37,99,235,0.2)" }}
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div style={{ marginTop: "20px", textAlign: "center", fontSize: "14px", color: "#64748b" }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ color: "#2563eb", fontWeight: "bold", cursor: "pointer" }}
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </span>
        </div>

        {message && (
          <div style={{ marginTop: "20px", padding: "12px", backgroundColor: "#f1f5f9", color: "#0f172a", borderRadius: "8px", fontSize: "14px", textAlign: "center" }}>
            {message}
          </div>
        )}

      </div>
    </div>
  );
}
