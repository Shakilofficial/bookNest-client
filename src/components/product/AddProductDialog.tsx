/* eslint-disable @typescript-eslint/no-unused-vars */
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
  coverImage: z.instanceof(File).optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

const AddProductDialog: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [createProduct] = useCreateProductMutation();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      author: "",
      price: 0,
      category: "Fiction",
      description: "",
      quantity: 0,
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "coverImage" && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      });

      await createProduct({
        payload: data,
        file: data.coverImage,
      }).unwrap();
      toast.success("Product created successfully");
      setIsOpen(false);
      form.reset();
    } catch (error) {
      toast.error("Failed to create product");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <Form form={form} onSubmit={onSubmit}>
          <TextInput
            name="title"
            label="Title"
            placeholder="Enter product title"
          />
          <TextInput
            name="author"
            label="Author"
            placeholder="Enter author name"
          />
          <TextInput
            name="price"
            label="Price"
            type="number"
            placeholder="Enter price"
          />
          <SelectDropdown
            name="category"
            label="Category"
            options={[
              { value: "Fiction", label: "Fiction" },
              { value: "Science", label: "Science" },
              { value: "SelfDevelopment", label: "Self Development" },
              { value: "Poetry", label: "Poetry" },
              { value: "Religious", label: "Religious" },
              { value: "Fantasy", label: "Fantasy" },
              { value: "Adventure", label: "Adventure" },
              { value: "Horror", label: "Horror" },
              { value: "Romance", label: "Romance" },
              { value: "Comedy", label: "Comedy" },
              { value: "Action", label: "Action" },
              { value: "Thriller", label: "Thriller" },
              { value: "Drama", label: "Drama" },
              { value: "Western", label: "Western" },
              { value: "Mystery", label: "Mystery" },
              { value: "ScienceFiction", label: "Science Fiction" },
              { value: "History", label: "History" },
              { value: "Technology", label: "Technology" },
            ]}
            placeholder="Select a category"
          />
          <Textarea
            name="description"
            label="Description"
            placeholder="Enter product description"
          />
          <TextInput
            name="quantity"
            label="Quantity"
            type="number"
            placeholder="Enter quantity"
          />
          <FileUpload
            name="coverImage"
            label="Cover Image"
            acceptedFileTypes={["image/jpeg", "image/png"]}
            maxFileSize={5000000}
            id="coverImage"
          />
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
