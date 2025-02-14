import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProfileDialogProps {
  user: {
    name: string;
    email: string;
    role: string;
    profileImg: string;
    phone: string;
    city: string;
    address: string;
  };
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ProfileDialog = ({ user, isOpen, setIsOpen }: ProfileDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex items-center gap-4">
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>
        <Card>
          <CardHeader className="flex flex-col items-center gap-4 p-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.profileImg} alt={user.name} />
              <AvatarFallback>
                {user.name?.[0]?.toUpperCase() || "U"}
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
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
