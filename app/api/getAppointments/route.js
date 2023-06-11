import db from "@app/lib/db";
import { verifyJwtToken, verifyToken } from '@app/lib/jwt'
import Appointment from "@/models/Appointment";

export async function GET(req) {
    await db.connect();

    try {
        const appointments = await Appointment.find({})
        return new Response(JSON.stringify(appointments), { status: 200 })
    } catch (err) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}