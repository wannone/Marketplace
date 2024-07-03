import { Product } from "@server/src/model/product-model"
import { api } from "./api"

export async function createTransaction(Product: Product[]) {
    const res= await api.payment.$post({
        json: {
          userId: "d2dde942-22fc-44f9-8bd8-e8074ec3fcd8",
          products: Product.map((Product) => ({
            id: Product.id,
            quantity: Product.quantity,
          })),
        }
      })
    
      if (!res.ok){
        throw new Error(res.statusText)
      }
}