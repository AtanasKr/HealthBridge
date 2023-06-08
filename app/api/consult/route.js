import db from "@app/lib/db";
import { verifyJwtToken, verifyToken } from '@app/lib/jwt'
import User from "@/models/User";

export async function GET(req){
    await db.connect();

    try{
        const users = await User.find({role:"doctor"})
        return new Response(JSON.stringify(users), { status: 200 })
    }catch(err){
        return new Response(JSON.stringify(null), { status: 500 })
    }
}