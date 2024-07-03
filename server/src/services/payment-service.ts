import type { createTransactionSchema } from "../schema/transaction-schema"
import { prisma } from "../util/prisma-client"

export async function createTransaction ( transaction : Zod.infer<typeof createTransactionSchema>) {
    const data = await prisma.transaction.create({
        data: {
            userId: transaction.userId,        
        }
    })

    for (const product of transaction.products) {
        await prisma.transactionItem.create({
            data: {
                transactionId: data.id,
                productId: product.id,
                quantity: product.quantity
            }
        })

        await prisma.product.update({
            where: {
                id: product.id
            },
            data: {
                quantity: {
                    decrement: product.quantity
                }
            }
        })
    }

    return data
}