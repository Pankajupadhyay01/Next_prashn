import dbConnect from "@/lib/dbConnect";
import userModel from "@/modal/User";
import { sendVerification } from "@/lib/resend";
export async function POST(req: Request) {
    await dbConnect()
    try {
        const { username, email, password } = await req.json()
        const isUser = await userModel.findOne({ username, isVerified: true })
        var id
        // checking if username is already taken
        if (isUser) {
            return Response.json(
                {
                    sucess: false,
                    message: "Username Already Exists"
                },
                {
                    status: 400
                }
            )
        }
        const isMailexist = await userModel.findOne({ email })

        // genrating otp code
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

        // checking if email is already taken
        if (isMailexist) {

            // checking if user is exist and also verified in that case user not allowed to make changes 
            if (isMailexist.isVerified) {
                return Response.json(
                    {
                        sucess: false,
                        message: "Mail Already Exist"
                    },
                    {
                        status: 400,
                    }
                )
            } else {
                id = isMailexist._id
                isMailexist.username = username
                isMailexist.password = password
                isMailexist.verifyCode = verifyCode
                const expireDate = new Date(Date.now() + 10 * 60 * 1000)
                isMailexist.verifyExpire = expireDate
                await isMailexist.save()
            }

        }

        else {
            const expireDate = new Date(Date.now() + 10 * 60 * 1000)

            // creating user in Database
            const user = await userModel.create({ username, email, password, verifyCode, verifyExpire: expireDate })
            id = user._id
            await user.save()
        }

        // sending mail 
        const emailRes = await sendVerification(email, username, verifyCode)

        if (!emailRes.sucess) {
            return Response.json({
                sucess: false,
                message: emailRes.message,
            }, { status: 400 })
        } else {
            return Response.json(
                {
                    sucess: true,
                    message: "Register Sucessfull ! Vecification Email send Sucessfully",
                    id
                }, { status: 200 })
        }
        // Mail Sended sucessufuly


    } catch (err) {
        console.log("Error While Registering user ", err)
        return Response.json(
            {
                sucess: false,
                message: "Error While Registering user"
            },
            {
                status: 500,
            }
        )
    }
}
