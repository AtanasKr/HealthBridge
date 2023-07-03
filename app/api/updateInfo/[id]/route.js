import db from "@app/lib/db";
import User from "@/models/User";

export async function PUT(req, ctx) {
    await db.connect();
    try {
        const newData = await req.json();
        const getObj = JSON.parse(newData.newData);
        const username = getObj.username;
        const category = getObj.category;
        const price = getObj.price;
        const description = getObj.description;
        let user;
        if (getObj.category == "") {
            user = await User.findOneAndUpdate({ _id: ctx.params.id }, { username: username })
        } else {
            user = await User.findOneAndUpdate({ _id: ctx.params.id }, { username: username, category: category, price: price, description: description })
        }
        return new Response(JSON.stringify(user), { status: 200 })
    } catch {
        return new Response(JSON.stringify(null).status(500))
    }
}