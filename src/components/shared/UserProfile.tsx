/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { logout } from "@/redux/features/auth/authSlice";
import {
  useGetUserQuery,
  useUpdateProfileMutation,
} from "@/redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
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
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const handleLoginRedirect = (navigate: any, data: any) => {
  if (!data) {
    navigate("/auth/login");
  }
};

const profileSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  profileImg: z.any().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const UserProfile = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { token } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data, isLoading, isFetching, error } = useGetUserQuery(
    token ? { token } : null
  );
  const user = data?.data;

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      city: user?.city || "",
      address: user?.address || "",
    },
  });

  const onSubmit = async (formData: ProfileFormValues) => {
    const { profileImg, ...payload } = formData;

    const dataToSend = {
      payload,
      file: profileImg[0],
    };

    try {
      await updateProfile(dataToSend).unwrap();
      toast.success("Profile updated successfully!");
      setIsDialogOpen(false);
    } catch (err) {
      toast.error("Failed to update profile.");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  if (isLoading || isFetching) {
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
      {!user ? (
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
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
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

          <DropdownMenuContent className="w-44" align="end" forceMount>
            <DropdownMenuItem>
              <DialogTrigger asChild>
                <Button variant="ghost">Profile</Button>
              </DialogTrigger>
            </DropdownMenuItem>
            {user.role === "user" && (
              <>
                <DropdownMenuItem onClick={() => navigate("#")}>
                  WishLists
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/order")}>
                  My Orders
                </DropdownMenuItem>
              </>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Update Profile</Button>
              </DialogTrigger>
              <DialogContent className="w-[500px]">
                <DialogHeader>
                  <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Card className="rounded-lg">
                    <CardHeader className="flex items-center gap-4 p-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src={
                            user?.profileImg ||
                            "https://via.placeholder.com/150"
                          }
                        />
                        <AvatarFallback>
                          {user?.name?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Label htmlFor="profileImg">Profile Image</Label>
                        <Input
                          type="file"
                          id="profileImg"
                          {...register("profileImg")}
                        />
                        {errors.profileImg && (
                          <p className="text-red-500">
                            {errors.profileImg.message as string}
                          </p>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 p-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          {...register("name")}
                          placeholder="Your name"
                        />
                        {errors.name && (
                          <p className="text-red-500">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          {...register("phone")}
                          placeholder="Your phone number"
                        />
                        {errors.phone && (
                          <p className="text-red-500">{errors.phone.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          {...register("city")}
                          placeholder="Your city"
                        />
                        {errors.city && (
                          <p className="text-red-500">{errors.city.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          {...register("address")}
                          placeholder="Your address"
                        />
                        {errors.address && (
                          <p className="text-red-500">
                            {errors.address.message}
                          </p>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        type="submit"
                        disabled={isUpdating}
                        variant="default"
                      >
                        {isUpdating ? "Updating..." : "Update"}
                      </Button>
                    </CardFooter>
                  </Card>
                </form>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfile;
