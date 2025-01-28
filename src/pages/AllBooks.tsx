import Pagination from "@/components/product/Pagination";
import ProductList from "@/components/product/ProductList";
import SearchBar from "@/components/product/SearchBar";
import SortDropdown from "@/components/product/SortDropdown";
import Container from "@/components/utils/Container";
import SectionHeader from "@/components/utils/SectionHeader";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import type { TQueryParam } from "@/types";
import { useCallback, useState } from "react";

const AllBooks = () => {
  const [queryParams, setQueryParams] = useState<TQueryParam[]>([
    { name: "page", value: "1" },
    { name: "limit", value: "10" },
  ]);

  const { data, error, isLoading, isFetching } =
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <Container>
      <SectionHeader highlight="All Books" subtitle="Browse all books" />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <SearchBar onSearch={handleSearch} />
            <SortDropdown onSort={handleSort} />
          </div>
          {isFetching ? (
            <div>Updating...</div>
          ) : (
            <ProductList books={data?.data || []} />
          )}
          <Pagination
            currentPage={Number(
              queryParams.find((p) => p.name === "page")?.value || "1"
            )}
            totalItems={data?.meta?.total || 0}
            itemsPerPage={Number(
              queryParams.find((p) => p.name === "limit")?.value || "10"
            )}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Container>
  );
};

export default AllBooks;
