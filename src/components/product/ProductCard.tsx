"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hook";
import type { TProduct } from "@/types";
import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: TProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

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

  // Generate a random rating between 3.5 and 5.0 for demo purposes
  const rating = 3.5 + Math.random() * 1.5;

  return (
    <Card
      className="relative h-full overflow-hidden border border-emerald-800/30 rounded-lg transition-all duration-300 hover:shadow-[0_8px_20px_rgb(0,0,0,0.15)] hover:border-emerald-700/50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product?._id}`} className="flex flex-col h-full">
        {/* Image section */}
        <div className="relative overflow-hidden">
          {/* Green accent */}
          <div className="absolute left-0 top-0 h-full w-[3px] bg-emerald-500/80 z-10" />

          <div className="relative pt-[100%] overflow-hidden bg-muted/30">
            <img
              src={product?.coverImage || "/placeholder.svg"}
              alt={product?.title}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105"
            />

            {/* Category badge */}
            <Badge
              variant="secondary"
              className="absolute top-2 right-2 text-[10px] py-0.5 px-2 rounded-full font-medium bg-emerald-950/80 text-emerald-100 backdrop-blur-sm z-10"
            >
              {product?.category}
            </Badge>

            {/* Out of stock overlay */}
            {!product?.inStock && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-20">
                <span className="text-foreground text-lg font-semibold">
                  {product?.isDeleted ? "Unavailable" : "Out of Stock"}
                </span>
              </div>
            )}

            {/* Quick action buttons overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-black/20 to-transparent flex items-end justify-between p-3 transition-opacity duration-300 z-10 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              onClick={(e) => e.preventDefault()}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLike}
                className={`h-7 w-7 rounded-full bg-background/90 backdrop-blur-sm hover:bg-emerald-900 ${
                  isLiked ? "text-red-500" : "text-foreground"
                }`}
              >
                <Heart
                  className={`h-3.5 w-3.5 ${isLiked ? "fill-current" : ""}`}
                />
              </Button>

              <div className="flex gap-1.5">
                <Link
                  to={`/product/${product?._id}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full bg-background/90 backdrop-blur-sm hover:bg-emerald-900"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleAddToCart}
                  disabled={!product?.inStock}
                  className="h-7 w-7 rounded-full bg-background/90 backdrop-blur-sm hover:bg-emerald-900"
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="flex flex-col p-2.5 flex-grow">
          {/* Title and author */}
          <div className="mb-auto">
            <h3 className="font-medium text-sm line-clamp-1 group-hover:text-emerald-400 transition-colors">
              {product?.title}
            </h3>

            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
              by {product?.author || "Unknown Author"}
            </p>

            {/* Rating - simplified */}
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-3 w-3 text-emerald-400 fill-emerald-400" />
              <span className="text-xs text-muted-foreground">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Price and stock */}
          <div className="flex items-center justify-between mt-1.5">
            <p className="text-lg font-semibold">
              ৳ {product?.price.toFixed(2)}
            </p>
            <Badge
              variant={product?.inStock ? "outline" : "destructive"}
              className={`text-[10px] py-0 h-5 font-normal ${
                product?.inStock ? "border-emerald-500 text-emerald-400" : ""
              }`}
            >
              {product?.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default ProductCard;
