import CategoryFilter from "@/components/product/CategoryFilter";
import Pagination from "@/components/product/Pagination";
import ProductList from "@/components/product/ProductList";
import SearchBar from "@/components/product/SearchBar";
import SortDropdown from "@/components/product/SortDropdown";
import CardSkeleton from "@/components/skeleton/CardSkeleton";
import Error from "@/components/skeleton/Error";
import Container from "@/components/utils/Container";
import SectionHeader from "@/components/utils/SectionHeader";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import type { TQueryParam } from "@/types";
import { useCallback, useState } from "react";

const AllProducts = () => {
  const [queryParams, setQueryParams] = useState<TQueryParam[]>([
    { name: "page", value: "1" },
    { name: "limit", value: "12" },
  ]);

  const { isFetching, isLoading, isError, error, data } =
    useGetAllProductsQuery(queryParams);

  const updateQueryParams = useCallback((newParams: TQueryParam[]) => {
    setQueryParams((prev) => {
      const updatedParams = [...prev];
      newParams.forEach((param) => {
        const index = updatedParams.findIndex((p) => p.name === param.name);
        if (index !== -1) {
          updatedParams[index] = param;
        } else {
          updatedParams.push(param);
        }
      });
      return updatedParams;
    });
  }, []);

  const handleSearch = useCallback(
    (searchTerm: string) => {
      updateQueryParams([
        { name: "search", value: searchTerm },
        { name: "page", value: "1" },
      ]);
    },
    [updateQueryParams]
  );

  const handleCategoryFilter = useCallback(
    (category: string) => {
      updateQueryParams([
        { name: "category", value: category },
        { name: "page", value: "1" },
      ]);
    },
    [updateQueryParams]
  );

  const handleSort = useCallback(
    (sortOption: string) => {
      const [sortBy, sortOrder] = sortOption.split("-");
      updateQueryParams([
        { name: "sortBy", value: sortBy },
        { name: "sortOrder", value: sortOrder },
      ]);
    },
    [updateQueryParams]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateQueryParams([{ name: "page", value: page.toString() }]);
    },
    [updateQueryParams]
  );

  const searchTerm = (queryParams.find((p) => p.name === "search")?.value ||
    "") as string;

  return (
    <Container>
      <SectionHeader
        highlight="Discover Books"
        subtitle="Explore our vast collection"
      />
      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
        <aside className="space-y-6">
          <SearchBar value={searchTerm} onChange={handleSearch} />
          <CategoryFilter onCategoryChange={handleCategoryFilter} />
        </aside>

        <main>
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              {data?.meta?.total || 0} results found
            </p>
            <SortDropdown onSort={handleSort} />
          </div>

          {isFetching || isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          ) : isError || error ? (
            <Error />
          ) : (
            <>
              <ProductList products={data?.data || []} />
              <Pagination
                currentPage={Number(
                  queryParams.find((p) => p.name === "page")?.value || "1"
                )}
                totalItems={data?.meta?.total || 0}
                itemsPerPage={Number(
                  queryParams.find((p) => p.name === "limit")?.value || "12"
                )}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </main>
      </div>
    </Container>
  );
};

export default AllProducts;
