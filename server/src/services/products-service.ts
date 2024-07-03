import {prisma} from '../util/prisma-client'
import { createProductSchema } from '../schema/product-schema'
import type { z } from 'zod'

async function getAllProducts() {
  return await prisma.product.findMany()
}

async function getProductById(id: number) {
    return await prisma.product.findUnique({
        where: {
        id
        }
    })
}

async function createProduct(product: z.infer<typeof createProductSchema>) {
    return await prisma.product.create({
        data: product
    })
}

async function updateProduct(id: number, product: z.infer<typeof createProductSchema>) {
    return await prisma.product.update({
        where: { id },
        data: product
    })
}

async function deleteProduct(id: number) {
    return await prisma.product.delete({
        where: { id }
    })
}

export const productService = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}