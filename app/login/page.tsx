'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    setMessage('Processing...');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setMessage('Error: ' + error.message);
    else setMessage('အကောင့်ဖွင့်ခြင်း အောင်မြင်ပါသည်။ Email ကို စစ်ဆေးပါ။');
  };

  const handleSignIn = async () => {
    setMessage('Processing...');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage('Error: ' + error.message);
    else setMessage('Login ဝင်ရောက်မှု အောင်မြင်ပါသည်။');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', fontFamily: 'sans-serif', color: 'black' }}>
      <h2 style={{ color: 'white' }}>Crypto Guide App - Login</h2>
      <input
        type="email"
        placeholder="Email ရိုက်ထည့်ပါ"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <input
        type="password"
        placeholder="Password ရိုက်ထည့်ပါ"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <button 
          onClick={handleSignIn} 
          style={{ flex: 1, padding: '12px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Login
        </button>
        <button 
          onClick={handleSignUp} 
          style={{ flex: 1, padding: '12px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Register
        </button>
      </div>
      {message && <p style={{ marginTop: '20px', padding: '10px', backgroundColor: '#333', color: 'yellow', borderRadius: '5px' }}>{message}</p>}
    </div>
  );
}
