import pub1 from "@/assets/images/12354.png";
import pub2 from "@/assets/images/15011.png";
import pub from "@/assets/images/15292.png";
import pub3 from "@/assets/images/pub1.png";
import pub4 from "@/assets/images/pub2.png";
import pub5 from "@/assets/images/pub3.png";
import pub6 from "@/assets/images/pub5.png";
import pub7 from "@/assets/images/pub6.jpg";
import pub8 from "@/assets/images/pub7.png";
import { Marquee } from "../ui/marquee";
import SectionHeader from "../utils/SectionHeader";

const companies = [
  { name: "1", url: pub1 },
  { name: "2", url: pub2 },
  { name: "3", url: pub },
  { name: "4", url: pub3 },
  { name: "5", url: pub4 },
  { name: "6", url: pub5 },
  { name: "7", url: pub6 },
  { name: "8", url: pub7 },
  { name: "9", url: pub8 },
];

const Publishers = () => {
  return (
    <section id="logos">
      <div className="container mx-auto px-6 py-16 md:px-12">
        <SectionHeader
          highlight="Our Publishing Partners"
          subtitle="Collaborating with industry-leading publishers to deliver high-quality content worldwide."
        />
        <div className="relative mt-8">
          <Marquee className="max-w-full [--duration:40s]">
            {companies.map((company, idx) => (
              <img
                key={idx}
                width={160}
                height={64}
                src={company.url}
                className="h-16 w-40 opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                alt={company.name}
              />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/4 bg-gradient-to-r from-background via-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/4 bg-gradient-to-l from-background via-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Publishers;
