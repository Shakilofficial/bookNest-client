/* eslint-disable @typescript-eslint/no-explicit-any */
import GridSkeleton from "@/components/skeleton/GridSkeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import Container from "@/components/utils/Container";
import SectionHeader from "@/components/utils/SectionHeader";
import { useFetchUserOrdersQuery } from "@/redux/features/order/orderApi";
import { Calendar, CreditCard, Package, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Order = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { isLoading, data } = useFetchUserOrdersQuery({ page, limit });

  const orders = data?.data || [];
  const totalPages = data?.meta?.totalPage || 1;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <GridSkeleton />
      </div>
    );
  }

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

  return (
    <Container className="max-w-5xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-center items-center gap-2">
            <Package className="h-6 w-6" />
            <SectionHeader
              highlight="Your Order History"
              className="p-0 my-0"
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {orders.map((order: any, index: any) => (
              <AccordionItem value={`item-${index}`} key={order._id}>
                <AccordionTrigger>
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-4">
                      <ShoppingBag className="h-5 w-5" />
                      <span className="font-medium">
                        Order #{order._id.slice(-6)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      <span>${order.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Order Details
                      </h3>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                      <p>
                        <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
                      </p>
                      <p>
                        <strong>Status:</strong> {order.status}
                      </p>
                    </div>
                    {order.transaction && (
                      <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Payment Information
                        </h3>
                        <p>
                          <strong>Transaction ID:</strong>{" "}
                          {order.transaction.id}
                        </p>
                        <p>
                          <strong>Method:</strong> {order.transaction.method}
                        </p>
                        <p>
                          <strong>Date:</strong> {order.transaction.date_time}
                        </p>
                        <p>
                          <strong>Status:</strong>{" "}
                          {order.transaction.bank_status}
                        </p>
                      </div>
                    )}
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
                        {order.products.map((item: any, productIndex: any) => (
                          <TableRow key={productIndex}>
                            <TableCell className="font-medium">
                              {item.product ? (
                                <div className="flex items-center gap-2">
                                  <img
                                    src={
                                      item.product.coverImage ||
                                      "/placeholder.svg"
                                    }
                                    alt={item.product.title}
                                    className="w-10 h-10 object-cover rounded"
                                  />
                                  {item.product.title}
                                </div>
                              ) : (
                                "Product Unavailable"
                              )}
                            </TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>
                              $
                              {item.product
                                ? (item.product.price * item.quantity).toFixed(
                                    2
                                  )
                                : "N/A"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link to={`/order/verify?order_id=${order.transaction.id}`}>
                      <Button variant="outline" size="sm">
                        View Full Details
                      </Button>
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
    </Container>
  );
};

export default Order;
