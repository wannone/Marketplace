import Cookies from "js-cookie"

export function checkUser() {
    const data = Cookies.get("Token")

    if (data) {
        return true
    } else {
        return false
    }
}