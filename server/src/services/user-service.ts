import type { z } from "zod"
import type { loginSchema } from "../schema/user-schema"
import { prisma } from "../util/prisma-client"
import { generateToken } from "../util/generate-token"

export async function login(user : z.infer<typeof loginSchema>) {
    const userExists = await prisma.user.findUnique({
        where: {
            email: user.email,
            password: user.password
        }
    })
    if (!userExists) {
        throw new Error("Invalid credentials")
    }
    return await generateToken(userExists.name as string, userExists.role)
}

