import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export async function GET(req: Request) {
    const cookieStore = cookies();
    const { searchParams } = new URL(req.url)
    let date = searchParams.get('date')

    console.log(date)

    try {
        const supabase = createClient(cookieStore);

        const startDate = new Date(`${date}T00:00:00Z`); // Start of the day in UTC
        const endDate = new Date(startDate);
        endDate.setUTCDate(endDate.getUTCDate() + 1);

        let { data: cards, error } = await supabase
            .from('cards')
            .select('*')
            .gte('createdDate', startDate.toISOString())
            .lt('createdDate', endDate.toISOString());

        return new Response(JSON.stringify(cards), { status: 200, headers: { "Content-Type": "application/json" } })
    } catch (error) {
        if (error instanceof Error) {
            return new Response(JSON.stringify({ message: error.message }), { status: 500, headers: { "Content-Type": "application/json" } })
        }
        return new Response(JSON.stringify({ message: "An unknown error occurred" }), { status: 500, headers: { "Content-Type": "application/json" } })
    }
};