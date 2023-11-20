import Link from 'next/link'

export default function WelcomeScreen() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-bold text-4xl mb-4 text-center">Welcome to Ward</h2>

      <p className="text-center">
        Discover the easiest way to manage your wardrobe, create outfits, and explore fashion trends.
      </p>

      <div className="text-center mt-6">
        Already have an account? 
        <Link href="/login">
          <span className="font-bold hover:underline text-foreground/80 ml-2 cursor-pointer">
            Log In
          </span>
        </Link>
      </div>
    </div>
  )
}
