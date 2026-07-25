"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0.00);
  const [selectedService, setSelectedService] = useState("");
  const [otpNumber, setOtpNumber] = useState("");
  const [receivedOtp, setReceivedOtp] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        window.location.href = "/";
      } else {
        setUser(user);
      }
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const handleBuyNumber = () => {
    if (!selectedService) {
      alert("ကျေးဇူးပြု၍ Service တစ်ခု ရွေးချယ်ပါ!");
      return;
    }
    // နမူနာ ဖုန်းနံပါတ် (+959...)
    setOtpNumber("+95 9 7912 34567");
    setReceivedOtp("Waiting for SMS...");
  };

  return (
    <div style={{ backgroundColor: "#0f172a", minHeight: "100vh", color: "white", fontFamily: "sans-serif", padding: "20px" }}>
      {/* Header Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #334155", paddingBottom: "15px" }}>
        <h2>📱 Myanmar OTP Store</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span style={{ backgroundColor: "#1e293b", padding: "8px 15px", borderRadius: "20px", border: "1px solid #3b82f6" }}>
            💰 Balance: <b>${balance.toFixed(2)}</b>
          </span>
          <button onClick={handleLogout} style={{ backgroundColor: "#ef4444", color: "white", border: "none", padding: "8px 15px", borderRadius: "5px", cursor: "pointer" }}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: "600px", margin: "30px auto", backgroundColor: "#1e293b", padding: "25px", borderRadius: "10px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.5)" }}>
        
        {/* Country Selector */}
        <h3 style={{ marginBottom: "10px" }}>1. Country</h3>
        <div style={{ padding: "12px", borderRadius: "5px", border: "1px solid #3b82f6", backgroundColor: "#0f172a", color: "#38bdf8", marginBottom: "20px", fontWeight: "bold" }}>
          🇲🇲 Myanmar (+95)
        </div>

        {/* Service Selector */}
        <h3 style={{ marginBottom: "10px" }}>2. Select Service</h3>
        <select 
          onChange={(e) => setSelectedService(e.target.value)}
          style={{ width: "100%", padding: "12px", borderRadius: "5px", border: "1px solid #475569", backgroundColor: "#0f172a", color: "white", marginBottom: "20px" }}
        >
          <option value="">-- Select App --</option>
          <option value="facebook">Facebook ($0.30)</option>
          <option value="kbzpay">KBZ Pay ($0.50)</option>
          <option value="wavepay">Wave Pay ($0.50)</option>
        </select>

        <button 
          onClick={handleBuyNumber}
          style={{ width: "100%", padding: "12px", backgroundColor: "#22c55e", color: "white", fontWeight: "bold", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }}
        >
          Get Myanmar Number
        </button>

        {/* OTP Output Box */}
        {otpNumber && (
          <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#0f172a", borderRadius: "8px", border: "1px solid #334155" }}>
            <p style={{ margin: "5px 0", color: "#94a3b8" }}>Myanmar Phone Number:</p>
            <h3 style={{ margin: "5px 0", color: "#38bdf8" }}>{otpNumber}</h3>
            
            <p style={{ margin: "15px 0 5px 0", color: "#94a3b8" }}>Received OTP Code:</p>
            <div style={{ padding: "10px", backgroundColor: "#1e293b", color: "#facc15", borderRadius: "5px", fontWeight: "bold" }}>
              {receivedOtp}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
