import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
} from "@/redux/features/product/productApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpDown, Edit, Plus, Trash2 } from "lucide-react";
import type React from "react";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Assuming these are your product categories
const productCategories = [
  "Fiction",
  "Non-Fiction",
  "Science",
  "History",
  "Biography",
];

const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  price: z.number().min(0, "Price must be a positive number"),
  category: z.enum(productCategories as [string, ...string[]], {
    errorMap: () => ({ message: "Please select a valid category" }),
  }),
  description: z.string().min(1, "Description is required"),
  quantity: z.number().int().min(0, "Quantity must be a non-negative integer"),
  coverImage: z.instanceof(File).optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

type TQueryParam = {
  name: string;
  value: string;
};

type TProduct = {
  _id: string;
  title: string;
  author: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  coverImage?: string;
};

const Products: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const [queryParams, setQueryParams] = useState<TQueryParam[]>([
    { name: "page", value: "1" },
    { name: "limit", value: "10" },
  ]);

  const { data, error, isLoading } = useGetAllProductsQuery(queryParams);
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const products = data?.data || [];
  const totalPages = data?.meta?.totalPage || 1;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      author: "",
      price: 0,
      category: productCategories[0],
      description: "",
      quantity: 0,
    },
  });

  const updateQueryParams = useCallback((newParams: TQueryParam[]) => {
    setQueryParams((prev) => {
      const updatedParams = [...prev];
      newParams.forEach((param) => {
        const index = updatedParams.findIndex((p) => p.name === param.name);
        if (index !== -1) {
          updatedParams[index] = param;
        } else {
          updatedParams.push(param);
        }
      });
      return updatedParams;
    });
  }, []);

  const handleSearch = useCallback(
    (searchTerm: string) => {
      updateQueryParams([
        { name: "search", value: searchTerm },
        { name: "page", value: "1" },
      ]);
    },
    [updateQueryParams]
  );

  const handleSort = useCallback(
    (sortBy: string) => {
      const currentSortOrder =
        queryParams.find((p) => p.name === "sortOrder")?.value || "asc";
      const newSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
      updateQueryParams([
        { name: "sortBy", value: sortBy },
        { name: "sortOrder", value: newSortOrder },
      ]);
    },
    [updateQueryParams, queryParams]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateQueryParams([{ name: "page", value: page.toString() }]);
    },
    [updateQueryParams]
  );

  const onSubmit = async (data: ProductFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "coverImage" && value instanceof File) {
        formData.append("coverImage", value);
      } else {
        formData.append(key, value.toString());
      }
    });

    try {
      if (selectedProduct) {
        await updateProduct({
          id: selectedProduct._id,
          payload: formData,
          file: data.coverImage,
        }).unwrap();
        toast.success("Product updated successfully.");
      } else {
        await createProduct({
          payload: formData,
          file: data.coverImage,
        }).unwrap();
        toast.success("Product created successfully.");
      }
      setIsDialogOpen(false);
      reset();
    } catch (error) {
      console.error("Failed to save product:", error);
      toast.error(
        `Failed to ${
          selectedProduct ? "update" : "create"
        } product. Please try again.`
      );
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted successfully.");
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product. Please try again.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    toast.error("Failed to fetch products. Please try again.");
    return <div>Error loading products.</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search products..."
              onChange={(e) => handleSearch(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) {
                setSelectedProduct(null);
                reset();
              }
            }}
          >
            <DialogTrigger asChild>
              <Button onClick={() => setSelectedProduct(null)}>
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {selectedProduct ? "Edit Product" : "Add New Product"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      {...register("title")}
                      defaultValue={selectedProduct?.title}
                      className="col-span-3"
                    />
                    {errors.title && (
                      <p className="text-red-500 col-span-3 col-start-2">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="author" className="text-right">
                      Author
                    </Label>
                    <Input
                      id="author"
                      {...register("author")}
                      defaultValue={selectedProduct?.author}
                      className="col-span-3"
                    />
                    {errors.author && (
                      <p className="text-red-500 col-span-3 col-start-2">
                        {errors.author.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      {...register("price", { valueAsNumber: true })}
                      defaultValue={selectedProduct?.price}
                      className="col-span-3"
                    />
                    {errors.price && (
                      <p className="text-red-500 col-span-3 col-start-2">
                        {errors.price.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Controller
                      name="category"
                      control={control}
                      defaultValue={
                        selectedProduct?.category || productCategories[0]
                      }
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {productCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.category && (
                      <p className="text-red-500 col-span-3 col-start-2">
                        {errors.category.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      {...register("description")}
                      defaultValue={selectedProduct?.description}
                      className="col-span-3"
                    />
                    {errors.description && (
                      <p className="text-red-500 col-span-3 col-start-2">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">
                      Quantity
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      {...register("quantity", { valueAsNumber: true })}
                      defaultValue={selectedProduct?.quantity}
                      className="col-span-3"
                    />
                    {errors.quantity && (
                      <p className="text-red-500 col-span-3 col-start-2">
                        {errors.quantity.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="coverImage" className="text-right">
                      Cover Image
                    </Label>
                    <Input
                      id="coverImage"
                      type="file"
                      {...register("coverImage")}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">
                    {selectedProduct ? "Save changes" : "Add product"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("title")}>
                  Title <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("author")}>
                  Author <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("price")}>
                  Price <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("quantity")}>
                  Quantity <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <img
                    src={product.coverImage || "/placeholder.svg"}
                    alt={product.title}
                    className="w-16 h-16 object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell>{product.author}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  handlePageChange(
                    Math.max(
                      1,
                      Number(
                        queryParams.find((p) => p.name === "page")?.value
                      ) - 1
                    )
                  )
                }
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => handlePageChange(index + 1)}
                  isActive={
                    Number(
                      queryParams.find((p) => p.name === "page")?.value
                    ) ===
                    index + 1
                  }
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  handlePageChange(
                    Math.min(
                      totalPages,
                      Number(
                        queryParams.find((p) => p.name === "page")?.value
                      ) + 1
                    )
                  )
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
};

export default Products;
