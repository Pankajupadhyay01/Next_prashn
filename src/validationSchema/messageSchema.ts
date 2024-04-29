import z from 'zod'

export const messageSchema = z.object({
    message: z.string().min(10,"Message Must be Of 10 Character").max(500,"Message can't more than 1000 character "),
})