"use client"

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/utils/AuthContext';
import UniversalButton from '../components/UniversalButton';
import AuthButton from '../components/AuthButton';
import WelcomeScreen from '@/components/WelcomeScreen';
import Home from '@/components/Home';
import Header from '@/components/Header';

export default function Index() {
  const { isAuth } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col h-screen w-full">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <div className="flex items-center gap-4">
            <UniversalButton text="Home" href="/" ariaLabel="Navigate to Home" />
            {isAuth && <button onClick={showModal} className="p-2 bg-blue-500 text-white rounded">Add Card</button>}
          </div>
          <div>
            <AuthButton />
          </div>
        </div>
      </nav>

        <main className="animate-in flex flex-1 flex-col gap-20 opacity-0 max-w-4xl px-3">
          {!isAuth ? <Header /> : null}
          {isAuth ? <Home isModalOpen={isModalOpen} hideModal={hideModal} /> : <WelcomeScreen />}
        </main>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{' '}
          <a href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs" target="_blank" className="font-bold hover:underline" rel="noreferrer">
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
