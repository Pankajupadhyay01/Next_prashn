import { Option } from "@/app/api/auth/[...nextauth]/option";
import dbConnect from "@/lib/dbConnect";
import answerModel from "@/modal/Answer";
import questionModel from "@/modal/Question";
import { getServerSession } from "next-auth";

export async function POST(req: Request, { params }: { params: { id: string } }) {
    await dbConnect();
    const session = await getServerSession(Option)
    const questionId = params.id;
    const user = session?.user._id 

    try {
        const { content } = await req.json()
        if (!user) {
            return Response.json({
                sucess: false,
                message: "Please Login to answer"
            }, { status: 400 })
        }
        const isQuestionExist = await questionModel.findById(questionId)
        if (!isQuestionExist) {
            return Response.json({
                sucess: false,
                message: "Question not found"
            }, { status: 400 })
        }



        const answer = await answerModel.create({ user, questionId, content })
        isQuestionExist.answers.push(answer._id)
        await isQuestionExist.save() 

        return Response.json({
            sucess: true,
            message: "Answer added",
            // answer
        }, { status: 200 })

    } catch (err: any) {
        return Response.json(
            {
                sucess: false,
                message: err?.message
            }, { status: 500 })
    }
}