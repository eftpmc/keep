import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    try {
        // Retrieve user from the current session
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            throw new Error('No authenticated user found.');
        }

        const userId = user.id;

        // Parse the request body
        const { title, imageUrl, description, link, createdDate } = await req.json();
        const createdDateObj = new Date(createdDate);

        // Insert the card with the user ID
        const { data, error } = await supabase
            .from('cards')
            .insert([
                {
                    title,
                    link,
                    imageUrl,
                    description,
                    createdDate: createdDateObj.toISOString(),
                    user_id: userId,
                },
            ])
            .select();

        if (error) {
            throw error;
        }

        return new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(JSON.stringify({ message: error.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
        return new Response(JSON.stringify({ message: "An unknown error occurred" }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
};