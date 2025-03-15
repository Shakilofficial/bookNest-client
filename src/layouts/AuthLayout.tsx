import defaultBackgroundImage from "@/assets/images/auth-bg.png";
import Logo from "@/components/shared/Logo";
import { Outlet } from "react-router-dom";

interface AuthLayoutProps {
  backgroundImage?: string;
}

const AuthLayout = ({ backgroundImage }: AuthLayoutProps) => {
  const backgroundUrl = backgroundImage || defaultBackgroundImage;

  return (
    <div className="flex min-h-screen bg-secondary text-secondary-foreground dark:bg-primary dark:text-primary-foreground">
      {/* Left Section with Background */}
      <div
        className="hidden lg:flex flex-1 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        <div className="relative z-10 flex flex-col justify-between h-full px-16 py-12">
          <div>
            <div className="flex flex-row items-center justify-center space-x-4">
              <h1 className="text-5xl font-extrabold leading-tight text-white">
                Welcome to
              </h1>
              <Logo />
            </div>
            <p className="mt-4 text-lg text-muted-foreground">
              Experience a secure, fast, and user-friendly environment designed
              to help you succeed.
            </p>
          </div>

          <footer className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} BookNest. All rights reserved.
          </footer>
        </div>
      </div>

      {/* Right Section with Outlet */}
      <div className="flex flex-col w-[380px] lg:max-w-md justify-center items-center flex-1 px-6 py-8 lg:flex-none lg:px-12 xl:px-16 bg-card text-card-foreground shadow-md">
        <div className="space-y-8">
          <Logo className=" flex justify-center items-center" />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
