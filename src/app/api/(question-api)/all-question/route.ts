import dbConnect from "@/lib/dbConnect";
import questionModel from "@/modal/Question";

export async function GET(req: Request) {
    await dbConnect()
    try {
        const { searchParams } = new URL(req.url)
        const limit = Number(searchParams.get('limit'))
        const page = Number(searchParams.get('page'))

        const starting = (page - 1) * limit
        const ending = (page) * limit

        const question = await questionModel.find().populate({ path: "userId", select: "username" }) 

        // slicing for pagination
        const slicedData = question.slice(starting, ending)
        return Response.json({
            sucess: true,
            slicedData
        }, { status: 200 })


    } catch (err: any) {
        return Response.json({
            sucess: false,
            message: err.message
        }, { status: 500 })
    }
}