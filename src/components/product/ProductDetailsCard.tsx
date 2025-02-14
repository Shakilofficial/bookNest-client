import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hook";
import type { TProduct } from "@/types";
import { ShoppingCart } from "lucide-react";

interface ProductDetailsCardProps {
  product: TProduct;
}

const ProductDetailsCard = ({ product }: ProductDetailsCardProps) => {
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product: product?._id,
        title: product?.title,
        price: product?.price,
        quantity: 1,
        stock: product?.quantity,
        coverImage: product?.coverImage,
      })
    );
  };

  return (
    <Card className="overflow-hidden shadow-lg">
      <div className="md:flex">
        <div className="md:w-1/3">
          <img
            src={product?.coverImage || "/placeholder.svg"}
            alt={product?.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-2/3 p-6 flex flex-col justify-between">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                  {product?.title}
                </CardTitle>
                <p className="md:text-lg lg:text-xl mb-2 text-muted-foreground font-bold">
                  by {product?.author}
                </p>
                <Badge
                  variant={product?.inStock ? "default" : "destructive"}
                  className="text-xs md:text-sm"
                >
                  {product?.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{product?.description}</p>
            <p className="md:text-lg lg:text-xl mb-2 text-muted-foreground font-bold">
              Published: {new Date(product?.publishedAt).toLocaleDateString()}
            </p>
            <p className="text-2xl font-bold mb-4">
              ৳ {product?.price.toFixed(2)}
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => handleAddToCart()}
              disabled={!product?.inStock}
              className="w-full md:w-auto"
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default ProductDetailsCard;
