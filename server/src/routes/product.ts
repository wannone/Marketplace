import { Hono } from "hono"
import { zValidator } from '@hono/zod-validator'
import { createProductSchema } from "../schema/product-schema"
import { productService }  from "../services/products-service"
import { adminAuth } from "../../middleware/auth-middleware"

export const productRoute = new Hono()
.get("/", async (c) => {
    try{
        const data = await productService.getAllProducts()
        return c.json(data)
    } catch (error) {
        return c.json({ error: 'Failed to fetch items' }, 500)
    }
})
.get("/:id{[0-9]+}", async (c) => {
    try{
        const id = parseInt(c.req.param("id"))
        const data = await productService.getProductById(id)
        return c.json(data)
    } catch (error) {
        return c.json({ error: 'Failed to fetch item' }, 500)
    }
})
.post("/", adminAuth, zValidator("json", createProductSchema), async (c) => {
    try{
        const product = c.req.valid("json")
        await productService.createProduct(product)
        return c.json(product)
    } catch (error) {
        return c.json({ error: 'Failed to create item' }, 500)
    }
})
.put("/:id{[0-9]+}", adminAuth, zValidator("json", createProductSchema), async (c) => {
    try{
        const id = parseInt(c.req.param("id"))
        const product = c.req.valid("json")
        await productService.updateProduct(id, product)
        return c.json(product)
    } catch (error) {
        return c.json({ error: 'Failed to update item' }, 500)
    }
})
.delete("/:id{[0-9]+}", adminAuth, async (c) => {
    try{
        const id = parseInt(c.req.param("id"))
        await productService.deleteProduct(id)
        return c.json({ message: 'Item deleted' })
    } catch (error) {
        return c.json({ error: 'Failed to delete item' }, 500)
    }
})