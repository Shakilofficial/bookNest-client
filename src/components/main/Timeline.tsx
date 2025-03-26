interface TimelineProps {
  children: React.ReactNode;
}
const Timeline = ({ children }: TimelineProps) => {
  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Timeline center line - hidden on mobile */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-full hidden md:block"></div>

      {/* Mobile timeline line */}
      <div className="absolute left-4 sm:left-8 top-0 h-full w-1 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-full md:hidden"></div>

      <div className="space-y-16 md:space-y-24">{children}</div>
    </div>
  );
};

export default Timeline;
