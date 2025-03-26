import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ValueCardProps {
  icon: string;
  title: string;
  description: string;
}

const ValueCard = ({ icon, title, description }: ValueCardProps) => {
  return (
    <Card className="text-center transition-all hover:shadow-md hover:border-emerald-500/50">
      <CardHeader>
        <div className="mx-auto text-4xl mb-2">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ValueCard;
