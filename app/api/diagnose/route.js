import db from "@app/lib/db";
import Diagnose from "@/models/Diagnose";

export async function GET(req) {
    await db.connect();

    try {
        const diagnose = await Diagnose.find({})
        return new Response(JSON.stringify(diagnose), { status: 200 })
    } catch (err) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}