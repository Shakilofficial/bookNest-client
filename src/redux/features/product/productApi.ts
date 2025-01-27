import { baseApi } from "@/redux/api/baseApi";
import { TProduct, TQueryParam, TResponseRedux } from "@/types";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/products",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TProduct[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    // Fetch a single product by ID
    getSingleProduct: builder.query({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TProduct>) => response.data,
    }),

    // Create a new product
    createProduct: builder.mutation({
      query: ({ payload, file }: { payload: TProduct; file: File }) => {
        const formData = new FormData();
        formData.append("coverImage", file);
        formData.append("data", JSON.stringify(payload));

        return {
          url: "/products",
          method: "POST",
          body: formData,
        };
      },
      transformResponse: (response: TResponseRedux<TProduct>) => response.data,
    }),

    // Update a product by ID
    updateProduct: builder.mutation({
      query: ({
        id,
        payload,
        file,
      }: {
        id: string;
        payload: TProduct;
        file?: File;
      }) => {
        const formData = new FormData();
        if (file) {
          formData.append("coverImage", file);
        }
        formData.append("data", JSON.stringify(payload));

        return {
          url: `/products/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      transformResponse: (response: TResponseRedux<TProduct>) => response.data,
    }),

    // Delete a product by ID
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: TResponseRedux<TProduct>) => response.data,
    }),
  }),
});

export const {
  useGetSingleProductQuery,
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
