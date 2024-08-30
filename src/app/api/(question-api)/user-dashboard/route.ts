import dbConnect from "@/lib/dbConnect";
import questionModel from "@/modal/Question";
import { getServerSession } from "next-auth";
import { Option } from "../../auth/[...nextauth]/option";
import answerModel from "@/modal/Answer";

export async function GET(req: Request) {
    await dbConnect()


    const session = await getServerSession(Option)
    const user = session?.user._id

    try {
        if (!user) {
            return Response.json({
                sucess: false,
                msg: "no such user found"
            }, { status: 500 })
        }

        const questions = await questionModel.find({ userId: user })
        const questionCount = questions.length
        const answerCount = (await answerModel.find({ user: user })).length


        return Response.json({
            sucess: true,
            questions,
            answerCount,
            questionCount
        })
    } catch (error: any) {
        return Response.json({
            sucess: false,
            msg: error?.message
        }, { status: 500 })
    }


}