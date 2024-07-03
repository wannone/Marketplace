import { Hono } from "hono"
import { logger } from "hono/logger"
import { productRoute } from "./routes/product"
import { paymentRoute } from "./routes/payment"
import { categoryRoute } from "./routes/category"
import { authRoute } from "./routes/auth"
import { jwt } from "hono/jwt"

const app = new Hono()
.get("/", (c) => {
 return c.text("Hello, Hono!")
})

app.use(logger())
// app.use(
//     '/api/product',
//     jwt({
//       secret: process.env.SECRET_KEY as string,
//     })
//   )

const apiRoutes = app.basePath("/api")
.route("/product", productRoute)
.route("/payment", paymentRoute)
.route("/category", categoryRoute)
.route("/auth", authRoute)

export default app
export type ApiRoutes = typeof apiRoutes