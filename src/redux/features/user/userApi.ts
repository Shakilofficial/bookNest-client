import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch the details of the authenticated user
    getUser: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // Update the authenticated user's profile
    updateProfile: builder.mutation({
      query: ({ payload, file }) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(payload));
        if (file) formData.append("profileImg", file);

        return {
          url: "/users/update-profile",
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["User"],
    }),

    // Fetch a single user by ID
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // Fetch all users with query parameters for filtering, pagination, etc.
    getAllUsers: builder.query({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params,
      }),
      providesTags: ["User"],
    }),

    // Block a user by ID
    blockUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateProfileMutation,
  useGetSingleUserQuery,
  useGetAllUsersQuery,
  useBlockUserMutation,
} = userApi;
