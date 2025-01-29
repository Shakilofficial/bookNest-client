import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description: string;
  trend: "up" | "down";
}

const DashboardCard = ({
  title,
  value,
  icon,
  description,
  trend,
}: DashboardCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div
          className={`rounded-full p-3 ${
            trend === "up"
              ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
              : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
          }`}
        >
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center mt-2">
          <span
            className={`mr-1 text-lg ${
              trend === "up"
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {trend === "up" ? "↑" : "↓"}
          </span>
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
