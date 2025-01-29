import AddProductDialog from "@/components/product/AddProductDialog";
import Error from "@/components/skeleton/Error";
import GridSkeleton from "@/components/skeleton/GridSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SectionHeader from "@/components/utils/SectionHeader";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/redux/features/product/productApi";
import { TProduct } from "@/types";

import { ArrowUpDown, PenBoxIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

type TQueryParam = {
  name: string;
  value: string;
};

const Products = () => {
  const [queryParams, setQueryParams] = useState<TQueryParam[]>([
    { name: "page", value: "1" },
    { name: "limit", value: "10" },
  ]);

  const { data, error, isLoading, isFetching } =
    useGetAllProductsQuery(queryParams);
  const [deleteProduct] = useDeleteProductMutation();

  const products: TProduct[] = data?.data || [];
  const totalPages = data?.meta?.totalPage || 1;

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
    (sortBy: string) => {
      const currentSortOrder =
        queryParams.find((p) => p.name === "sortOrder")?.value || "asc";
      const newSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
      updateQueryParams([
        { name: "sortBy", value: sortBy },
        { name: "sortOrder", value: newSortOrder },
      ]);
    },
    [updateQueryParams, queryParams]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateQueryParams([{ name: "page", value: page.toString() }]);
    },
    [updateQueryParams]
  );

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted successfully.");
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product. Please try again.");
    }
  };

  if (isLoading || isFetching) {
    return (
      <div>
        <GridSkeleton />
        <GridSkeleton />
        <GridSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  return (
    <Card>
      <SectionHeader
        className="pt-6"
        highlight="Products"
        subtitle="Manage your products here"
      />
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Input
            placeholder="Search products..."
            onChange={(e) => handleSearch(e.target.value)}
            className="max-w-sm"
          />
          <AddProductDialog />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("title")}>
                  Title <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("author")}>
                  Author <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("price")}>
                  Price <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("quantity")}>
                  Qnt <ArrowUpDown className="ml-2 h-4 w-4" size={16} />
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product: TProduct) => (
              <TableRow key={product._id}>
                <TableCell>
                  <img
                    src={product.coverImage || "/placeholder.svg"}
                    alt={product.title}
                    className="w-16 h-16 object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell>{product.author}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-center">
                  {product.quantity}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={product.isDeleted ? "destructive" : "default"}
                  >
                    {product.isDeleted ? "Deleted" : "Active"}
                  </Badge>
                </TableCell>
                <TableCell className="flex justify-between items-center gap-1 mt-3">
                  <Button variant="secondary" size="sm">
                    <PenBoxIcon className="h-4 w-4 mr-2" />
                  </Button>
                  <Button
                    variant={product.isDeleted ? "ghost" : "destructive"}
                    size="sm"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    {product.isDeleted ? "Restore" : "Delete"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  handlePageChange(
                    Math.max(
                      1,
                      Number(
                        queryParams.find((p) => p.name === "page")?.value
                      ) - 1
                    )
                  )
                }
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => handlePageChange(index + 1)}
                  isActive={
                    Number(
                      queryParams.find((p) => p.name === "page")?.value
                    ) ===
                    index + 1
                  }
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  handlePageChange(
                    Math.min(
                      totalPages,
                      Number(
                        queryParams.find((p) => p.name === "page")?.value
                      ) + 1
                    )
                  )
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
};

export default Products;
