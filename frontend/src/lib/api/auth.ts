import { api } from "./api"
import { userLogin } from "@/model/user-model"


export async function loginUser(loginData: userLogin) {
    const res = await api.auth.login.$post({
      json: loginData
    })
    const data = await res.json()
    return data
}

export async function checkRole()  {
    const res = await api.auth.checkRole.$get()
    if (res.status !== 200) {
      throw new Error("Failed to check role")
    }
    const data = await res.json()
    return data
}