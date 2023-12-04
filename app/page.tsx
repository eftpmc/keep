"use client"

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/utils/AuthContext';
import UniversalButton from '../components/UniversalButton';
import AuthButton from '../components/AuthButton';
import WelcomeScreen from '@/components/WelcomeScreen';
import Home from '@/components/Home';
import Header from '@/components/Header';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Index() {
  const { isAuth } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const showForm = () => setIsFormOpen(true);
  const hideForm = () => setIsFormOpen(false);

  const handleDateChange = (date : any) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-5 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <div className="flex items-center gap-4">
            <UniversalButton text="Home" href="/" ariaLabel="Navigate to Home" />
            {isAuth && <button onClick={showForm} className="p-2 px-3 bg-blue-500 hover:bg-blue-700 text-white flex rounded-md no-underline border whitespace-nowrap">Add Card</button>}
          </div>
          <div className="flex-1 flex justify-center">
            <DatePicker
              className='bg-background text-center max-w-[100px]'
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy" // Format the date display
              onFocus={(e) => e.currentTarget.blur()}
            />
          </div>
          <div>
            <AuthButton />
          </div>
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl">
        {!isAuth ? <Header /> : null}
        <main className="flex-1 flex flex-col gap-6">
          {isAuth ? <Home isFormOpen={isFormOpen} hideForm={hideForm} selectedDate={selectedDate}/> : <WelcomeScreen />}
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