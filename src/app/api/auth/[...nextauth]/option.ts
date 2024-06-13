import dbConnect from "@/lib/dbConnect";
import userModel from "@/modal/User";
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
export const Option: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials: any, req): Promise<any> {
                await dbConnect()
                try {

                    const user = await userModel.findOne({ email: credentials.email })
                    if (!user) {
                        throw new Error("Oops! no user with this mail found ");
                    }

                    if (!user.isVerified) {
                        throw new Error("Please verify your mail first.Please signup again and verify yourself with the same mail ");
                    }

                    const checkPass = await bcrypt.compare(credentials.password, user.password)

                    if (!checkPass) {
                        throw new Error("Please enter correct password")
                    }
                    else {
                        return user
                    }

                } catch (error: any) {
                    throw new Error(error)

                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {

            if (user) {
                token._id = user._id?.toString()
                token.username = user.username
                token.isVerified = user.isVerified
            }

            return token
        },
        async session({ session, token }) {

            if (token) {
                session.user._id = token._id
                session.user.username = token.username
                session.user.isVerified = token.isVerified
            }
            return session
        }

    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/signin',
    },

}