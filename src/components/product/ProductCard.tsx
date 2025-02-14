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
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hook";
import { TProduct } from "@/types";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: TProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

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
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer h-full flex flex-col group">
      <CardHeader className="p-0 relative overflow-hidden">
        <img
          src={product?.coverImage || "/placeholder.svg"}
          alt={product?.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge
          variant="secondary"
          className="absolute top-2 right-2 text-[10px] py-0.5 px-1 rounded-full font-semibold"
        >
          {product?.category}
        </Badge>
        {!product?.inStock && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <span className="text-foreground text-lg font-semibold">
              {product?.isDeleted ? "Unavailable" : "Out of Stock"}
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex flex-col p-2 flex-grow">
        <CardTitle className="text-sm font-semibold mb-1 line-clamp-2">
          {product?.title}
        </CardTitle>
        <CardDescription className="text-xs flex justify-between items-center mt-1">
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
          <p className="text-sm font-semibold">৳ {product?.price.toFixed(2)}</p>
          <Badge variant={product?.inStock ? "secondary" : "destructive"}>
            {product?.inStock ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-2 flex justify-between items-center gap-1">
        <Link to={`/product/${product?._id}`} className="flex-1">
          <Button variant="secondary" className="p-1 text-xs sm:p-2 md:p-3">
            <Eye className="text-sm sm:text-base md:text-lg" />
            <span className="hidden lg:inline text-xs">View Details</span>
          </Button>
        </Link>
        <Button
          variant="default"
          onClick={() => handleAddToCart()}
          disabled={!product?.inStock}
          className="p-1 text-xs sm:p-2 md:p-3"
        >
          <ShoppingCart className="text-sm sm:text-base md:text-lg" />
          <span className="hidden lg:inline text-xs">Add to Cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
