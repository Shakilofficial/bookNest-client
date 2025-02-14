import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetchAllOrdersQuery } from "@/redux/features/order/orderApi";
import { TOrder } from "@/types";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Error from "../skeleton/Error";
import GridSkeleton from "../skeleton/GridSkeleton";

const TopSellingProducts = () => {
  const [timeRange, setTimeRange] = useState("7");

  // Fetch all orders
  const { isFetching, isLoading, isError, error, data } =
    useFetchAllOrdersQuery({
      page: 1,
      limit: 1000,
      sortBy: "createdAt",
      sortOrder: "desc",
    });

  const orders: TOrder[] = useMemo(() => data?.data || [], [data]);

  const topProducts = useMemo(() => {
    if (!orders.length) return [];

    const now = Date.now();
    const timeRangeMs = Number(timeRange) * 24 * 60 * 60 * 1000;

    const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt).getTime();
      return now - orderDate <= timeRangeMs && order.status === "Paid";
    });

    const productSales = filteredOrders.reduce((acc, order) => {
      order.products.forEach((item) => {
        const productId = item.product?._id;
        if (!productId) return;

        if (!acc[productId]) {
          acc[productId] = {
            name: item.product.title || "Unknown Product",
            quantity: 0,
            revenue: 0,
          };
        }

        acc[productId].quantity += item.quantity || 0;
        acc[productId].revenue += item.quantity * (item.product.price || 0);
      });
      return acc;
    }, {} as Record<string, { name: string; quantity: number; revenue: number }>);

    return Object.values(productSales)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
      .map((product) => ({
        ...product,
        revenue: Number(product.revenue.toFixed(2)),
      }));
  }, [orders, timeRange]);

  // Loading state
  if (isFetching || isLoading) {
    return (
      <Card className="h-full flex justify-center items-center">
        <GridSkeleton />
      </Card>
    );
  }

  // Error state
  if (isError || error) {
    return (
      <Card className="h-full flex justify-center items-center">
        <Error />
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold text-foreground">
          Top Selling Products
        </CardTitle>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {topProducts.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={topProducts}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={70}
                stroke="hsl(var(--foreground))"
              />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "4px",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Bar
                dataKey="revenue"
                fill="hsl(var(--primary))"
                name="Revenue ($)"
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center py-8 text-muted-foreground">
            No data available for the selected time range.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default TopSellingProducts;
