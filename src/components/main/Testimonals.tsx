import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Marquee } from "../ui/marquee";
import SectionHeader from "../utils/SectionHeader";

export function Highlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "bg-[#abfccd51] p-1 py-0.5 font-bold text-[#46ef4c] dark:bg-[#abfcb068] dark:text-[#46ef51]",
        className
      )}
    >
      {children}
    </span>
  );
}

export interface TestimonialCardProps {
  name: string;
  role: string;
  img?: string;
  description: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export function TestimonialCard({
  description,
  name,
  img,
  role,
  className,
  ...props // Capture the rest of the props
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4",
        // light styles
        " border border-neutral-200 bg-white",
        // dark styles
        "dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        className
      )}
      {...props}
    >
      <div className="select-none text-sm font-normal text-neutral-700 dark:text-neutral-400">
        {description}
        <div className="flex flex-row py-1">
          <Star className="size-4 fill-yellow-500 text-yellow-500" />
          <Star className="size-4 fill-yellow-500 text-yellow-500" />
          <Star className="size-4 fill-yellow-500 text-yellow-500" />
          <Star className="size-4 fill-yellow-500 text-yellow-500" />
          <Star className="size-4 fill-yellow-500 text-yellow-500" />
        </div>
      </div>

      <div className="flex w-full select-none items-center justify-start gap-5">
        <img
          width={40}
          height={40}
          src={img || ""}
          alt={name}
          className="size-10 rounded-full ring-1 ring-border ring-offset-4"
        />

        <div>
          <p className="font-medium text-neutral-500">{name}</p>
          <p className="text-xs font-normal text-neutral-400">{role}</p>
        </div>
      </div>
    </div>
  );
}
const testimonials = [
  {
    name: "Alex Rivera",
    role: "UI/UX Lead at InnovateTech",
    img: "https://randomuser.me/api/portraits/men/91.jpg",
    description: (
      <p>
        Using BookShop has revolutionized our shopping experience.
        <Highlight>
          Its intuitive interface and seamless checkout process make it easy to
          shop for books.
        </Highlight>{" "}
        A must-have for any book lover.
      </p>
    ),
  },
  {
    name: "Samantha Lee",
    role: "Frontend Engineer at NextGen Solutions",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
    description: (
      <p>
        BookShop&apos;s personalized book recommendations have drastically
        improved our reading habits.
        <Highlight>
          I&apos;ve discovered so many great books that I wouldn&apos;t have
          found elsewhere.
        </Highlight>{" "}
        Highly recommend it to fellow book enthusiasts.
      </p>
    ),
  },
  {
    name: "Raj Patel",
    role: "Founder at Startup Studio",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
    description: (
      <p>
        As a startup founder, I need a quick and reliable way to buy books for
        my team. BookShop&apos;s fast shipping and wide selection have made it
        an essential part of our workflow.
        <Highlight>My team loves the variety of genres available.</Highlight>
      </p>
    ),
  },
  {
    name: "Emily Chen",
    role: "Product Designer at Global Systems",
    img: "https://randomuser.me/api/portraits/women/83.jpg",
    description: (
      <p>
        BookShop&apos;s easy-to-use search and filter options have made it so
        simple to find books.
        <Highlight>
          Whether it&apos;s fiction, non-fiction, or design books, it&apos;s
          perfect for any book shopper.
        </Highlight>{" "}
        A must-have for any book enthusiast.
      </p>
    ),
  },
  {
    name: "Michael Brown",
    role: "Creative Director at FinTech Innovations",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
    description: (
      <p>
        BookShop&apos;s digital bookshelf has elevated how we share and
        recommend books within our community.
        <Highlight>
          The ease of gifting books to colleagues has been a game-changer for
          us.
        </Highlight>{" "}
        It&apos;s a fantastic platform for avid readers.
      </p>
    ),
  },
  {
    name: "Linda Wu",
    role: "Web Developer at LogiChain Solutions",
    img: "https://randomuser.me/api/portraits/women/5.jpg",
    description: (
      <p>
        BookShop&apos;s online store has simplified my book shopping experience.
        <Highlight>
          The discounts and deals available have made it easy to build my
          reading collection.
        </Highlight>{" "}
      </p>
    ),
  },
  {
    name: "Carlos Gomez",
    role: "Digital Marketing Specialist at EcoTech",
    img: "https://randomuser.me/api/portraits/men/14.jpg",
    description: (
      <p>
        BookShop&apos;s responsive website has helped us find the best marketing
        books.
        <Highlight>
          It&apos;s revolutionized how we stay updated with the latest industry
          trends.
        </Highlight>{" "}
      </p>
    ),
  },
  {
    name: "Aisha Khan",
    role: "E-commerce Product Manager at FashionForward",
    img: "https://randomuser.me/api/portraits/women/56.jpg",
    description: (
      <p>
        BookShop&apos;s curated book lists have transformed our learning
        journey.
        <Highlight>
          Customers love the well-organized collection of books available.
        </Highlight>{" "}
      </p>
    ),
  },
  {
    name: "Tom Chen",
    role: "Healthcare App Designer at HealthTech Solutions",
    img: "https://randomuser.me/api/portraits/men/18.jpg",
    description: (
      <p>
        BookShop has made it easy for us to find books focused on healthcare and
        wellness.
        <Highlight>
          It&apos;s an essential tool for our professional development.
        </Highlight>{" "}
      </p>
    ),
  },
  {
    name: "Sofia Patel",
    role: "EdTech Founder at EduSafe Innovations",
    img: "https://randomuser.me/api/portraits/women/73.jpg",
    description: (
      <p>
        BookShop&apos;s educational resources and books have doubled our
        platform&apos;s learning engagement.
        <Highlight>
          It&apos;s tailor-made for educators and students alike.
        </Highlight>{" "}
      </p>
    ),
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="container py-10">
      <SectionHeader
        highlight="What People Are Saying"
        subtitle="Don't just take our word for it - here's what real people are saying about BookNest"
      />
      <div className="relative mt-6 max-h-screen overflow-hidden">
        <div className="gap-4 md:columns-2 xl:columns-3 2xl:columns-4">
          {Array(Math.ceil(testimonials.length / 3))
            .fill(0)
            .map((_, i) => (
              <Marquee
                vertical
                key={i}
                className={cn({
                  "[--duration:60s]": i === 1,
                  "[--duration:30s]": i === 2,
                  "[--duration:70s]": i === 3,
                })}
              >
                {testimonials.slice(i * 3, (i + 1) * 3).map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: Math.random() * 0.8,
                      duration: 1.2,
                    }}
                  >
                    <TestimonialCard {...card} />
                  </motion.div>
                ))}
              </Marquee>
            ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-background from-20%"></div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-background from-20%"></div>
      </div>
    </section>
  );
}
