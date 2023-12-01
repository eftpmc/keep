import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
    const cookieStore = cookies();

    try {
        const supabase = createClient(cookieStore);
        let { data: cards, error } = await supabase
            .from('cards')
            .select('*')

        if (error) throw error;
        return new Response(JSON.stringify(cards), { status: 200, headers: { "Content-Type": "application/json" } })
    } catch (error) {
        if (error instanceof Error) {
            return new Response(JSON.stringify({ message: error.message }), { status: 500, headers: { "Content-Type": "application/json" } })
        }
        return new Response(JSON.stringify({ message: "An unknown error occurred" }), { status: 500, headers: { "Content-Type": "application/json" } })
    }
};