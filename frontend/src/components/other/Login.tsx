import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { loginUser } from "@/lib/api/auth"
import { useMutation } from "@tanstack/react-query"
import { userLogin } from "@/model/user-model"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { loginSchema } from "@server/src/schema/user-schema"
import {   Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel } from "../ui/form"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import Cookies from "js-cookie"


export function LoginDialog() {
  const [open, setOpen] = useState(false)

  const { toast } = useToast()

  const mutate = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if ('token' in data) {
        Cookies.set("Token", data.token, { expires: 1 })
        toast({
          title: "Login successful",
          description: "You are now logged in",
        })
        setOpen(false)
        window.location.reload()
      }
    },
    onError: (error) => {
      alert(error.message)
    }
  })

  const form = useForm<userLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(userData: userLogin) {
    mutate.mutate(userData)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Login to start shopping
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="email@email.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form >
      </DialogContent>
    </Dialog>
  )
}
