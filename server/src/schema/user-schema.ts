import { z } from 'zod'
import { transactionSchema } from './transaction-schema'

export const userSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    password: z.string().min(8).max(191),
    name: z.string().min(3).max(191),
    role: z.enum(["ADMIN", "USER"]),
    created_at: z.date(),
    updated_at: z.date(),
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(191),
})