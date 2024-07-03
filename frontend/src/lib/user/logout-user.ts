import Cookies from "js-cookie"

export function logoutUser() {
    Cookies.remove("Token")
    window.location.reload()
}