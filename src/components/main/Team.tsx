import { Linkedin, Twitter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

interface TeamProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    twitter?: string;
    linkedin?: string;
  };
}

const Team = ({ name, role, bio, image, social }: TeamProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-emerald-500 font-medium">{role}</p>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-muted-foreground text-sm">{bio}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        {social.twitter && (
          <Button variant="outline" size="icon" asChild>
            <Link to={social.twitter} target="_blank" rel="noopener noreferrer">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Link>
          </Button>
        )}
        {social.linkedin && (
          <Button variant="outline" size="icon" asChild>
            <Link
              to={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Team;
