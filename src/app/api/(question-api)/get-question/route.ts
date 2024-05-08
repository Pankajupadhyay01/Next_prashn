import dbConnect from "@/lib/dbConnect";
import questionModel from "@/modal/Question";
import { isValidObjectId } from "mongoose";

export async function GET(req: Request) {
    dbConnect()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    try {
        if (!id || !isValidObjectId(id)) {
            return Response.json({
                sucess: false,
                msg: "Invalid question Id"
            }, { status: 400 })

        }
        const isQuestion = await questionModel.findById(id)
        if (!isQuestion) {
            return Response.json({
                sucess: false,
                msg: "Question not found"
            }, { status: 400 })
        }

        // adding aggregation pipeline  

        const data = await questionModel.aggregate([
            { $match: { _id: isQuestion._id } },
            {
                $lookup: {
                    from: 'answers', // The name of the collection to join with
                    localField: '_id',
                    foreignField: 'questionId',
                    as: 'answers'
                }
            },
            {
                $lookup: {
                    from: 'users', // The name of the collection to join with
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'askedBy'
                }
            },
            {
                $unwind: '$askedBy' // Convert the 'askedBy' array into an object
            },
            {
                $unwind: {
                    path: '$answers',
                    preserveNullAndEmptyArrays: true // Preserve documents that don't have answers
                }
            },
            {
                $lookup: {
                    from: 'users', // The name of the collection to join with
                    localField: 'answers.user',
                    foreignField: '_id',
                    as: 'answerBy'
                }
            },
            {
                $unwind: {
                    path: '$answerBy',
                    preserveNullAndEmptyArrays: true // Preserve documents that have no corresponding user
                }
            },

            {
                $group: {
                    _id: "$_id",
                    title: {
                        $first: "$title"
                    },
                    body: {
                        $first: "$body"
                    },
                    createdAt: {
                        $first: "$createdAt"
                    },
                    askedBy: {
                        $first: "$askedBy.username"
                    },
                    answers: {
                        $push: {
                            id: "$answers._id",
                            user: "$answerBy.username",
                            answer: "$answers.content",
                            upvote: "$answers.upvote",
                            downvote: "$answers.downvote"
                        }
                    }
                }
            }

        ]
        ).exec()

        return Response.json({
            sucess: true,
            data
        }, { status: 200 })

    } catch (err: any) {
        return Response.json({
            sucess: false,
            msg: err.message
        }, { status: 500 })
    }
}