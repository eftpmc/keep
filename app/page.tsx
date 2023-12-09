"use client"

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/utils/AuthContext';
import UniversalButton from '../components/UniversalButton';
import AuthButton from '../components/AuthButton';
import WelcomeScreen from '@/components/WelcomeScreen';
import Home from '@/components/Home';
import Header from '@/components/Header';
import DatePicker from '@/components/DatePicker';

export default function Index() {
  const { isAuth } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className="flex-1 w-full flex flex-col gap-5 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <div className="flex-1 flex justify-start items-center gap-4">
            <UniversalButton text="Home" href="/" ariaLabel="Navigate to Home" />
          </div>
          <div className="flex-1 flex justify-center items-center">
            <DatePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
          <div className="flex-1 flex justify-end items-center">
            <AuthButton />
          </div>
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl">
        {!isAuth ? <Header /> : null}
        <main className="flex-1 flex flex-col gap-6">
          {isAuth ? <Home selectedDate={selectedDate} /> : <WelcomeScreen />}
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Built by{' '}
          <a href="https://twitter.com/eftpmc" target="_blank" className="font-bold hover:underline" rel="noreferrer">
            ari
          </a>
          . The source code is available on{' '}
          <a href="https://github.com/eftpmc/keep" target="_blank" className="font-bold hover:underline" rel="noreferrer">
            GitHub
          </a>
          .
        </p>
      </footer>
    </div>
  );
}