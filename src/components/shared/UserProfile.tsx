/* eslint-disable @typescript-eslint/no-explicit-any */
import { logout } from "@/redux/features/auth/authSlice";
import { useGetUserQuery } from "@/redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AvatarSkeleton from "../skeleton/AvatarSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const handleLoginRedirect = (navigate: any, data: any) => {
  if (!data) {
    navigate("/auth/login");
  }
};

const UserProfile = () => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetUserQuery(token ? { token } : null);
  const user = data?.data;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  if (isLoading) {
    return <AvatarSkeleton />;
  }

  if (error) {
    console.error("Failed to fetch user data:", error);
    return (
      <Button
        variant="ghost"
        className="relative h-8 w-8 rounded-full"
        onClick={() => handleLoginRedirect(navigate, data)}
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
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-8 w-8 rounded-full"
            onClick={
              !user ? () => handleLoginRedirect(navigate, data) : undefined
            }
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
            <DropdownMenuItem>
              <DialogTrigger asChild>
                <Button variant="ghost">Profile</Button>
              </DialogTrigger>
            </DropdownMenuItem>
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
      <DialogContent className="w-[400px] p-6 space-y-6 rounded-lg shadow-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-semibold">
            User Profile
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="sr-only">
          This is the user profile dialog containing user details and profile
          options.
        </DialogDescription>
        <Card className="rounded-lg border overflow-hidden">
          <CardHeader className="flex flex-col items-center gap-4 p-6">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={user.profileImg || "https://via.placeholder.com/150"}
                alt={user.name}
              />
              <AvatarFallback>
                {user.name?.[0]?.toUpperCase() || <User className="h-6 w-6" />}
              </AvatarFallback>
            </Avatar>

            <div className="text-center">
              <p className="text-lg font-medium">{user.name}</p>
              <Badge className="text-sm">{user.role}</Badge>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-3">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone || "Not provided"}
            </p>
            <p>
              <strong>City:</strong> {user.city || "Not provided"}
            </p>
            <p>
              <strong>Address:</strong> {user.address || "Not provided"}
            </p>
          </CardContent>

          <CardFooter className="p-4">
            <Button variant="outline" className="w-full">
              Edit Profile
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfile;
