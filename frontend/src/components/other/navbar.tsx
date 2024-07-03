import { Link } from "@tanstack/react-router"
import { Input } from "../ui/input"
import Cart from "./cart"
import { LoginDialog } from "./Login"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { checkUser } from "@/lib/user/check-user"
import { logoutUser } from "@/lib/user/logout-user"

export function NavBar() {

  const [isLogin, setIsLogin] = useState<boolean>()

  useEffect(() => {
    checkUser() ? setIsLogin(true) : setIsLogin(false)
  })

  function logout() {
    logoutUser()
  }

    return (
      <nav className="h-{140px} w-full bg-muted">
        <div className="flex px-40 py-4 justify-between items-center">
          <p className="font-light">Your Fav Apple Online Store</p>
          { isLogin === false
          ?
            <LoginDialog />
          :
            <Button variant="destructive" onClick={logout} >Logout</Button>
        }
        </div>
        <div className="flex px-40 py-4 justify-between items-center bg-primary">
          <div className="text-white font-bold text-lg">
            <Link to="/">APPLEPLACE</Link>
          </div>
          <div className="w-1/2">
          <Input type="text" placeholder="search" className="text-white"/>
          </div>
          <div>
            <Cart />
          </div>
        </div>
      </nav>
    )
  }