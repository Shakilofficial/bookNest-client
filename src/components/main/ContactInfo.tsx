import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";

const ContactInfo = () => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-card to-muted/50">
      <CardHeader>
        <CardTitle className="text-2xl">Contact Information</CardTitle>
        <CardDescription>
          You can also reach us through the following channels:
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium">Address</h3>
            <p className="text-muted-foreground">
              Delduar,Tangail,Dhaka, Bangladesh
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium">Phone</h3>
            <p className="text-muted-foreground">+880 1711-123456</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium">Email</h3>
            <p className="text-muted-foreground">support@booknestbd.com</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium">Live Chat</h3>
            <p className="text-muted-foreground">
              Available from 9:00 AM to 10:00 PM
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              Start Chat
            </Button>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium">Opening Hours</h3>
            <ul className="text-muted-foreground space-y-1 mt-1">
              <li className="flex justify-between">
                <span>Saturday - Thursday:</span>
                <span>9:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Friday:</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <h3 className="font-medium mb-2">Need Urgent Assistance?</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Our customer service team is available 24/7 for urgent inquiries.
          </p>
          <Button variant="secondary" className="w-full">
            <Phone className="mr-2 h-4 w-4" /> Call Hotline
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInfo;
