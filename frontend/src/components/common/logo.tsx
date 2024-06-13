import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <Link to="/" className={cn("font-black text-[30px] lg:text-[45px]", className)}>
      <span className="text-[#4880FF]">Distr</span>
      <span className="text-white">Equip</span>
    </Link>
  );
};

export default Logo;
