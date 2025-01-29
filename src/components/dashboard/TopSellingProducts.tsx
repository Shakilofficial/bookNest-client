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
import { Loader2 } from "lucide-react";
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

const TopSellingProducts = () => {
  const [timeRange, setTimeRange] = useState("7");

  const { data, isLoading, error } = useFetchAllOrdersQuery({
    page: 1,
    limit: 1000,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const orders: TOrder[] = useMemo(() => data?.data || [], [data]);

  const topProducts = useMemo(() => {
    if (!orders.length) return [];

    const filteredOrders = orders.filter((order) => {
      if (!order?.createdAt || !order?.status || !order?.products) return false;
      const orderDate = new Date(order.createdAt);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - orderDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= Number(timeRange) && order.status === "Paid";
    });

    const productSales = filteredOrders.reduce((acc, order) => {
      order.products.forEach((item) => {
        if (item?.product?._id) {
          const productId = item.product._id;
          if (!acc[productId]) {
            acc[productId] = {
              name: item.product.title || "Unknown Product",
              quantity: 0,
              revenue: 0,
            };
          }
          acc[productId].quantity += item.quantity || 0;
          acc[productId].revenue += item.quantity * (item.product.price || 0);
        }
      });
      return acc;
    }, {} as Record<string, { name: string; quantity: number; revenue: number }>);

    return Object.values(productSales)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
      .map((product) => ({
        ...product,
        revenue: Number(product?.revenue.toFixed(2)),
      }));
  }, [orders, timeRange]);

  if (isLoading) {
    return (
      <Card className="h-full flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-full flex justify-center items-center">
        <p className="text-red-500 dark:text-red-400">
          Error loading data. Please try again.
        </p>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold text-foreground">
          Top Selling Products
        </CardTitle>
        <Select
          value={timeRange}
          onValueChange={(value) => setTimeRange(value)}
        >
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
