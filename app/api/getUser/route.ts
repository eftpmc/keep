import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.auth.getUser();

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 401 });
    return new Response(JSON.stringify({ user: data.user }), { status: 200 });
};
