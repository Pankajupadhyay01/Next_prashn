import { z } from 'zod'

export const usernameValidation = z.string()
    .min(3, "User name must be atleast of 3 character ")
    .max(20, "User name can't be more than 20 character ")


export const signupValidation = z.object({
    username: usernameValidation,
    email: z.string().email({ message: "Please Enter Valid Email" }),
    password: z.string().min(8, "Password must be atleast of 8 character ")
})