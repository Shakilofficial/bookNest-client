import { cn } from "@/lib/utils";
import { XCircle } from "lucide-react";
import { Button } from "../ui/button";

interface ErrorProps {
  title?: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const Error = ({
  title = "Something went wrong",
  message = "An error occurred while processing your request.",
  action,
  className,
  ...props
}: ErrorProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 text-center",
        className
      )}
      {...props}
    >
      <div className="rounded-full bg-destructive/10 p-3 text-destructive">
        <XCircle className="h-6 w-6" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      {action && (
        <Button onClick={action.onClick} variant="outline">
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default Error;
