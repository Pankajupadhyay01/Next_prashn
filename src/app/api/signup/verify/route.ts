import dbConnect from "@/lib/dbConnect";
import userModel from "@/modal/User";

export async function POST(req: Request) {
    await dbConnect()
    try {
        const { otp } = await req.json()

        const { searchParams } = new URL(req.url)
        const id = { id: searchParams.get("id") }

        const user = await userModel.findById(id.id)
        if (!user) {
            return Response.json(
                {
                    sucess: false,
                    message: "User not Found"
                }, { status: 400 })
        }
        else {
            const isCodeNotExpire = new Date(user.verifyExpire) > new Date()

            if (otp == user.verifyCode && isCodeNotExpire) {

                user.isVerified = true
                user.verifyCode = " "
                await user.save()
                return Response.json(
                    {
                        sucess: true,
                        message: "Code Verification sucessfull"
                    }, { status: 200 })
            }
            else if (!isCodeNotExpire) {
                return Response.json(
                    {
                        sucess: false,
                        message: "Code Expired"
                    }, { status: 400 })
            }
            else {
                return Response.json(
                    {
                        sucess: false,
                        message: "Invalid OTP"
                    }, { status: 400 })
            }
        }
    } catch (error) {
        return Response.json(
            {
                sucess: false,
                message: "Error While Registering user"
            }, { status: 500 })
    }
}