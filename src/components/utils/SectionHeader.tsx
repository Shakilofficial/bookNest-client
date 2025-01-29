import { cn } from "@/lib/utils";
import { AuroraText } from "../ui/aurora-text";

interface SectionHeaderProps {
  highlight: string;
  subtitle?: string;
  className?: string;
}

const SectionHeader = ({
  highlight,
  subtitle,
  className,
}: SectionHeaderProps) => {
  return (
    <div className={cn("text-center mb-8 relative", className)}>
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl relative">
        {highlight && <AuroraText className="">{highlight}</AuroraText>}
      </h2>

      {subtitle && (
        <p className="mt-4 text-lg md:text-xl max-w-[85%] mx-auto text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
