import Link from 'next/link'

export default function WelcomeScreen() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <p className="text-center text-lg">
        Discover the easiest way to manage your thoughts, keep track of tasks, and understand yourself better.
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
