/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { TProduct, TQueryParam, TResponseRedux } from "@/types";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products with optional query parameters
    getAllProducts: builder.query({
      query: (args?: TQueryParam[]) => {
        const params = new URLSearchParams();
        args?.forEach((item) => params.append(item.name, String(item.value)));

        return {
          url: `/products?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TProduct[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
      providesTags: ["Product"],
    }),

    // Fetch a single product by ID
    getSingleProduct: builder.query({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TProduct>) => response.data,
      providesTags: ["Product"],
    }),

    createProduct: builder.mutation({
      query: ({ payload, file }: { payload: any; file?: File }) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(payload));
        if (file) formData.append("coverImage", file);

        return {
          url: "/products",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),

    // Update a product by ID
    updateProduct: builder.mutation({
      query: ({
        id,
        payload,
        file,
      }: {
        id: string;
        payload: Partial<TProduct>;
        file?: File;
      }) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(payload));
        if (file) {
          formData.append("coverImage", file);
        }

        return {
          url: `/products/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),

    // Delete a product by ID
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
