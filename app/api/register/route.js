import db from "@app/lib/db";
import bcrypt from 'bcrypt';
import User from '@/models/User'

export async function POST(req){
    try {
        await db.connect()

        const {username, email, password: pass, role, imageUrl, category, price, description} = await req.json()

        const isExisting = await User.findOne({email})

        if(isExisting){
            throw new Error("User already exists")
        }

        const hashedPassword = await bcrypt.hash(pass, 10)

        const newUser = await User.create({username, email, password: hashedPassword, role, imageUrl, category, price, description})

        const {password, ...user} = newUser._doc

        return new Response(JSON.stringify(user), {status: 201})
    } catch (error) {
        return new Response(JSON.stringify(error.message), {status: 500})
    }
}