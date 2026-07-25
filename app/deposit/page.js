"use client";
import { useState } from "react";
import Link from "next/link";

export default function Deposit() {
  const [method, setMethod] = useState("kpay");
  const [amount, setAmount] = useState("");
  const [transId, setTransId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !transId) {
      alert("ကျေးဇူးပြု၍ ပမာဏနှင့် Transaction ID ကို ဖြည့်ပေးပါ!");
      return;
    }
    setMessage("ငွေဖြည့်တောင်းဆိုမှု အောင်မြင်ပါသည်။ Admin အတည်ပြုပေးသည်အထိ ခဏစောင့်ဆိုင်းပေးပါ။");
  };

  return (
    <div style={{ backgroundColor: "#0f172a", minHeight: "100vh", color: "white", fontFamily: "sans-serif", padding: "20px" }}>
      <div style={{ maxWidth: "500px", margin: "20px auto", backgroundColor: "#1e293b", padding: "25px", borderRadius: "10px" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2>💳 Deposit (ငွေဖြည့်ရန်)</h2>
          <Link href="/dashboard" style={{ color: "#38bdf8", textDecoration: "none" }}>
            ← Back
          </Link>
        </div>

        {/* Payment Method Selection */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button 
            onClick={() => setMethod("kpay")}
            style={{ flex: 1, padding: "10px", backgroundColor: method === "kpay" ? "#2563eb" : "#334155", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            🔵 KBZ Pay
          </button>
          <button 
            onClick={() => setMethod("wavepay")}
            style={{ flex: 1, padding: "10px", backgroundColor: method === "wavepay" ? "#eab308" : "#334155", color: "black", fontWeight: "bold", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            🟡 Wave Pay
          </button>
        </div>

        {/* Account Info Details */}
        <div style={{ padding: "15px", backgroundColor: "#0f172a", borderRadius: "8px", marginBottom: "20px", border: "1px solid #334155" }}>
          <p style={{ margin: "5px 0", color: "#94a3b8" }}>Account Name: <b>Admin Store</b></p>
          <p style={{ margin: "5px 0", color: "#94a3b8" }}>Phone Number: <b style={{ color: "#38bdf8" }}>09 123 456 789</b></p>
          <p style={{ margin: "5px 0", fontSize: "12px", color: "#facc15" }}>* အထက်ပါ ဖုန်းနံပါတ်သို့ ငွေလွှဲပြီးပါက အောက်ပါ Form တွင် တင်ပြပေးပါ။</p>
        </div>

        {/* Deposit Form */}
        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", marginBottom: "5px" }}>ငွေပမာဏ (MMK):</label>
          <input 
            type="number" 
            placeholder="ဥပမာ - 5000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #475569", backgroundColor: "#0f172a", color: "white", marginBottom: "15px", boxSizing: "border-box" }}
          />

          <label style={{ display: "block", marginBottom: "5px" }}>Transaction Last 6 Digits / ID:</label>
          <input 
            type="text" 
            placeholder="ဥပမာ - 123456"
            value={transId}
            onChange={(e) => setTransId(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #475569", backgroundColor: "#0f172a", color: "white", marginBottom: "20px", boxSizing: "border-box" }}
          />

          <button 
            type="submit"
            style={{ width: "100%", padding: "12px", backgroundColor: "#22c55e", color: "white", fontWeight: "bold", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            Submit Request
          </button>
        </form>

        {message && (
          <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#065f46", color: "#34d399", borderRadius: "5px", textAlign: "center" }}>
            {message}
          </div>
        )}

      </div>
    </div>
  );
}
