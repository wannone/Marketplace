import { NavBar } from "@/components/other/navbar"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/context/cart-context"
import { createRootRoute, Outlet } from "@tanstack/react-router"
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'



export const Route = createRootRoute({
  component: () => (
    <>
      <CartProvider>
        <NavBar />
        <hr />
        <Outlet />
        <Toaster />
      </CartProvider>
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
})
