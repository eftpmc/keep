"use client"

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/utils/AuthContext';
import UniversalButton from '../components/UniversalButton';
import AuthButton from '../components/AuthButton';
import WelcomeScreen from '@/components/WelcomeScreen';
import Home from '@/components/Home';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Index() {
  const { isAuth } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const formatDate = (date: Date | undefined) => {
    return date ? date.toLocaleDateString() : new Date().toLocaleDateString();
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-5 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <div className="flex-1 flex justify-start items-center gap-4">
            <UniversalButton text="Home" href="/" ariaLabel="Navigate to Home" />
          </div>
          <div className="flex-1 flex justify-center items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">{formatDate(selectedDate)}</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Change date</DialogTitle>
                  <DialogDescription>
                    Change the date to view past and future cards.
                  </DialogDescription>
                </DialogHeader>
                <div className='flex-1 flex justify-center items-center'>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex-1 flex justify-end items-center">
            <AuthButton />
          </div>
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl">
        {!isAuth ? <Header /> : null}
        <main className="flex-1 flex flex-col gap-6">
          {isAuth ? <Home selectedDate={selectedDate || new Date()} /> : <WelcomeScreen />}
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