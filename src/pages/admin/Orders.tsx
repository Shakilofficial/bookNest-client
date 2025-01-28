import { useFetchAllOrdersQuery } from "@/redux/features/order/orderApi";

const Orders = () => {
  const { isLoading, data } = useFetchAllOrdersQuery(undefined);
  console.log(data);
  return (
    <div>
      <h1>This is the Orders component</h1>
    </div>
  );
};

export default Orders;