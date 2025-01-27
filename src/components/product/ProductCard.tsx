import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TProduct } from "@/types";
import { format } from "date-fns";
import { Eye, Heart, ShoppingCart } from "lucide-react";

import { useState } from "react";

interface ProductCardProps {
  product: TProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleAddToCart = () => {};

  return (
    <Card className="w-full mx-auto overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="p-0 relative">
        <img
          src={product.coverImage || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-64 object-cover"
        />
        <Badge
          variant="default"
          className="absolute top-2 right-2 text-xs py-1 px-2 rounded-full font-semibold bg-white text-gray-800"
        >
          {product.category}
        </Badge>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white text-lg font-semibold">
              {product.isDeleted ? "Unavailable" : "Out of Stock"}
            </span>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold">{product.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mt-1">
          {product.author || "Unknown Author"}
        </CardDescription>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-semibold">৳ {product.price.toFixed(2)}</p>
          <p
            className={`text-sm font-medium ${
              product.inStock ? "text-green-500" : "text-red-500"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm md:max-w-md rounded-md">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">
                  {product.title}
                </DialogTitle>
                <p className="text-muted-foreground">by {product.author}</p>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <img
                  src={product.coverImage || "/placeholder.svg"}
                  alt={product.title}
                  width={200}
                  height={300}
                  className="mx-auto"
                />
                <p>{product.description}</p>
                <div className="space-y-2">
                  <p>
                    <strong>Category:</strong> {product.category}
                  </p>
                  <p>
                    <strong>Published:</strong>
                    {format(new Date(product.publishedAt), "MMMM d, yyyy")}
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            onClick={handleLike}
            variant="outline"
            size="icon"
            className={`p-1 rounded-full ${
              isLiked ? "bg-red-100" : "bg-gray-100"
            }`}
          >
            <Heart
              className={`h-5 w-5 ${
                isLiked ? "text-red-500 fill-red-500" : "text-gray-500"
              }`}
            />
          </Button>
        </div>
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="flex items-center space-x-2"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Add to Cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
