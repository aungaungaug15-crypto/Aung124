'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Login ဝင်ရန်
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) {
      setMessage('Error: ' + error.message)
      setLoading(false)
    } else {
      setMessage('Login ဝင်ရောက်မှု အောင်မြင်ပါသည်။')
      // ချက်ချင်း သို့မဟုတ် ၁ စက္ကန့်အကြာတွင် Home Page သို့ ကူးပြောင်းရန်
      setTimeout(() => {
        router.push('/')
      }, 1000)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {message && (
          <p className="mt-4 p-2 text-center text-sm bg-gray-800 text-white rounded">
            {message}
          </p>
        )}
      </div>
    </main>
  )
}

