import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetchAllOrdersQuery } from "@/redux/features/order/orderApi";
import type { TOrder } from "@/types";
import { DollarSign } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Error from "../skeleton/Error";
import GridSkeleton from "../skeleton/GridSkeleton";

const TotalRevenue = () => {
  const { isFetching, isLoading, isError, error, data } =
    useFetchAllOrdersQuery({
      page: 1,
      limit: 1000,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  const orders: TOrder[] = data?.data || [];

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const percentageIncrease = 15;

  const chartData = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 3000 },
    { name: "Mar", revenue: 5000 },
    { name: "Apr", revenue: 4500 },
    { name: "May", revenue: 6000 },
    { name: "Jun", revenue: 5500 },
    { name: "Jul", revenue: totalRevenue },
  ];
  if (isFetching || isLoading) {
    return (
      <Card className="h-full flex justify-center items-center">
        <GridSkeleton />
      </Card>
    );
  }
  if (isError || error) {
    return (
      <Card className="h-full flex justify-center items-center">
        <Error />
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold text-foreground">
          Total Revenue
        </CardTitle>
        <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">
          ${totalRevenue.toFixed(2)}
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          <span className="text-green-600 dark:text-green-400 font-medium">
            ↑ {percentageIncrease}%
          </span>
          from last month
        </p>
        <div className="mt-4 h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "4px",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalRevenue;
