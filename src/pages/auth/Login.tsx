/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "@/components/form/Form";
import { PasswordInput } from "@/components/form/PasswordInput";
import { TextInput } from "@/components/form/TextInput";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { verifyToken } from "@/utils/verifyToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Define form values type based on the schema
type FormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login] = useLoginMutation();

  const onSubmit = async (data: FormValues) => {
    const toastId = toast.loading("Logging in...");
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (response?.data?.token) {
        const user = verifyToken(response.data.token);
        if (user) {
          dispatch(setUser({ user, token: response.data.token }));
          toast.success("Logged in successfully", { id: toastId });

          // Navigate based on role
          if (user?.role === "admin") {
            navigate("/dashboard"); // Admins go to dashboard
          } else if (user?.role === "user") {
            navigate("/"); // Users go to home
          } else {
            navigate("/");
          }
        } else {
          toast.error("Invalid credentials", { id: toastId });
        }
      } else {
        toast.error("Invalid credentials", { id: toastId });
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Invalid credentials";
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl md:text-3xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

      {/* Form */}
      <Form form={form} onSubmit={onSubmit}>
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

      {/* Additional Links */}
      <div className="text-center space-y-2">
        <Link
          to="/auth/forget-password"
          className="text-sm text-muted-foreground hover:underline"
        >
          Forgot your password?
        </Link>
        <div className="text-sm">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-primary hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
