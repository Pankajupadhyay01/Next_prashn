import dbConnect from "@/lib/dbConnect";
import questionModel from "@/modal/Question";
import { getServerSession } from "next-auth";
import { Option } from "../../auth/[...nextauth]/option"; 

export async function POST(req: Request) {
    await dbConnect()
    try {
        const session = await getServerSession(Option)
        const { title, body, category } = await req.json()
        const user = session?.user
        if (!user) {
            return Response.json({
                sucess: false,
                msg: "Please Login First"
            }, { status: 400 })
        }
        else {
            const question = await questionModel.create({ title, body, category, userId: user._id })

            return Response.json({
                sucess: true,
                msg: "Question Asked Sucessfully",
                question
            }, { status: 200 })
        }
    } catch (error: any) {
        return Response.json(
            {
                sucess: false,
                message: error?.message
            },
            {
                status: 500,
            }
        )
    }
}