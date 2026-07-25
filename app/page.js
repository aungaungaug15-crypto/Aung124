'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // လက်ရှိ ဝင်ထားသော User ရှိမရှိ စစ်ဆေးခြင်း
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setUser(session.user)
      } else {
        // Login မဝင်ထားလျှင် Login စာမျက်နှာသို့ ပြန်ပို့မည်
        router.push('/login')
      }
    }
    checkUser()
  }, [router])

  // ထွက်ရန် (Sign Out)
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (!user) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">ပင်မစာမျက်နှာ (Home Page)</h1>
        <p className="text-gray-600 mb-6">ကြိုဆိုပါတယ်၊ <br/><span className="font-semibold text-blue-600">{user.email}</span></p>
        
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
        >
          အကောင့်မှ ထွက်မည် (Sign Out)
        </button>
      </div>
    </main>
  )
}

