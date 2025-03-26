import ArticleCard from "@/components/main/ArticleCard";
import Team from "@/components/main/Team";
import Timeline from "@/components/main/Timeline";
import TimelineItem from "@/components/main/TimelineItem";
import ValueCard from "@/components/main/ValueCard";
import { BookOpen, Building, Globe, Leaf, Users } from "lucide-react";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Shakil Hossain",
      role: "Founder & CEO",
      bio: "A passionate bibliophile with over 10 years of experience in publishing. Established BookNest to ensure quality books are accessible to readers across Bangladesh.",
      image:
        "https://res.cloudinary.com/dcyupktj6/image/upload/v1728503901/avatars/zelpsdb5rzpgrobkycwc.jpg",
      social: {
        twitter: "https://twitter.com/shakilhossain",
        linkedin: "https://linkedin.com/in/shakilhossain",
      },
    },
    {
      name: "Farhan Ahmed",
      role: "CTO",
      bio: "Technology enthusiast dedicated to revolutionizing the way Bangladesh connects with literature through innovative platforms.",
      image:
        "https://res.cloudinary.com/dcyupktj6/image/upload/v1728504372/avatars/phegoiq4usoonqrx4gfs.jpg",
      social: {
        twitter: "https://twitter.com/farhanahmed",
        linkedin: "https://linkedin.com/in/farhanahmed",
      },
    },
    {
      name: "Nusrat Jahan",
      role: "Head of Curation",
      bio: "Former academic librarian with a deep love for Bangla literature and a mission to bring diverse book collections to all readers.",
      image:
        "https://res.cloudinary.com/dcyupktj6/image/upload/v1741424924/xeb1j8kuowh-1741424923228-profileImage-fe-avatar.jpg",
      social: {
        twitter: "https://twitter.com/nusratjahan",
        linkedin: "https://linkedin.com/in/nusratjahan",
      },
    },
    {
      name: "Tanvir Rahman",
      role: "Operations Director",
      bio: "An operations expert committed to ensuring books are delivered efficiently and sustainably to every corner of Bangladesh.",
      image:
        "https://res.cloudinary.com/dcyupktj6/image/upload/v1728502285/avatars/slol5llrclurjsaivzum.png",
      social: {
        twitter: "https://twitter.com/tanvirrahman",
        linkedin: "https://linkedin.com/in/tanvirrahman",
      },
    },
  ];

  const articles = [
    {
      title: "BookNest Revolutionizes Online Book Shopping",
      source: "Tech Today",
      date: "March 15, 2023",
      excerpt:
        "How this startup is changing the way we discover and purchase books online.",
      link: "#",
      image:
        "https://www.publishcentral.com.au/wp-content/uploads/2023/06/Self-published-book-scaled.jpg",
    },
    {
      title: "Sustainable Practices in E-commerce: BookNest Case Study",
      source: "Green Business Monthly",
      date: "June 22, 2023",
      excerpt:
        "BookNest's eco-friendly packaging initiatives set new standards in the industry.",
      link: "#",
      image:
        "https://www.enago.com/academy/wp-content/uploads/2019/10/books-bookshelf-education-159621-1.jpg",
    },
    {
      title: "From Startup to Success: BookNest's Journey",
      source: "Entrepreneur Magazine",
      date: "September 5, 2023",
      excerpt:
        "The inspiring story behind one of the fastest-growing book retailers.",
      link: "#",
      image:
        "https://wondermark.com/wp-content/uploads/2011/12/poetswriters-400x294.jpg",
    },
  ];

  return (
    <div className="bg-background min-h-screen space-y-12 mb-16">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md z-10" />

        {/* Background Image with blur effect */}
        <img
          src="https://www.publishcentral.com.au/wp-content/uploads/2023/06/Self-published-book-scaled.jpg"
          alt="BookNest bookshop"
          className="absolute inset-0 w-full h-full object-cover blur-sm opacity-60"
        />

        {/* Text Content */}
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-emerald-400">BookNest</span> 📖
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
            Bringing the joy of books to everyone, everywhere.
          </p>
        </div>
      </section>

      {/* Our Story & Timeline */}
      <section className="py-24 container mx-auto px-4 overflow-hidden">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="inline-block px-4 py-1.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-medium mb-4">
            Our Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Our Story
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            BookNest began with a simple idea: make quality books accessible to
            all. What started as a small online bookstore has grown into a
            community of book lovers united by our passion for reading and
            sharing stories.
          </p>
        </div>

        <Timeline>
          <TimelineItem
            year="2020"
            title="BookNest Founded"
            description="Started in Emma's garage with just 200 books and a dream to create the most accessible bookstore in the world."
            position="right"
            icon={<BookOpen className="w-5 h-5" />}
            iconBg="bg-blue-100 dark:bg-blue-950/40"
            iconColor="text-blue-600 dark:text-blue-400"
            dotColor="from-blue-400 to-blue-600"
          />
          <TimelineItem
            year="2021"
            title="First Office"
            description="Moved to our first official headquarters and expanded to 10 team members, establishing our core operations."
            position="left"
            icon={<Building className="w-5 h-5" />}
            iconBg="bg-purple-100 dark:bg-purple-950/40"
            iconColor="text-purple-600 dark:text-purple-400"
            dotColor="from-purple-400 to-purple-600"
          />
          <TimelineItem
            year="2022"
            title="100K Users Milestone"
            description="Celebrated our growing community of book enthusiasts reaching 100,000 active members across the platform."
            position="right"
            icon={<Users className="w-5 h-5" />}
            iconBg="bg-amber-100 dark:bg-amber-950/40"
            iconColor="text-amber-600 dark:text-amber-400"
            dotColor="from-amber-400 to-amber-600"
          />
          <TimelineItem
            year="2023"
            title="Sustainability Initiative"
            description="Launched our eco-friendly packaging and book donation program, contributing to environmental conservation efforts."
            position="left"
            icon={<Leaf className="w-5 h-5" />}
            iconBg="bg-emerald-100 dark:bg-emerald-950/40"
            iconColor="text-emerald-600 dark:text-emerald-400"
            dotColor="from-emerald-400 to-emerald-600"
          />
          <TimelineItem
            year="2024"
            title="Global Expansion"
            description="Began shipping to 50+ countries, bringing books to readers worldwide and establishing international partnerships."
            position="right"
            icon={<Globe className="w-5 h-5" />}
            iconBg="bg-rose-100 dark:bg-rose-950/40"
            iconColor="text-rose-600 dark:text-rose-400"
            dotColor="from-rose-400 to-rose-600"
          />
        </Timeline>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground text-lg">
              At BookNest, our values guide everything we do. From curating
              quality books to ensuring sustainable practices, we're committed
              to making a positive impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ValueCard
              icon="📚"
              title="Quality Selection"
              description="We carefully curate our collection to offer the best books across all genres."
            />
            <ValueCard
              icon="🌱"
              title="Sustainability"
              description="Eco-friendly packaging and carbon-neutral shipping options."
            />
            <ValueCard
              icon="💰"
              title="Fair Pricing"
              description="Making great literature accessible with competitive pricing and regular promotions."
            />
            <ValueCard
              icon="❤️"
              title="Community"
              description="Building connections between readers and supporting literacy programs."
            />
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground text-lg">
            The passionate people behind BookNest who work tirelessly to connect
            readers with their next favorite book.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <Team
              key={member.name}
              name={member.name}
              role={member.role}
              bio={member.bio}
              image={member.image}
              social={member.social}
            />
          ))}
        </div>
      </section>

      {/* BookNest in the Media */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">BookNest in the Media</h2>
            <p className="text-muted-foreground text-lg">
              See what publications are saying about our mission and impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard
                key={article.title}
                title={article.title}
                source={article.source}
                date={article.date}
                excerpt={article.excerpt}
                link={article.link}
                image={article.image}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
