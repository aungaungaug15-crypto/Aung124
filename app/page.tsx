'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };

    checkUser();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return <div style={{ padding: '20px', color: 'white', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', fontFamily: 'sans-serif', color: 'white' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
        <h2>🔥 Crypto Exchange Guide Dashboard</h2>
        <button 
          onClick={handleSignOut}
          style={{ padding: '8px 16px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Logout ထွက်မည်
        </button>
      </div>

      <p style={{ color: '#10b981', marginTop: '10px' }}>
        👋 မင်္ဂလာပါ <b>{user?.email}</b> (အကောင့်ဝင်ရောက်ထားပါသည်)
      </p>

      <hr style={{ borderColor: '#333', margin: '20px 0' }} />

      {/* Guide Content Section */}
      <h3>📌 သင်ခန်းစာ (၁) - Binance / Bybit အကောင့် ဖွင့်နည်း</h3>
      <p style={{ color: '#ccc', lineHeight: '1.6' }}>
        ဒီလမ်းညွှန်မှာ Crypto Exchange တွေမှာ အကောင့်ဖွင့်နည်းနဲ့ Identity Verification (KYC) ပြုလုပ်နည်း အသေးစိတ်ကို ကြည့်ရှုနိုင်ပါတယ်။
      </p>

      {/* Embedded Video Player */}
      <div style={{ marginTop: '15px', position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px' }}>
        <iframe
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Crypto Guide Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
