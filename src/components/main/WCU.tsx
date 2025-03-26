import bg1 from "@/assets/images/b1.jpg";
import bg2 from "@/assets/images/b2.jpg";
import bg3 from "@/assets/images/b3.jpg";
import Container from "../utils/Container";
import SectionHeader from "../utils/SectionHeader";

const items = [
  {
    id: "1",
    url: bg1,
    title: "Vast Collection",
    description:
      "Explore a diverse range of genres and authors. Our extensive collection has something for everyone.",
    tags: ["Books", "Genres", "Adventure", "Knowledge", "Inspiration"],
  },

  {
    id: "2",
    url: bg2,
    title: "Fast Delivery",
    description:
      "Receive your books in no time with our fast shipping. We're always on the go.",
    tags: ["Speed", "Convenience", "Quick", "Reliable", "Delivery"],
  },

  {
    id: "3",
    url: bg3,
    title: "24/7 Support",
    description:
      "Our support team is available to assist you anytime. We're here to help.",
    tags: ["Support", "Customer Care", "Help", "Service", "Assistance"],
  },
];

const WCU = () => {
  return (
    <Container>
      <SectionHeader
        highlight="Why Choose Us?"
        subtitle="Discover our unique features"
      />
      <div className="group flex max-md:flex-col justify-center gap-2 w-[80%] mx-auto mb-10 mt-3 text-white">
        {items.map((item) => (
          <article
            key={item.id}
            className="group/article relative w-full rounded-xl overflow-hidden md:group-hover:[&:not(:hover)]:w-[20%] md:group-focus-within:[&:not(:focus-within):not(:hover)]:w-[20%] transition-all ease-\[cubic-bezier\(.5,.85,.25,1.15\)\] duration-300 before:absolute before:inset-x-0 before:bottom-0 before:h-1/3 before:bg-gradient-to-t before:from-black/50 before:transition-opacity md:before:opacity-0 md:hover:before:opacity-100 focus-within:before:opacity-100 after:opacity-0 md:group-hover:[&:not(:hover)]:after:opacity-100 md:group-focus-within:[&:not(:focus-within):not(:hover)]:after:opacity-100 after:absolute after:inset-0 after:bg-white/30 after:backdrop-blur after:rounded-lg after:transition-all focus-within:ring focus-within:ring-indigo-300"
          >
            <a
              className="absolute inset-0 z-10 p-3 flex flex-col justify-end"
              href="#0"
            >
              <h1 className="text-xl md:text-2xl lg:text-4xl font-medium md:whitespace-nowrap md:truncate md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition ease-\[cubic-bezier\(.5,.85,.25,1.15\)\] duration-300 group-hover/article:delay-300 group-focus-within/article:delay-300">
                {item?.title}
              </h1>
              <span className="text-sm md:text-lg lg:text-2xl font-medium md:whitespace-nowrap md:truncate md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition ease-\[cubic-bezier\(.5,.85,.25,1.15\)\] duration-300 group-hover/article:delay-500 group-focus-within/article:delay-500">
                {item?.description}
              </span>
            </a>
            <img
              className="object-cover h-72 md:h-[420px] w-full"
              src={item?.url}
              width="960"
              height="480"
              alt={item?.title}
            />
          </article>
        ))}
      </div>
    </Container>
  );
};

export default WCU;
