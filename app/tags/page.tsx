"use client"

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/utils/AuthContext';
import UniversalButton from '@/components/UniversalButton';
import AuthButton from '@/components/AuthButton';
import { createClient } from '@supabase/supabase-js';
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { LuAlignJustify, LuFolder } from "react-icons/lu";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SERVICE!);

export default function Index() {
    const { isAuth } = useAuth();
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        const fetchCards = async () => {
            let { data, error } = await supabase
                .from('cards')
                .select('tags')
                .not('tags', 'is', null);

            if (error) {
                console.error('Error fetching cards:', error);
            } else if (data) {
                const extractedTags = data.map(card => card.tags).flat();
                const uniqueTags = Array.from(new Set(extractedTags));
                setTags(uniqueTags);
            }
        };

        fetchCards();
    }, []);

    return (
        <div className="flex-1 w-full flex flex-col gap-5 items-center">
            <Sheet>
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                    <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                        <div className="flex-1 flex justify-start items-center gap-4">
                            <SheetTrigger asChild>
                                <Button className="sm:hidden">
                                    <LuAlignJustify size={20} />
                                </Button>
                            </SheetTrigger>
                            <div className="hidden sm:flex gap-4">
                                <UniversalButton text="Home" href="/" ariaLabel="Navigate to Home" />
                                <UniversalButton text="Tags" href="/tags" ariaLabel="Navigate to Tags" />
                            </div>
                        </div>
                        <div className="flex-1 flex justify-end items-center">
                            <AuthButton />
                        </div>
                    </div>
                </nav>

                <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl">
                    <main className="flex-1 flex items-center gap-6 p-4">
                        {tags.map(tag => (
                            <div key={tag} className="flex flex-col text-center gap-2">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">
                                            <LuFolder size={24} />
                                        </Button>
                                    </DialogTrigger>
                                    <span>{tag}</span>
                                    <DialogContent className="min-w-full min-h-full">
                                        <DialogHeader>
                                            <DialogTitle>{tag}</DialogTitle>
                                            <DialogDescription>
                                                View tagged cards.
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        ))}
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
                <SheetContent side="top">
                    <SheetHeader>
                        <SheetTitle>Nav Menu</SheetTitle>
                    </SheetHeader>
                    <div className="p-4 space-y-4">
                        <UniversalButton text="Home" href="/" ariaLabel="Navigate to Home" />
                        <UniversalButton text="Tags" href="/tags" ariaLabel="Navigate to Tags" />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}