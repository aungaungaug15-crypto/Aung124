"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        router.push("/dashboard");
      }
    });
  }, [router]);

  const handleLogin = async () => {
    setMessage("Login ဝင်နေပါသည်...");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Login ဝင်ရောက်မှု အောင်မြင်ပါသည်။");
      router.push("/dashboard");
    }
  };

  const handleRegister = async () => {
    setMessage("အကောင့်ဖွင့်နေပါသည်...");
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("အကောင့်ဖွင့်ခြင်း အောင်မြင်ပါသည်။ Email စစ်ပေးပါ။");
    }
  };

  return (
    <div style={{ backgroundColor: "#0f172a", minHeight: "100vh", color: "white", padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "400px", margin: "50px auto", backgroundColor: "#1e293b", padding: "25px", borderRadius: "10px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.5)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#38bdf8" }}>📱 Myanmar OTP Store</h2>
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "12px", marginBottom: "10px", boxSizing: "border-box", borderRadius: "5px", border: "1px solid #475569", backgroundColor: "#0f172a", color: "white" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "12px", marginBottom: "15px", boxSizing: "border-box", borderRadius: "5px", border: "1px solid #475569", backgroundColor: "#0f172a", color: "white" }}
        />
        
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handleLogin}
            style={{ flex: 1, padding: "12px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}
          >
            Login
          </button>
          <button
            onClick={handleRegister}
            style={{ flex: 1, padding: "12px", backgroundColor: "#10b981", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}
          >
            Register
          </button>
        </div>

        {message && (
          <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#334155", color: "#facc15", borderRadius: "5px", textAlign: "center" }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
