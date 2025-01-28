/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { logout, setUser } from "../features/auth/authSlice";
import { RootState } from "../store";

interface ErrorData {
  message: string;
  stack?: string;
  success: boolean;
}

interface IErrorResponse {
  status: number;
  data: ErrorData;
}

const API_BASE_URL = "http://localhost:5000/api/v1";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  IErrorResponse
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error) {
    const error = result.error as IErrorResponse;

    if (error.status === 404 || error.status === 403) {
      toast.error(error.data.message);
    }

    if (error.status === 401) {
      const res = await fetch(
        "http://localhost:5000/api/v1/auth/refresh-token",
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data?.data?.accessToken) {
        const user = (api.getState() as RootState).auth.user;

        api.dispatch(
          setUser({
            user,
            token: data.data.accessToken,
          })
        );

        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["User", "Products", "Reviews", "Orders", "UserOrders"],
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
