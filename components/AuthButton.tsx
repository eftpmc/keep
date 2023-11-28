import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/utils/AuthContext';

export default function AuthButton() {
  const { isAuth, setIsAuth } = useAuth();
  const [user, setUser] = useState(null); // Reintroduce the user state

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
      Hey, {user.email}!
      <button onClick={signOut} className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
        Logout
      </button>
    </div>
  ) : (
    <Link href="/login" className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
      Login
    </Link>
  );
}
