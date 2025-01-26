import { cn } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  Cog,
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/dashboard/users", icon: Users },
  { label: "Products", href: "/dashboard/products", icon: ShoppingBag },
  { label: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { label: "Settings", href: "/dashboard/settings", icon: Cog },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex h-full flex-col border-r bg-background">
      <ScrollArea className="flex-grow">
        <div className="flex flex-col gap-2 p-4">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Button
                key={item.href}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-sm transition-colors",
                  isActive
                    ? "bg-muted text-primary font-semibold hover:bg-muted/80"
                    : "text-muted-foreground hover:bg-accent"
                )}
                asChild
              >
                <Link to={item.href}>
                  <item.icon
                    className={cn(
                      "mr-2 h-4 w-4",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
