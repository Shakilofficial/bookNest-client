import fourOfour from "@/assets/images/404.svg";
import fiveHundred from "@/assets/images/500.svg";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(error);
  }, [error]);

  let errorMessage = "An unexpected error occurred";
  let errorCode = "500";

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data?.message || errorMessage;
    errorCode = error.status.toString();
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  const isNotFound = errorCode === "404";

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full shadow-lg rounded-lg overflow-hidden"
      >
        <div className="p-6 sm:p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-48 h-48 mx-auto mb-6"
          >
            {isNotFound ? (
              <img src={fourOfour} alt="404 Error" className="w-full h-full" />
            ) : (
              <img
                src={fiveHundred}
                alt="500 Error"
                className="w-full h-full"
              />
            )}
          </motion.div>
          <h1 className="text-4xl font-bold text-center mb-2">
            Oops!
          </h1>
          <p className="text-xl text-center mb-6">
            {isNotFound ? "We can't find that page" : errorMessage}
          </p>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => navigate("/")} variant="default">
              Go Home
            </Button>
            {!isNotFound && (
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Try Again
              </Button>
            )}
          </div>
        </div>
        <div className="px-6 py-4">
          <p className="text-center">
            Error Code: <span className="font-semibold">{errorCode}</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
