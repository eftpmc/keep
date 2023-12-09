import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/utils/AuthContext';
import { Button } from "@/components/ui/button"

interface User {
  email: string;
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }
    
    window.addEventListener("resize", handleResize);
    
    handleResize(); // Call the function initially to set the state

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}


export default function AuthButton() {
  const { isAuth, setIsAuth } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const { width } = useWindowSize();

  const isLargeScreen = width > 768;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/getUser');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user); // Set the user data
          setIsAuth(!!data.user); // Update global auth state
        } else {
          setIsAuth(false);
          setUser(null); // Clear user data if unauthorized
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [setIsAuth]);

  const signOut = async () => {
    await fetch('/api/signOut', { method: 'POST' });
    setIsAuth(false);
    setUser(null); // Clear user data on sign out
  };

  return isAuth && user ? (
    <div className="flex items-center gap-4">
      {isLargeScreen && <>Hey, {user.email}!</>}
      <Button onClick={signOut} className="py-2 px-4 text-white">Logout</Button>
    </div>
  ) : (
    <Link href="/login" className="py-2 px-3 flex rounded-md no-underline bg-purple text-white hover:bg-purple/80">
      Login
    </Link>
  );
}
