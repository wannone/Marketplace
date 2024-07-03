import { Hono } from "hono"
// import { createMidtransClient } from "../util/midtrans-client"
import { zValidator } from "@hono/zod-validator"
import { createTransactionSchema } from "../schema/transaction-schema"
import { createTransaction } from "../services/payment-service"
import { userAuth } from "../../middleware/auth-middleware"

export const paymentRoute = new Hono()
.get("/", (c) => {
    return c.text("Transaction route")
})
.post("/", userAuth, zValidator("json", createTransactionSchema), async (c) => {
    const body = c.req.valid("json")
    try {
        // const data = await createMidtransClient(body)
        const data = await createTransaction(body)
        return c.json(data)
    } catch (error) {
        return c.json({ error: 'Failed to create transaction' }, 500)
    }
})