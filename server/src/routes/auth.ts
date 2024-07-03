import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { loginSchema } from "../schema/user-schema"
import { login } from "../services/user-service"
import { jwt } from "hono/jwt"

export const authRoute = new Hono()
  .post("/login", zValidator("json", loginSchema), async (c) => {
    try {
      const user = c.req.valid("json")
      const token = await login(user)
      return c.json({ token })
    } catch (error) {
      if ((error as Error).message === "Invalid credentials") {
        return c.json({ error: "Invalid credentials" }, 401)
      } else {
        return c.json({ error: "Failed to login" }, 500)
      }
    }
  })

  .get("checkRole", jwt({ secret: process.env.SECRET_KEY as string }), async (c) => {
    const payload = c.get("jwtPayload")
    return c.json({ role: payload.role })
  })