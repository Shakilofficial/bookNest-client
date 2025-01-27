import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux, TReview } from "@/types";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all reviews for a specific product
    getAllReviews: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/reviews/product/${args.productId}`,
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TReview[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    // Add a new review
    addReview: builder.mutation({
      query: (payload: TReview) => {
        return {
          url: "/reviews",
          method: "POST",
          body: payload,
        };
      },
      transformResponse: (response: TResponseRedux<TReview>) => response.data,
    }),

    // Update a review by ID
    updateReview: builder.mutation({
      query: ({ id, payload }: { id: string; payload: TReview }) => {
        return {
          url: `/reviews/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      transformResponse: (response: TResponseRedux<TReview>) => response.data,
    }),

    // Delete a review by ID
    deleteReview: builder.mutation({
      query: (id: string) => {
        return {
          url: `/reviews/${id}`,
          method: "DELETE",
        };
      },
      transformResponse: (response: TResponseRedux<{ message: string }>) =>
        response.data,
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetAllReviewsQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
