import { TProduct } from "@/types";
import ProductCard from "./ProductCard";

type ProductListProps = {
  products: TProduct[];
};

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {products?.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
