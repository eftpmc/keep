import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export async function GET(req: Request) {
    const cookieStore = cookies();
    const { searchParams } = new URL(req.url);
    let date = searchParams.get('date');
    let timezoneOffset = parseInt(searchParams.get('timezoneOffset') || '0', 10);

    try {
        const supabase = createClient(cookieStore);

        // Retrieve user from the current session
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            throw new Error('No authenticated user found.');
        }

        const userId = user.id; // This is the user's UUID

        const startDate = new Date(`${date}T00:00:00Z`);
        startDate.setUTCMinutes(startDate.getUTCMinutes() + timezoneOffset);

        const endDate = new Date(startDate);
        endDate.setUTCDate(endDate.getUTCDate() + 1);

        let { data: cards, error } = await supabase
            .from('cards')
            .select('*')
            .eq('user_id', userId)
            .gte('createdDate', startDate.toISOString())
            .lt('createdDate', endDate.toISOString());

        if (error) throw error;

        return new Response(JSON.stringify(cards), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(JSON.stringify({ message: error.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
        return new Response(JSON.stringify({ message: "An unknown error occurred" }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
};
