/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateProfileMutation } from "@/redux/features/user/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FileUpload } from "../form/FileUpload";
import { Form } from "../form/Form";
import { TextInput } from "../form/TextInput";

// Zod schema for profile form validation
const profileSchema = z.object({
  name: z.string().optional(),
  phone: z.string().min(1, "Phone is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
  profileImg: z.any().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface UpdateProfileDialogProps {
  user: {
    _id: string;
    name: string;
    phone: string;
    city: string;
    address: string;
    profileImg: string;
  };
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const UpdateProfileDialog = ({
  user,
  isOpen,
  setIsOpen,
}: UpdateProfileDialogProps) => {
  const [updateProfile] = useUpdateProfileMutation();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      phone: user.phone,
      city: user.city,
      address: user.address,
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    const { profileImg, ...payload } = data;

    try {
      await updateProfile({ payload, file: profileImg?.[0] }).unwrap();
      toast.success("Profile updated successfully!");
      setIsOpen(false);
    } catch (err) {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <Form form={form} onSubmit={onSubmit}>
          <form className="space-y-4">
            <TextInput name="name" label="Name" placeholder="Enter your name" />
            <TextInput
              name="phone"
              label="Phone"
              placeholder="Enter your phone number"
            />
            <TextInput name="city" label="City" placeholder="Enter your city" />
            <TextInput
              name="address"
              label="Address"
              placeholder="Enter your address"
            />
            <FileUpload
              name="profileImg"
              label="Profile Image"
              id="profileImg"
              acceptedFileTypes={["image/jpeg", "image/png", "image/webp"]}
              maxFileSize={5000000}
              description="Max file size: 5MB"
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
