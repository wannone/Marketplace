import { Hono } from "hono"
import { getAllCategories } from "../services/category-service"

export const categoryRoute = new Hono()
.get("/", async (c) => {
    try{
        const data = await getAllCategories()
        return c.json(data)
    } catch (error) {
        return c.json({ error: 'Failed to fetch categories' }, 500)
    }
})