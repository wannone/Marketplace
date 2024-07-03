import { api } from "./api"

export async function getCategory() {
    const res = await api.category.$get()
    const data = await res.json()
    return data
  }