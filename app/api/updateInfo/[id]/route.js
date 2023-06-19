import db from "@app/lib/db";
import User from "@/models/User";

export async function PUT(req, ctx) {
    await db.connect();
    const newData = req.body;
    try {
        const user = await User.findOneAndUpdate({ _id: ctx.params.id }, { $set: newData })
        console.log(req.body)
        return new Response(JSON.stringify(user), { status: 200 })
    } catch {
        return new Response(JSON.stringify(null).status(500))
    }
}