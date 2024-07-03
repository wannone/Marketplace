import { createMiddleware } from 'hono/factory'
import { jwt } from 'hono/jwt'

 export const adminAuth = createMiddleware( async (c, next) => {
    try {
        await jwt({ secret: process.env.SECRET_KEY as string })
        (c, async () => {
            const payload = c.get('jwtPayload')
            if (payload.role !== 'ADMIN') {
                throw new Error('Unauthorized')
            }
            await next() // Proceed to the next middleware or route handler
        })
    } catch (error) {
        return c.json({ error: 'Unauthorized' }, 401) // Unauthorized error response
    }
  })

    export const userAuth = createMiddleware( async (c, next) => {
        try {
            await jwt({ secret: process.env.SECRET_KEY as string })
            (c, async () => {
                const payload = c.get('jwtPayload')
                if (payload.role !== 'USER') {
                    throw new Error('Unauthorized')
                }
                await next() // Proceed to the next middleware or route handler
            })
        } catch (error) {
            return c.json({ error: 'Unauthorized' }, 401) // Unauthorized error response
        }
    })

    