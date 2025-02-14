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
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hook";
import { TProduct } from "@/types";
import { format } from "date-fns";
import { Eye, Heart, ShoppingCart } from "lucide-react";

import { useState } from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: TProduct;
}

const FeaturedProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  //show toast when product added to cart

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product: product._id,
        title: product.title,
        price: product.price,
        quantity: 1,
        stock: product.quantity,
        coverImage: product.coverImage,
      })
    );
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer h-[340px] max-w-xs mx-auto flex flex-col group border bg-card rounded-lg">
      <CardHeader className="p-0 relative overflow-hidden">
        <img
          src={product?.coverImage || "/placeholder.svg"}
          alt={product?.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge
          variant="default"
          className="absolute top-2 right-2 text-xs py-1 px-2 rounded-full font-medium bg-secondary text-secondary-foreground"
        >
          {product?.category}
        </Badge>
        {!product?.inStock && (
          <div className="absolute inset-0 bg-overlay flex items-center justify-center">
            <span className="text-overlay-foreground text-sm font-medium">
              {product?.isDeleted ? "Unavailable" : "Out of Stock"}
            </span>
          </div>
        )}
      </CardHeader>

      <CardContent className="flex flex-col p-4 flex-grow">
        <CardTitle className="text-sm font-semibold mb-1 line-clamp-2 text-primary">
          {product?.title}
        </CardTitle>
        <CardDescription className="text-xs flex justify-between items-center mt-1 text-muted-foreground">
          <p className="line-clamp-1">{product?.author || "Unknown Author"}</p>
          <Button
            onClick={handleLike}
            variant="ghost"
            size="icon"
            className={`p-1 rounded-full transition-colors ${
              isLiked
                ? "text-red-500 hover:text-red-600"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
          </Button>
        </CardDescription>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm font-semibold text-primary">
            ৳ {product?.price.toFixed(2)}
          </p>
          <p
            className={`text-xs font-medium ${
              product?.inStock ? "text-success" : "text-destructive"
            }`}
          >
            {product?.inStock ? "In Stock" : "Out of Stock"}
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-4 flex justify-between items-center gap-2">
        <div className="flex items-center space-x-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="p-1">
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[300px] rounded-lg bg-card">
              <DialogHeader>
                <DialogTitle className="text-base font-semibold text-primary">
                  {product?.title}
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  by {product?.author}
                </p>
              </DialogHeader>
              <DialogFooter className="grid gap-3 py-4">
                <img
                  src={product?.coverImage || "/placeholder.svg"}
                  alt={product?.title}
                  className="w-28 mx-auto"
                />
                <p className="text-sm text-muted-foreground">
                  {product?.description}
                </p>
                <div className="space-y-1 text-muted-foreground">
                  <p>
                    <strong>Category:</strong> {product?.category}
                  </p>
                  <p>
                    <strong>Published:</strong>{" "}
                    {format(new Date(product?.publishedAt), "MMMM d, yyyy")}
                  </p>
                </div>
                <Link to={`/product/${product?._id}`}>
                  <Button className="w-full text-sm font-medium">
                    View More
                  </Button>
                </Link>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Button
          variant="default"
          onClick={() => handleAddToCart()}
          disabled={!product?.inStock}
          className="p-1 text-xs"
        >
          <ShoppingCart className="text-sm" />
          <span className="text-xs">Add to Cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeaturedProductCard;
