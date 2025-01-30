/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUpdateProductMutation } from "@/redux/features/product/productApi";
import type { TProduct } from "@/types";
import { CATEGORY_OPTIONS, categoryOptions } from "@/types/categories.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { FileUpload } from "../form/FileUpload";
import { Form } from "../form/Form";
import { SelectDropdown } from "../form/SelectDropdown";
import { TextInput } from "../form/TextInput";
import { Textarea } from "../form/Textarea";

const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  category: z.enum(CATEGORY_OPTIONS),
  description: z.string().min(1, "Description is required"),
  quantity: z.coerce
    .number()
    .int()
    .min(0, "Quantity must be a non-negative integer"),
  coverImage: z.any().optional(),
});

interface UpdateProductDialogProps {
  product: TProduct;
}

const UpdateProductDialog = ({ product }: UpdateProductDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateProduct] = useUpdateProductMutation();
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: product.title,
      author: product.author,
      price: product.price,
      category: product.category,
      description: product.description,
      quantity: product.quantity,
    },
  });

  const onSubmit = async (data: any) => {
    const { coverImage, ...payload } = data;
    const dataToSend = {
      id: product._id,
      payload,
      file: coverImage,
    };
    try {
      await updateProduct(dataToSend).unwrap();
      toast.success("Product updated successfully");
      setIsOpen(false);
    } catch {
      toast.error("Failed to update product.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <PenIcon className="h-4 w-4 mr-2" /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
          <DialogDescription className="sr-only">
            Modify the product details and save the changes.
          </DialogDescription>
        </DialogHeader>
        <Form form={form} onSubmit={onSubmit}>
          <form className="space-y-4">
            {["title", "author", "price", "quantity"].map((field) => (
              <TextInput
                key={field}
                name={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                type={
                  field === "price" || field === "quantity" ? "number" : "text"
                }
                placeholder={`Enter ${field}`}
              />
            ))}
            <SelectDropdown
              name="category"
              label="Category"
              options={categoryOptions}
              placeholder="Select a category"
            />
            <Textarea
              name="description"
              label="Description"
              placeholder="Enter product description"
            />
            <FileUpload
              name="coverImage"
              label="Cover Image"
              id="coverImage"
              acceptedFileTypes={["image/jpeg", "image/png", "image/webp"]}
              maxFileSize={5000000}
              description="Max file size: 500MB"
            />
            <Button type="submit" variant="default" className="w-full">
              Save Changes
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProductDialog;
