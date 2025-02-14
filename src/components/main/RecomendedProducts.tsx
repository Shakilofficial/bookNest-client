import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types";
import { useEffect, useState } from "react";
import ProductCard from "../product/ProductCard";
import Error from "../skeleton/Error";
import GridSkeleton from "../skeleton/GridSkeleton";
import SectionHeader from "../utils/SectionHeader";

const RecomendedProducts = () => {
  const [products, setProducts] = useState<TProduct[]>([]);

  const { isFetching, isLoading, isError, error, data } =
    useGetAllProductsQuery([
      { name: "sortBy", value: "publishedAt" },
      { name: "sortOrder", value: "desc" },
      { name: "limit", value: 10 },
    ]);
  useEffect(() => {
    if (data?.data) {
      setProducts(data.data);
    }
  }, [data]);

  if (isFetching || isLoading) {
    return <GridSkeleton />;
  }

  if (isError || error) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <SectionHeader
          highlight="Recomended Products"
          subtitle="Explore your Recomended Products"
          className="text-center mb-8"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
          {products?.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecomendedProducts;
