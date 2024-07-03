import { useContext, createContext} from "react"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { Product } from "@/model/product-model"

type CartContextType = {
    Products: Product[]
    addProduct: (Product: Product) => void
    removeProduct: (Product: Product) => void
    clearCart: () => void
    checkout: () => void
    ProductCount: (id: number) => number
    total: number
    amount: number
}

type CartProviderProps = {
    children: React.ReactNode
}

const CartContext = createContext({} as CartContextType)

export function useCart() {
    return useContext(CartContext)
}

export function CartProvider( {children} : CartProviderProps) {
    const [Products, setProducts] = useLocalStorage<Product[]>(
        "cart",
        []
    )

    const addProduct = (Product: Product) => {
        if (Products.find(i => i.id === Product.id)) {
            setProducts((Products) => Products.map(i => i.id === Product.id ? {...i, quantity: i.quantity + 1} : i))
        } else {
            setProducts((Products) => [...Products, {...Product, quantity: 1}])
        }
    }

    const ProductCount = (id: number) => {
        return Products.find(i => i.id === id)?.quantity || 0
    }

    const removeProduct = (Product: Product) => {
        if (ProductCount(Product.id) > 1) {
            setProducts((Products) => Products.map(i => i.id === Product.id ? {...i, quantity: i.quantity - 1} : i))
        } else {
            setProducts((Products) => Products.filter(i => i.id !== Product.id))
        }
    }

    const clearCart = () => {
        setProducts([])
    }

    const checkout = () => {
        clearCart()
    }
    
    const total = Products.reduce((acc, Product) => acc + Product.quantity, 0)

    const amount =Products.reduce((acc, Product) => acc + Product.price * Product.quantity, 0)

    return (
        <CartContext.Provider value={{Products, addProduct, removeProduct, clearCart, ProductCount, checkout, total, amount}}>
            {children}
        </CartContext.Provider>
    )
    
}