import { sign } from "hono/jwt"

export async function generateToken(name: string, role: string) {
    const payload = {
        name: name,
        role: role,
    }
    const secret = process.env.SECRET_KEY as string
    const token = await sign(payload, secret)
    return token
}