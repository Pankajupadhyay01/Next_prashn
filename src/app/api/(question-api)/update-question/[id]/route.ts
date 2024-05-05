import dbConnect from "@/lib/dbConnect";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    await dbConnect()
    try {

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