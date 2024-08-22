import dbConnect from "@/lib/dbConnect";
import userModel from "@/modal/User";

export async function PUT(req: Request) {
    await dbConnect()
    try {
        const { token, password } = await req.json()
        console.log(token);

        const user = await userModel.findOne({ resetToken: token, resetTokenExpire: { $gt: Date.now() } })

        if (!user) {
            return Response.json(
                {
                    sucess: false,
                    message: "token expire"
                }, { status: 404 })
        }

        user.password = password
        user.resetTokenExpire = undefined
        user.resetToken = undefined
        await user.save()

        return Response.json(
            {
                sucess: true,
                message: "Password Reset Successfully"
            }, { status: 200 })

    } catch (err) {

        return Response.json(
            {
                sucess: false,
                message: err
            }, { status: 500 })
    }

}