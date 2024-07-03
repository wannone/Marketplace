import { z } from 'zod'

export const categorySchema = z.object({
    id: z.number().int().positive().min(0),
    name: z.string().min(3).max(191),
    description: z.string().min(3).max(191),
})

export const createCategorySchema = categorySchema.omit({id: true})