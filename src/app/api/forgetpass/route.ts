import dbConnect from "@/lib/dbConnect";
import userModel from "@/modal/User";
import { NextApiRequest } from "next";
import crypto from 'crypto'
import { sendForgetPass } from "@/lib/resend";
export async function POST(req: Request) {
    dbConnect()
    try {
        const { email } = await req.json();

        const user = await userModel.findOne({ email })
        if (!user) {

            return Response.json(
                {
                    sucess: false,
                    message: "Please Register first"
                }, { status: 400, })

        }

        else if (!user.isVerified) {
            return Response.json({
                sucess: false,
                message: "You are not verified please verify yourself ! Please sign up again and "
            }, { status: 400 })
        }

        const token = crypto.randomBytes(10).toString("hex")

        // creating link for reset password

        const protocol = req.headers.get('x-forwarded-proto') ?? 'http';
        const host = req.headers.get('host');
        const reseturl = `${protocol}://${host}/api/v1/pass/reset/${token}`

        // seting user Token to 
        user.resetToken = token
        user.resetTokenExpire = new Date(Date.now() + 10 * 60 * 1000)
        user.save()

        const resForget = await sendForgetPass(email, user.username, reseturl)
        if (!resForget.sucess) {
            return Response.json(
                {
                    sucess: false,
                    message: resForget.message
                },
                {
                    status: 400,
                }
            )
        } else {
            return Response.json(
                {
                    sucess: true,
                    message: "Email Send to registered mail id"
                },
                {
                    status: 200,
                }
            )
        }
    } catch (err: any) {
        console.log(err)
        return Response.json(
            {
                sucess: false,
                message: err.message
            },
            {
                status: 500,
            }
        )
    }

}