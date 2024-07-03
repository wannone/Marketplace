import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Button } from "../components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { useCart } from "@/context/cart-context"
import { FormatCurrency } from "@/lib/format-currency"
import { getProducts } from "@/lib/api/product"
import { Skeleton } from "@/components/ui/skeleton"

export const Route = createFileRoute("/")({
  component: Index,
})

function Index() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-Products"],
    queryFn: getProducts,
  })
  const { addProduct, ProductCount } = useCart()

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="flex justify-center">
      <div className="mx-2 flex flex-warp gap-2 mt-4">
        {!isPending && Array.isArray(data)
          ? data.map((Product) => (
              <div className="w-auto" key={Product.id}>
                <Card className="p-4">
                  <CardHeader>
                    <img
                      src={Product.image_url}
                      width={240}
                      alt={Product.name}
                    />
                    <CardTitle>{Product.name}</CardTitle>
                    <CardDescription>{Product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{FormatCurrency(Product.price)}</p>
                    <p>amount: {Product.quantity - ProductCount(Product.id)}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => addProduct(Product)}
                      disabled={
                        Product.quantity - ProductCount(Product.id) === 0
                    }
                    >
                      + Add to cart
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))
          : Array.from({ length: 4 }).map((_, i) => (
              <div className="mb-4 w-auto" key={i}>
                <Card className="p-4">
                  <CardHeader>
                    <Skeleton className="h-64 w-64" />
                    <CardTitle>
                      <Skeleton className="h-6 w-48" />
                    </CardTitle>
                    <CardDescription>
                      <Skeleton className="h-4 w-64" />
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      <Skeleton className="h-6 w-20" />
                    </p>
                    <p>
                      <Skeleton className="h-6 w-32" />
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button disabled>
                      <Skeleton className="h-10 w-24" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
      </div>
    </div>
  )
}