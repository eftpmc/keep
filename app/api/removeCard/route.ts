import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
    const cookieStore = cookies();

    try {
        const supabase = createClient(cookieStore);
        const id = await req.json();
        console.log(id)
        const { error } = await supabase
            .from('cards')
            .delete()
            .match({ 'id': id });

        if (error) throw error;
        return new Response(JSON.stringify({ message: "Removed card" }), { status: 200, headers: { "Content-Type": "application/json" } })
    } catch (error) {
        if (error instanceof Error) {
            return new Response(JSON.stringify({ message: error.message }), { status: 500, headers: { "Content-Type": "application/json" } })
        }
        return new Response(JSON.stringify({ message: "An unknown error occurred" }), { status: 500, headers: { "Content-Type": "application/json" } })
    }
};