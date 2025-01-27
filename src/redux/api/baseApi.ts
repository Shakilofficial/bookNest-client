import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { logout, setUser } from "../features/auth/authSlice";
import { RootState } from "../store";

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
  string | FetchArgs,
  unknown,
  unknown
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error) {
    const status = result.error.status;

    // Handle specific status codes
    switch (status) {
      case 401: {
        // Refresh the token
        const refreshResponse = await fetch(
          `${API_BASE_URL}/auth/refresh-token`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          const { accessToken } = refreshData?.data || {};

          if (accessToken) {
            const user = (api.getState() as RootState).auth.user;

            // Update the user and token in the state
            api.dispatch(
              setUser({
                user,
                token: accessToken,
              })
            );

            // Retry the original request with the new token
            result = await baseQuery(args, api, extraOptions);
          } else {
            toast.error("Session expired. Please log in again.");
            api.dispatch(logout()); // Dispatch logout if token refresh fails
          }
        } else {
          toast.error("Failed to refresh token. Logging out.");
          api.dispatch(logout()); // Dispatch logout if refresh fails
        }
        break;
      }
      case 404:
        toast.error(result?.error?.data?.message || "Resource not found");
        break;
      default:
        toast.error(result?.error?.data?.message || "An error occurred");
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
