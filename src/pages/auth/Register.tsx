/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "@/components/form/Form";
import { PasswordInput } from "@/components/form/PasswordInput";
import { TextInput } from "@/components/form/TextInput";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, User } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    const toastId = toast.loading("Registering...");
    try {
      await register(data).unwrap();
      toast.success("Registration successful", { id: toastId });
      navigate("/auth/login");
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Registration failed";
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl md:text-3xl font-bold">Create an account</h1>
        <p className="text-muted-foreground">
          Enter your details to create your account
        </p>
      </div>
      <Form form={form} onSubmit={onSubmit}>
        <TextInput
          name="name"
          label="Name"
          icon={User}
          placeholder="John Doe"
        />
        <TextInput
          name="email"
          label="Email"
          icon={Mail}
          placeholder="john@example.com"
          type="email"
        />
        <PasswordInput
          name="password"
          label="Password"
          icon={Lock}
          placeholder="Enter your password"
        />
      </Form>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-primary hover:underline">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Register;
