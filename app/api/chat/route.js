import db from "@app/lib/db";
import { verifyJwtToken } from '@app/lib/jwt'
import Chat from "@/models/Chat";


export async function POST(req) {
    await db.connect();

    const accessToken = req.headers.get("authorization")
    const token = accessToken.split(' ')[1];
    const decodedToken = verifyJwtToken(token)
    if (!accessToken || !decodedToken) {
        return new Response(JSON.stringify({ error: "Wrong or expired token" }), { status: 403 });
    }

    try {
        const body = await req.json();
        const newMessage = await Chat.create(body)

        return new Response(JSON.stringify(newMessage), { status: 201 })
    } catch(error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }
}