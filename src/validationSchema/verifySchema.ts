import z from 'zod';

export const verifySchema = z.object({
    code: z.string().min(6, 'Verification should be of 6 Digit')
})