import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFetchAllOrdersQuery } from "@/redux/features/order/orderApi";
import type { TOrder } from "@/types";
import { Package } from "lucide-react";

const RecentOrders = () => {
  const { data } = useFetchAllOrdersQuery({
    page: 1,
    limit: 5,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const recentOrders: TOrder[] = data?.data || [];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Package className="h-5 w-5 text-primary" />
          Recent Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {recentOrders.map((order) => (
            <div
              key={order._id}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none text-foreground">
                  {order.user.name} placed an order for $
                  {order.totalPrice.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <Badge
                  className={`${getStatusColor(
                    order.status
                  )} text-xs font-medium`}
                >
                  {order.status}
                </Badge>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
