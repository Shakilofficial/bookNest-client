import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface ArticleCardProps {
  title: string;
  source: string;
  date: string;
  excerpt: string;
  link: string;
  image: string;
}

const ArticleCard = ({
  title,
  source,
  date,
  excerpt,
  link,
  image,
}: ArticleCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg rounded-lg flex flex-col">
      {/* Image Section */}
      <div className="relative w-full h-[200px] bg-gray-100">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover rounded-t-lg transition-transform hover:scale-105"
        />
      </div>

      {/* Card Header */}
      <CardHeader className="pb-3 flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground font-medium">
              {source}
            </p>
            <p className="text-xs text-muted-foreground/70">{date}</p>
          </div>
        </div>
        <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="pb-3">
        <p className="text-muted-foreground text-sm line-clamp-3">{excerpt}</p>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="mt-auto">
        <Button variant="outline" className="w-full" asChild>
          <Link to={link} target="_blank" rel="noopener noreferrer">
            Read Article <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
