import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export async function POST() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();

    return new Response(null, { status: 303, headers: { Location: '/login' } });
};
