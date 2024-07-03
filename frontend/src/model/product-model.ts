import { productSchema } from "@server/src/schema/product-schema"
import { z } from "Zod"

export type Product = z.infer<typeof productSchema>
