import { PrismaClient } from '@prisma/client'
import { createProductSchema } from '../schema/product-schema'

export const prisma = new PrismaClient(
    {
        log: [
            {
                emit: 'event',
                level: 'query',
            },
            {
                emit: 'event',
                level: 'info',
            },
            {
                emit: 'event',
                level: 'warn',
            },
            {
                emit: 'event',
                level: 'error',
            },
        ],
    }
).$extends({
    query: {
        product: {
            create({args, query}) {
                args.data = createProductSchema.parse(args.data)
                return query(args)
            }
        },
    }
})