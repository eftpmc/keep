import UniversalButton from '../components/UniversalButton'
import AddButton from '../components/AddButton'
import AuthButton from '../components/AuthButton'
import { createClient } from '@/utils/supabase/server'
import WelcomeScreen from '@/components/WelcomeScreen'
import Wardrobe from '@/components/Wardrobe'
import Header from '@/components/Header'
import { cookies } from 'next/headers'

export default async function Index() {
  const cookieStore = cookies()

  const canInitSupabaseClient = async () => {
    try {
      const supabase = createClient(cookieStore)
      const { data, error } = await supabase.auth.getSession()

      // Check if there's a session and no error
      if (data.session && !error) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error("Error initializing Supabase client:", e);
      return false;
    }
  }

  const isAuth = canInitSupabaseClient()

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <div className="flex items-center gap-4">
            <UniversalButton
              text="Home"
              href="/"
              ariaLabel="Navigate to Home"
            />
            <UniversalButton
              text="Wardrobe"
              href="/"
              ariaLabel="Navigate to Wardrobe"
            />
            <AddButton />
          </div>
          <div>
            <AuthButton />
          </div>
        </div>
      </nav>


      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        {await isAuth ? null : <Header />}
        <main className="flex-1 flex flex-col gap-6">
          {await isAuth ? <Wardrobe /> : <WelcomeScreen />}
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{' '}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  )
}
