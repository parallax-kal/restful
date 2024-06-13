import { cn } from "@/lib/utils";

const Loader = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={cn("flex items-center justify-center ", className)}
    >
      Loading...
    </div>
  );
};

export default Loader;
