import { logout } from "@/redux/features/auth/authSlice";
import { useGetUserQuery } from "@/redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AvatarSkeleton from "../skeleton/AvatarSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const UserProfile = () => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Fetch user data
  const { data, isLoading, error } = useGetUserQuery(token ? { token } : null);

  const handleLoginRedirect = () => {
    if (!data) {
      navigate("/auth/login");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  const user = data?.data;

  if (isLoading) {
    return <AvatarSkeleton />;
  }

  if (error) {
    console.error("Failed to fetch user data:", error);
    return (
      <Button
        variant="ghost"
        className="relative h-8 w-8 rounded-full"
        onClick={handleLoginRedirect}
      >
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full"
          onClick={!user ? handleLoginRedirect : undefined}
        >
          <Avatar isLoggedIn={!!user}>
            {user ? (
              <>
                <AvatarImage
                  src={user.profileImg}
                  alt={user.fullName || "User"}
                />
                <AvatarFallback>
                  {user.fullName?.[0]?.toUpperCase() || (
                    <User className="h-4 w-4" />
                  )}
                </AvatarFallback>
              </>
            ) : (
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      {user && (
        <DropdownMenuContent className="w-44" align="end" forceMount>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/profile")}>
            Profile
          </DropdownMenuItem>

          {/* Conditionally render menu items based on user role */}
          {user.role === "user" && (
            <>
              <DropdownMenuItem onClick={() => navigate("/wishlists")}>
                WishLists
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/orders")}>
                My Orders
              </DropdownMenuItem>
            </>
          )}

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default UserProfile;
