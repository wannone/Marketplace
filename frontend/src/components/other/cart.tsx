import { useCart } from "@/context/cart-context"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "../ui/card"
import { FormatCurrency } from "@/lib/format-currency"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { createTransaction } from "@/lib/api/transaction"


function Cart() {
  const { Products, total, ProductCount, removeProduct, checkout, clearCart } = useCart()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const postTransaction = useMutation({
    mutationFn: () => createTransaction(Products),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-Products"]})
      checkout()
      toast({
        title: "Transaction successful",
        description: "Transaction has been completed successfully",
      })
    },
    onError: (error : Error) => {
      if (error.message === 'Unauthorized') {
        toast({
          title: "Unauthorized",
          description: "You are not authorized to perform this action, login to continue",
          variant: "destructive",          
        })
      } else {
        toast({
          title: "Error",
          description: error.message || "Transaction failed",
          variant: "destructive"
        })
      }
    },
  })
  async function Checkout() {
    postTransaction.mutate()
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"}>Cart ({total})</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetClose />
        </SheetHeader>
        <SheetDescription>
          {Products.length > 0 ? (
            Products.map((Product) => (
              <div key={Product.id} className="my-4">
                <Card className="flex Products-center justify-between">
                  <CardContent className="p-0 flex Products-center">
                    <img src={Product.image_url} width={100} />
                    <div className="flex flex-col Products-start">
                    <p className="font-semibold ms-2">
                      {Product.name}
                      <span className="font-light">x{Product.quantity}</span>
                    </p>
                    <p className="ms-2">{FormatCurrency(Product.price * ProductCount(Product.id))}</p>
                    </div>

                  </CardContent>
                  <CardFooter className="p-0 mx-4">
                    <Button size={"sm"} onClick={() => removeProduct(Product)}>-</Button>
                  </CardFooter>
                </Card>
              </div>
            ))
          ) : (
            <p>Cart is empty</p>
          )}
        </SheetDescription>
        <SheetFooter>
          {Products.length > 0 && (
            <>
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
            <Button variant={"outline"} onClick={Checkout}>Checkout</Button>
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default Cart
