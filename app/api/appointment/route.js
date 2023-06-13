import db from "@app/lib/db";
import { verifyJwtToken } from '@app/lib/jwt'
import Appointment from "@/models/Appointment";


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
        const newAppointment = await Appointment.create(body)

        return new Response(JSON.stringify(newAppointment), { status: 201 })
    } catch(error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }
}