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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TProduct } from "@/types";
import { format } from "date-fns";
import { Eye, Heart, ShoppingCart } from "lucide-react";

import { useState } from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: TProduct;
}

const FeaturedProductCard = ({ product }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleAddToCart = () => {};

  return (
    <Card className="w-full h-[350px] max-w-xs mx-auto overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow duration-300 hover:shadow-md">
      <CardHeader className="p-0 relative">
        <img
          src={product.coverImage || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-40 object-cover"
        />
        <Badge
          variant="default"
          className="absolute top-2 right-2 text-xs py-1 px-2 rounded-full font-medium bg-secondary text-secondary-foreground"
        >
          {product.category}
        </Badge>
        {!product.inStock && (
          <div className="absolute inset-0 bg-overlay flex items-center justify-center">
            <span className="text-overlay-foreground text-sm font-medium">
              {product.isDeleted ? "Unavailable" : "Out of Stock"}
            </span>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-4">
        <CardTitle className="text-sm sm:text-base font-semibold leading-tight text-primary">
          {product.title}
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
          {product.author || "Unknown Author"}
        </CardDescription>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm sm:text-base font-semibold text-primary">
            ৳ {product.price.toFixed(2)}
          </p>
          <p
            className={`text-xs sm:text-sm font-medium ${
              product.inStock ? "text-success" : "text-destructive"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="p-1 sm:p-2">
                <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[300px] rounded-lg bg-card">
              <DialogHeader>
                <DialogTitle className="text-base font-semibold text-primary">
                  {product.title}
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  by {product.author}
                </p>
              </DialogHeader>
              <DialogFooter className="grid gap-3 py-4">
                <img
                  src={product.coverImage || "/placeholder.svg"}
                  alt={product.title}
                  className="w-28 mx-auto"
                />
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
                <div className="space-y-1 text-muted-foreground">
                  <p>
                    <strong>Category:</strong> {product.category}
                  </p>
                  <p>
                    <strong>Published:</strong>{" "}
                    {format(new Date(product.publishedAt), "MMMM d, yyyy")}
                  </p>
                </div>
                <Link to={`/product/${product._id}`}>
                  <Button className="w-full text-sm font-medium">
                    View More
                  </Button>
                </Link>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            onClick={handleLike}
            variant="outline"
            size="icon"
            className={`p-1 sm:p-2 rounded-full ${
              isLiked ? "bg-accent" : "bg-card"
            } transition-colors`}
          >
            <Heart
              className={`h-4 w-4 sm:h-5 sm:w-5 ${
                isLiked ? "text-destructive" : "text-muted-foreground"
              }`}
            />
          </Button>
        </div>
        <Button
          variant="default"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="p-1 text-xs sm:p-2 md:p-3"
        >
          <ShoppingCart className="text-sm sm:text-base md:text-lg" />
          <span className=" text-xs">Add to Cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeaturedProductCard;
