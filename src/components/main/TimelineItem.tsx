import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  position: "left" | "right";
  icon?: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
  dotColor?: string;
  isLast?: boolean;
}

const TimelineItem = ({
  year,
  title,
  description,
  position,
  icon,
  iconBg = "bg-primary-50",
  iconColor = "text-primary-600",
  dotColor = "from-primary-400 to-primary-600",
  isLast,
}: TimelineItemProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20, x: position === "left" ? -20 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 0.1,
        type: "spring",
        stiffness: 200,
      },
    },
  };

  const lineVariants = {
    hidden: { height: 0 },
    visible: {
      height: "100%",
      transition: {
        duration: 0.6,
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative"
    >
      {/* Desktop layout */}
      <div
        className={cn(
          "hidden md:grid md:grid-cols-[1fr,auto,1fr] items-center"
        )}
      >
        {/* Left side content */}
        <div className={cn("pr-10", position === "left" ? "block" : "hidden")}>
          {position === "left" && (
            <motion.div
              variants={cardVariants}
              className="ml-auto w-[90%] bg-card rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={cn("p-2 rounded-lg", iconBg)}>
                  <div className={iconColor}>{icon}</div>
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
              </div>
              <p className="text-muted-foreground">{description}</p>
            </motion.div>
          )}
        </div>

        {/* Center timeline marker */}
        <motion.div
          variants={dotVariants}
          className="flex flex-col items-center z-10 mx-4"
        >
          <div
            className={cn(
              "w-12 h-12 rounded-full border-4 border-background dark:border-background bg-gradient-to-br shadow-md flex items-center justify-center",
              dotColor
            )}
          >
            <span className="text-xs font-bold text-white">{year}</span>
          </div>
        </motion.div>

        {/* Right side content */}
        <div className={cn("pl-10", position === "right" ? "block" : "hidden")}>
          {position === "right" && (
            <motion.div
              variants={cardVariants}
              className="mr-auto w-[90%] bg-card rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={cn("p-2 rounded-lg", iconBg)}>
                  <div className={iconColor}>{icon}</div>
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
              </div>
              <p className="text-muted-foreground">{description}</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile view */}
      <div className="flex md:hidden">
        <div className="relative">
          <motion.div
            variants={dotVariants}
            className={cn(
              "absolute left-4 sm:left-8 w-8 h-8 rounded-full border-4 border-background dark:border-background bg-gradient-to-br flex items-center justify-center z-10",
              dotColor
            )}
          >
            <span className="text-xs font-bold text-white">{year}</span>
          </motion.div>
          {!isLast && (
            <motion.div
              variants={lineVariants}
              className="absolute left-4 sm:left-8 top-8 h-[calc(100%-2rem)] w-0.5 bg-slate-200 dark:bg-slate-700 transform translate-x-[0.34rem] sm:translate-x-[0.34rem]"
            ></motion.div>
          )}
        </div>
        <motion.div
          variants={cardVariants}
          className="ml-12 sm:ml-16 w-[calc(100%-3rem)] sm:w-[calc(100%-4rem)] bg-card rounded-xl p-5 shadow-md border border-border"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className={cn("p-1.5 rounded-lg", iconBg)}>
              <div className={iconColor}>{icon}</div>
            </div>
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
          <p className="text-muted-foreground text-sm">{description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
