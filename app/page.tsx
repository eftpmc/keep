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

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <div className="flex items-center gap-4">
            <UniversalButton text="Home" href="/" ariaLabel="Navigate to Home" />
            <UniversalButton text="Calender" href="/" ariaLabel="Navigate to Calender" />
          </div>
          <div>
            <AuthButton />
          </div>
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        {!isAuth ? <Header /> : null}
        <main className="flex-1 flex flex-col gap-6">
          {isAuth ? <Home /> : <WelcomeScreen />}
        </main>
      </div>

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
