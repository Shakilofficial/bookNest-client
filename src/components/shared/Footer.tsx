import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { Link } from "react-router-dom"; // Use Link from react-router-dom
import Logo from "./Logo";

const Footer = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const FooterSection = ({
    title,
    children,
    id,
  }: {
    title: string;
    children: React.ReactNode;
    id: string;
  }) => (
    <div className="mb-6 md:mb-0">
      <h3
        className="text-lg font-semibold mb-4 flex text-primary justify-between items-center cursor-pointer md:cursor-default"
        onClick={() => toggleSection(id)}
      >
        {title}
        <span className="md:hidden">
          {expandedSection === id ? (
            <MdExpandLess size={24} />
          ) : (
            <MdExpandMore size={24} />
          )}
        </span>
      </h3>
      <div
        className={`space-y-2 ${
          expandedSection === id || window.innerWidth >= 768
            ? "block"
            : "hidden"
        } md:block`}
      >
        {children}
      </div>
    </div>
  );
  return (
    <footer className="bg-background text-foreground">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Logo and Social Media Links */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <Logo className="h-8 w-auto mb-4" />
            <p className="text-muted-foreground mb-6">
              BookNest is a one-stop shop for all things books. Quality
              products, exceptional service.
            </p>
            <div className="flex space-x-4 mb-6">
              {[
                { Icon: FaFacebookF, label: "Facebook", href: "#" },
                { Icon: FaTwitter, label: "Twitter", href: "#" },
                { Icon: FaInstagram, label: "Instagram", href: "#" },
                { Icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
                { Icon: FaYoutube, label: "YouTube", href: "#" },
              ].map(({ Icon, label, href }) => (
                <Link
                  key={label}
                  to={href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <FooterSection title="Quick Links" id="quickLinks">
            {["Home", "Products", "About Us", "Contact"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(" ", "-")}`} // Use 'to' for React Router
                className="pl-2 block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </FooterSection>

          {/* Customer Service Section */}
          <FooterSection title="Customer Service" id="customerService">
            {["FAQ", "Shipping", "Returns", "Order Tracking"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(" ", "-")}`} // Use 'to' for React Router
                className="pl-2 block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </FooterSection>

          {/* Newsletter Section */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Newsletter
            </h3>
            <p className="text-muted-foreground mb-4">
              Subscribe for exclusive offers and updates.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscribed!");
              }}
              className="flex flex-col space-y-2"
            >
              <Input
                type="email"
                placeholder="Your email address"
                required
                className="bg-background"
              />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-8" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} ShopName. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              to="/privacy-policy"
              className="hover:text-primary transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="hover:text-primary transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
