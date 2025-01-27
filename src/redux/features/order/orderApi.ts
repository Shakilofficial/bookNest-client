import { baseApi } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all orders
    fetchAllOrders: builder.query({
      query: (params) => ({
        url: "/orders/all",
        method: "GET",
        params, 
      }),
      providesTags: ["Orders"], 
    }),

    // Fetch user-specific orders
    fetchUserOrders: builder.query({
      query: (params) => ({
        url: "/orders",
        method: "GET",
        params, 
      }),
      providesTags: ["UserOrders"],
    }),

    // Create a new order
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Orders", "UserOrders"],
    }),

    // Verify a payment
    verifyPayment: builder.query({
      query: (orderId) => ({
        url: `/orders/verify?order_id=${orderId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useFetchAllOrdersQuery,
  useFetchUserOrdersQuery,
  useCreateOrderMutation,
  useVerifyPaymentQuery,
} = orderApi;
