import { prisma } from "../util/prisma-client"

export function getAllCategories() {
    return prisma.category.findMany()
}