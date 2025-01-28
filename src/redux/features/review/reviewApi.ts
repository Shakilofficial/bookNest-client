import { baseApi } from "@/redux/api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all reviews for a specific product
    fetchProductReviews: builder.query({
      query: (productId) => ({
        url: `/reviews/product/${productId}`,
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),

    // Add a new review
    createReview: builder.mutation({
      query: ({ productId, reviewData }) => ({
        url: `/reviews/product/${productId}`,
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["Reviews"],
    }),

    // Update an existing review
    updateReview: builder.mutation({
      query: ({ reviewId, reviewData }) => ({
        url: `/reviews/${reviewId}`,
        method: "PATCH",
        body: reviewData,
      }),
      invalidatesTags: ["Reviews"],
    }),

    // Delete a review
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/reviews/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  useFetchProductReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
