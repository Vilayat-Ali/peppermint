import { z } from 'zod';

const userZodSchema = z.object({
    username: z.string().min(5).max(15),
    email: z.string().email().min(1),
    walletAddress: z.string().min(1),
});

export const validateUserPayload = (user: unknown) => userZodSchema.parse(user);
export type UserPayload = z.infer<typeof userZodSchema>;