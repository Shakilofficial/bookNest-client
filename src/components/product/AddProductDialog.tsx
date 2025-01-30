/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import React from "react";
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
  category: z.enum([
    "Fiction",
    "Science",
    "SelfDevelopment",
    "Poetry",
    "Religious",
    "Fantasy",
    "Adventure",
    "Horror",
    "Romance",
    "Comedy",
    "Action",
    "Thriller",
    "Drama",
    "Western",
    "Mystery",
    "ScienceFiction",
    "History",
    "Technology",
  ]),
  description: z.string().min(1, "Description is required"),
  quantity: z.coerce
    .number()
    .int()
    .min(0, "Quantity must be a non-negative integer"),
  coverImage: z.any().optional(),
});

const categoryOptions = [
  "Fiction",
  "Science",
  "SelfDevelopment",
  "Poetry",
  "Religious",
  "Fantasy",
  "Adventure",
  "Horror",
  "Romance",
  "Comedy",
  "Action",
  "Thriller",
  "Drama",
  "Western",
  "Mystery",
  "ScienceFiction",
  "History",
  "Technology",
].map((cat) => ({ value: cat, label: cat }));

const AddProductDialog = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [createProduct] = useCreateProductMutation();
  const form = useForm({ resolver: zodResolver(productSchema) });

  const onSubmit = async (data: any) => {
    const { coverImage, ...payload } = data;
    const dataToSend = {
      payload,
      file: coverImage,
    };
    try {
      await createProduct(dataToSend).unwrap();
      toast.success("Product created successfully");
      setIsOpen(false);
    } catch {
      toast.error("Failed to create product.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusIcon className="h-4 w-4 mr-2" /> Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <Form form={form} onSubmit={onSubmit}>
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
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
