import { createProductSchema } from "@server/src/schema/product-schema";
import { api } from "./api";
import { z } from "Zod";

async function getProducts() {
    const res =  await api.product.$get()
    const data = await res.json()
    return data
  }

async function createProduct(product: z.infer<typeof createProductSchema>) {
    const res = await api.product.$post({
      json: product,
    });
    const data = await res.json();
    return data;
  }

export { getProducts, createProduct }