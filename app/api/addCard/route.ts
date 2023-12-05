import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
    const cookieStore = cookies();

    try {
        const supabase = createClient(cookieStore);
        const { title, imageUrl, description, link, createdDate } = await req.json();

        const createdDateObj = new Date(createdDate);

        const { data, error } = await supabase
            .from('cards')
            .insert([
                { title, link, imageUrl, description, createdDate: createdDateObj.toISOString() },
            ])
            .select()

        if (error) throw error;
        return new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } })
    } catch (error) {
        if (error instanceof Error) {
            return new Response(JSON.stringify({ message: error.message }), { status: 500, headers: { "Content-Type": "application/json" } })
        }
        return new Response(JSON.stringify({ message: "An unknown error occurred" }), { status: 500, headers: { "Content-Type": "application/json" } })
    }
};