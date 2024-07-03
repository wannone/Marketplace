import { z } from 'zod'

export const productSchema = z.object({
    id: z.number().int().positive().min(0),
    name: z.string().min(3).max(191),
    description: z.string().min(3).max(191),
    price: z.coerce.number().int().positive().min(0),
    categoryId: z.number().int().positive().min(0),
    quantity: z.coerce.number().int().positive().min(0).default(1),
    image_url: z.string()
})

export const createProductSchema = productSchema.omit({id: true})
