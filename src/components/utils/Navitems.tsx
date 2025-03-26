import { cn } from "@/lib/utils";
import { BookOpenIcon, Home, Info, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavItemsProps {
  className?: string;
}

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "All Books", path: "/all-products", icon: BookOpenIcon },
  { label: "About Us", path: "/about-us", icon: Info },
  { label: "Contact", path: "/contact", icon: Mail },
];

const NavItems = ({ className }: NavItemsProps) => {
  const { pathname } = useLocation();

  return (
    <nav className={cn("flex items-center space-x-1 lg:space-x-2", className)}>
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.path}
          className={cn(
            "flex items-center font-lg px-3 py-2 font-medium transition-colors",
            pathname === item.path
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <item.icon className="w-4 h-4 mr-2" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
