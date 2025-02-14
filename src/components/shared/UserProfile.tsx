import { logout } from "@/redux/features/auth/authSlice";
import { useGetUserQuery } from "@/redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { User } from "lucide-react";
import { useState } from "react";
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
import ProfileDialog from "../user/ProfileDialog";
import UpdateProfileDialog from "../user/UpdateProfileDialog";

const UserProfile = () => {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const { token } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Fetch user data
  const { data, isLoading, isFetching, error } = useGetUserQuery(
    token ? { token } : null,
    { skip: !token }
  );
  const user = data?.data;

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  // Show loading state
  if (isLoading || isFetching) {
    return (
      <div>
        <AvatarSkeleton />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <Button variant="ghost" onClick={() => navigate("/auth/login")}>
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar>
                <AvatarImage src={user?.profileImg} alt={user?.name} />
                <AvatarFallback>
                  {user?.name?.[0]?.toUpperCase() || (
                    <User className="h-4 w-4" />
                  )}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-44" align="end" forceMount>
            <DropdownMenuItem>
              <Button
                variant="ghost"
                onClick={() => setIsProfileDialogOpen(true)}
              >
                Profile
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                variant="ghost"
                onClick={() => setIsUpdateDialogOpen(true)}
              >
                Update Profile
              </Button>
            </DropdownMenuItem>
            {user?.role === "user" && (
              <>
                <DropdownMenuItem onClick={() => navigate("#")}>
                  WishLists
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/order")}>
                  My Orders
                </DropdownMenuItem>
              </>
            )}
            {user?.role === "admin" && (
              <>
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  Dashboard
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        // If user is not logged in, show login link
        <Button variant="ghost" onClick={() => navigate("/auth/login")}>
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      )}

      {/* Profile Dialog */}
      {user && (
        <ProfileDialog
          user={user}
          isOpen={isProfileDialogOpen}
          setIsOpen={setIsProfileDialogOpen}
        />
      )}

      {/* Update Profile Dialog */}
      {user && (
        <UpdateProfileDialog
          user={user}
          isOpen={isUpdateDialogOpen}
          setIsOpen={setIsUpdateDialogOpen}
        />
      )}
    </>
  );
};

export default UserProfile;
