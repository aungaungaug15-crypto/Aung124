'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient' // သင့်ရဲ့ supabaseClient ဖိုင်ရှိရာ လမ်းကြောင်းအတိုင်း ပြင်ပါ

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // အကောင့်သစ်ဖွင့်ခြင်း (Register)
  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('အကောင့်ဖွင့်ခြင်းအောင်မြင်ပါသည်! Email ကိုဝင်၍ Verify လုပ်ပါ။')
    }
    setLoading(false)
  }

  // အကောင့်ဝင်ခြင်း (Login)
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('အကောင့်ဝင်ရောက်ခြင်း အောင်မြင်ပါသည်!')
      // Dashboard သို့ Redirect လုပ်ရန် ဤနေရာတွင် ထည့်နိုင်သည်
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form className="p-8 bg-white shadow-md rounded-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login / Register</h2>
        
        {message && <p className="mb-4 text-sm text-center text-blue-600">{message}</p>}

        <input
          type="email"
          placeholder="Email ရိုက်ထည့်ပါ"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password ရိုက်ထည့်ပါ"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <div className="flex space-x-2">
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
          <button
            onClick={handleSignUp}
            disabled={loading}
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  )
}

