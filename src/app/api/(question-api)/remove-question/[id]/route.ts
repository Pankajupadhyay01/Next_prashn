import { Option } from "@/app/api/auth/[...nextauth]/option";
import dbConnect from "@/lib/dbConnect";
import answerModel from "@/modal/Answer";
import questionModel from "@/modal/Question";
import { user } from "@/modal/User";
import { getServerSession } from "next-auth";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    await dbConnect()
    const questionId = params.id;
    const session = await getServerSession(Option)
    const user: user = session?.user
    try {
        // console.log(questionId);
        // console.log(session?.user._id);
        const question = await questionModel.findById(questionId)

        if (!user) {
            return Response.json({
                sucess: false,
                msg: "Please login first ",
            }, { status: 400 })
        }

        if (!question) {
            return Response.json({
                sucess: false,
                msg: "Question not found",
            }, { status: 401 })
        }

        // removing question 
        await questionModel.findByIdAndDelete(questionId)
        await answerModel.deleteMany({ questionId })

        return Response.json({
            sucess: true,
            msg: "Question Asked Sucessfully",
        }, { status: 200 })

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