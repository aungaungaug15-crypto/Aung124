"use client";
import { useState } from "react";
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
    <div style={{ padding: "20px", maxWidth: "400px", margin: "50px auto", fontFamily: "sans-serif" }}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "15px", boxSizing: "border-box" }}
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={handleLogin}
          style={{ flex: 1, padding: "10px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Login
        </button>
        <button
          onClick={handleRegister}
          style={{ flex: 1, padding: "10px", backgroundColor: "#10b981", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Register
        </button>
      </div>
      {message && (
        <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#333", color: "gold", borderRadius: "5px" }}>
          {message}
        </div>
      )}
    </div>
  );
}
