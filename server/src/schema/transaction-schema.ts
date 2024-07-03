import { z } from 'zod'
import { productSchema } from './product-schema'

export const transactionSchema = z.object({
   id : z.number().int().positive().min(0),
   userId : z.string().uuid(),
   products : z.array(productSchema.omit({description: true, image_url: true, name: true, price: true, categoryId: true})),
   created_at : z.date(),
   updated_at : z.date(),
})

export const createTransactionSchema = transactionSchema.omit({id: true, created_at: true, updated_at: true})