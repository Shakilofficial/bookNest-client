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
  }),
});

export const { useGetAllProductsQuery } = productApi;
