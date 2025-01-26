import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo />
          <p className="text-center text-sm leading-loose md:text-left">
            Experience a secure, fast, and user-friendly environment designed to
            help you succeed.
          </p>
        </div>
        <p className="text-center text-sm md:text-left">
          © {new Date().getFullYear()} BookNest. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
