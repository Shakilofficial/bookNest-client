import { useGetAllUsersQuery } from "@/redux/features/user/userApi";

const Users = () => {
  const { isLoading, data } = useGetAllUsersQuery(undefined);
  console.log(data);
  return (
    <div>
      <h1>This is the Users component</h1>
    </div>
  );
};

export default Users;
