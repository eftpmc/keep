import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
        return new Response(JSON.stringify({ isAuthenticated: false }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }
    return new Response(JSON.stringify({ isAuthenticated: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
};
