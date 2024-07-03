// External Libraries
import { createFileRoute, redirect } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "Zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";

// Internal Utilities and Components
import { cn } from "@/lib/utils";
import { getCategory } from "@/lib/api/category";
import { createProduct } from "@/lib/api/product";
import { useToast } from "@/components/ui/use-toast";

//schemas
import { createProductSchema } from "@server/src/schema/product-schema";

// UI Components
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { CommandList } from "cmdk"; // Example: Confirm this import's correct location

// Authentication
import { checkRole } from "@/lib/api/auth";

export const Route : any = createFileRoute("/post")({
  beforeLoad: async () => {
    try {
      const data = await checkRole()
    if (data.role !== "admin") {
      return redirect({ to: "/" })
    }
    } catch (error) {
      return redirect({ to: "/" })
    }
  },
  component: Post,
})

function Post() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
  })
  const { data: getCategories } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  })

  const categories = Array.isArray(getCategories)
    ? getCategories.map((category) => ({
        value: category.id,
        label: category.name,
      }))
    : []

  const postProduct = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast({
        title: "Item created",
        description: "Item has been created successfully",
      })
      form.reset()
    },
    onMutate: () => {
      toast({
        title: "Creating item",
        description: "Please wait...",
      })
    },
    onError: (error) => {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to create item",
        variant: "destructive",
      })
    },
  })

  function handleSubmit(value: z.infer<typeof createProductSchema>) {
    postProduct.mutate(value)
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 mt-2 px-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Image" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Item Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Category</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? categories.find(
                                (categories) => categories.value === field.value
                              )?.label
                            : "Select Category"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Search Category..." />
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {categories.map((categories) => (
                              <CommandItem
                                value={categories.label}
                                key={categories.value}
                                onSelect={() => {
                                  form.setValue("categoryId", categories.value)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    categories.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {categories.label}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="Price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Quantity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
