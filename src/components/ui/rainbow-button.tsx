import { cn } from "@/lib/utils";
import React from "react";

interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const RainbowButton = React.forwardRef<
  HTMLButtonElement,
  RainbowButtonProps
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative inline-flex h-11 animate-rainbow cursor-pointer items-center justify-center rounded-xl border-0 px-8 py-2 font-medium text-primary-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        // before styles
        "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(75,100%,50%),hsl(90,80%,55%),hsl(330,80%,60%),hsl(150,70%,55%),hsl(120,80%,60%))] before:[filter:blur(calc(0.8*1rem))]",
        // light mode colors (more visible gradient)
        "bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.8)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(75,100%,55%),hsl(90,80%,60%),hsl(330,80%,65%),hsl(150,70%,60%),hsl(120,80%,65%))]",
        // dark mode colors (subtle gradient)
        "dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(75,100%,45%),hsl(90,80%,50%),hsl(330,80%,55%),hsl(150,70%,50%),hsl(120,80%,55%))]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

RainbowButton.displayName = "RainbowButton";
