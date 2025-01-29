import CardSkeleton from "@/components/skeleton/CardSkeleton";
import Error from "@/components/skeleton/Error";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useFetchAllOrdersQuery } from "@/redux/features/order/orderApi";
import type { TOrder } from "@/types";
import { ArrowUpDown, Calendar, CreditCard, Eye } from "lucide-react";
import { useState } from "react";

const Orders = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [search, setSearch] = useState("");

  const { isLoading, isFetching, data, error } = useFetchAllOrdersQuery({
    page,
    limit,
    sortBy,
    sortOrder,
    search,
  });

  const orders: TOrder[] = data?.data || [];
  const totalPages = data?.meta?.totalPage || 1;

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading || isFetching) {
    return (
      <div>
        <CardSkeleton />
        <CardSkeleton />
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
      <CardHeader>
        <CardTitle className="items-center gap-2">
          <SectionHeader
            highlight="Orders"
            subtitle="Manage all user orders here"
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("user.name")}>
                  Customer <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("totalPrice")}
                >
                  Total <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("createdAt")}>
                  Date <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell className="font-medium">
                  {order._id.slice(-6)}
                </TableCell>
                <TableCell>{order.user.name}</TableCell>
                <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Order Details</DialogTitle>
                      </DialogHeader>
                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <h3 className="font-semibold mb-2 flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Order Information
                          </h3>
                          <p>
                            <strong>Order ID:</strong> {order._id}
                          </p>
                          <p>
                            <strong>Date:</strong>{" "}
                            {new Date(order.createdAt).toLocaleString()}
                          </p>
                          <p>
                            <strong>Total:</strong> $
                            {order.totalPrice.toFixed(2)}
                          </p>
                          <p>
                            <strong>Status:</strong> {order.status}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2 flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            Customer Information
                          </h3>
                          <p>
                            <strong>Name:</strong> {order.user.name}
                          </p>
                          <p>
                            <strong>Email:</strong> {order.user.email}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h3 className="font-semibold mb-2">Products</h3>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Product</TableHead>
                              <TableHead>Quantity</TableHead>
                              <TableHead>Price</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {order.products.map((item, productIndex) => (
                              <TableRow key={productIndex}>
                                <TableCell className="font-medium">
                                  {item?.product?.title || "No Title"}
                                </TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>
                                  $
                                  {(
                                    (item?.product?.price || 0) * item.quantity
                                  ).toFixed(2)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage(page > 1 ? page - 1 : 1)}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setPage(index + 1)}
                  isActive={page === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setPage(page < totalPages ? page + 1 : totalPages)
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
};

export default Orders;
