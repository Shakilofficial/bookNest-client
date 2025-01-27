import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className, ...props }: ContainerProps) => {
  return (
    <section className={cn("py-16 md:py-24", className)} {...props}>
      <div className="container px-4 md:px-6">{children}</div>
    </section>
  );
};

export default Container;
