import { Resend } from 'resend';
import { EmailTemplate } from '../../emails/Verificationmail';
import { forgetPass } from '../../emails/ForgerPass';
const resend = new Resend(process.env.RESEND_API_KEY);


export const sendVerification = async (email: string, username: string, code: string) => {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: "Verification Code",
            react: EmailTemplate({ username, code })
        });
        return {
            sucess: true,
            message: "Verification mail send to your mail "
        }
    } catch (error) {
        console.log("Verification mail not send ");
        return {
            sucess: false,
            message: "Unable to send Verification mail ! try again later "

        }
    }
}



export const sendForgetPass = async (email: string, username: string, message: string) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Reset Your Password',
            react: forgetPass({ username, message }),
        });
        return {
            sucess: true,
            message: "Verification mail send to your mail "
        }
    } catch (error) {
        console.log("Verification mail not send ");
        return {
            sucess: false,
            message: "Unable to send Verification mail ! try again later "

        }
    }
}