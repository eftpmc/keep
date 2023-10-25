'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase';

export default function Header({ session }: { session: Session | null }) {
    const supabase = createClientComponentClient<Database>();
    const router = useRouter(); // creating a router instance using the hook

    // Function to handle the redirection
    const goToAccountPage = () => {
        router.push('/account'); // using the 'push' method to navigate to the account page
    };

    const goToHomePage = () => {
        router.push('/home'); // using the 'push' method to navigate to the account page
    };

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #ccc' }}>
            <div>
                <button className="button" onClick={goToHomePage}>
                    Home
                </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button className="button" onClick={goToAccountPage} style={{ marginRight: '10px' }}>
                    Account
                </button>
                <form action="/auth/signout" method="post">
                    <button className="button" type="submit">
                        Sign out
                    </button>
                </form>
            </div>
        </header>
    );
};
