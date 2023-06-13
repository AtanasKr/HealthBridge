import db from "@app/lib/db";
import Chat from "@/models/Chat";

export async function GET(req) {
    await db.connect();

    try {
        const chats = await Chat.find({})
        return new Response(JSON.stringify(chats), { status: 200 })
    } catch (err) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}