import DashboardCard from "@/components/dashboard/DashboardCard";
import RecentOrders from "@/components/dashboard/RecentOrders";
import TopSellingProducts from "@/components/dashboard/TopSellingProducts";
import TotalRevenue from "@/components/dashboard/TotalRevenue";
import Error from "@/components/skeleton/Error";
import GridSkeleton from "@/components/skeleton/GridSkeleton";
import SectionHeader from "@/components/utils/SectionHeader";
import { useFetchAllOrdersQuery } from "@/redux/features/order/orderApi";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { TOrder } from "@/types";
import {
  CreditCard,
  DollarSign,
  Package,
  ShoppingBag,
  Star,
  Users,
} from "lucide-react";

const Dashboard = () => {
  const {
    isFetching,
    isLoading,
    isError,
    error,
    data: ordersData,
  } = useFetchAllOrdersQuery({
    page: 1,
    limit: 1000,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const orders: TOrder[] = ordersData?.data || [];

  const {
    isFetching: usersFetching,
    isLoading: usersLoading,
    isError: isUsersError,
    error: usersError,
    data: usersData,
  } = useGetAllUsersQuery(undefined);
  const {
    isFetching: productsFetching,
    isLoading: productsLoading,
    isError: isProductsError,
    error: productsError,
    data: productsData,
  } = useGetAllProductsQuery(undefined);

  if (
    isFetching ||
    usersFetching ||
    productsFetching ||
    isLoading ||
    usersLoading ||
    productsLoading
  ) {
    return (
      <div>
        <GridSkeleton />
      </div>
    );
  }
  if (
    isError ||
    isUsersError ||
    isProductsError ||
    error ||
    usersError ||
    productsError
  ) {
    return (
      <div>
        <Error />
      </div>
    );
  }
  const totalOrders = orders?.length;
  const totalCustomers = new Set(orders?.map((order) => order?.user?._id)).size;
  const totalRevenue = orders?.reduce(
    (sum, order) => sum + order?.totalPrice,
    0
  );
  const averageOrderValue = totalRevenue / totalOrders || 0;

  return (
    <div className="p-6 sm:p-10 space-y-8 bg-background min-h-screen">
      <SectionHeader highlight="Dashboard" subtitle="Overview of Dashboard" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon={<DollarSign className="h-6 w-6" />}
          description="+20.1% from last month"
          trend="up"
        />
        <DashboardCard
          title="Total Orders"
          value={totalOrders}
          icon={<ShoppingBag className="h-6 w-6" />}
          description="+15% from last month"
          trend="up"
        />
        <DashboardCard
          title="Total Customers"
          value={totalCustomers}
          icon={<Users className="h-6 w-6" />}
          description="+10.5% from last month"
          trend="up"
        />
        <DashboardCard
          title="Average Order Value"
          value={`$${averageOrderValue.toFixed(2)}`}
          icon={<CreditCard className="h-6 w-6" />}
          description="+7% from last month"
          trend="up"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TotalRevenue />
        </div>
        <div className="lg:col-span-1">
          <TopSellingProducts />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <DashboardCard
            title="Total Users"
            value={usersLoading ? "Loading..." : usersData?.meta?.total || 0}
            icon={<Users className="h-6 w-6" />}
            description="+20.1% from last month"
            trend="up"
          />
        </div>
        <div className="md:col-span-1">
          <DashboardCard
            title="Total Products"
            value={
              productsLoading ? "Loading..." : productsData?.meta?.total || 0
            }
            icon={<Package className="h-6 w-6" />}
            description="+5.2% from last month"
            trend="up"
          />
        </div>
        <div className="md:col-span-1">
          <DashboardCard
            title="Average Rating"
            value="4.8"
            icon={<Star className="h-6 w-6" />}
            description="+0.2 from last month"
            trend="up"
          />
        </div>
      </div>
      <div className="mt-6">
        <RecentOrders />
      </div>
    </div>
  );
};

export default Dashboard;
