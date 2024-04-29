import dbConnect from "@/lib/dbConnect";
import userModel from "@/modal/User";

export async function PUT(req: Request) {
    dbConnect()
    try {
        const { token, password } = await req.json()
        const user = await userModel.findOne({ token, resetTokenExpire: { $gt: Date.now() } })
        console.log(user);

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