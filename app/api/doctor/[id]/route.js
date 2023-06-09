import db from "@app/lib/db";
import { verifyJwtToken, verifyToken } from '@app/lib/jwt'
import User from "@/models/User";

export async function GET(req, ctx){
    await db.connect();

    try{
        const user = await User.find({_id:ctx.params.id})
        return new Response(JSON.stringify(user), { status: 200 })
    }catch{
        return new Response(JSON.stringify(null).status(500))
    }
}