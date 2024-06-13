import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Logo = ({
  className = "",
  black = false,
}: {
  className?: string;
  black?: boolean;
}) => {
  return (
    <Link
      to="/"
      className={cn("font-black text-[30px] lg:text-[45px]", className)}
    >
      <span className="text-[#4880FF]">Distr</span>
      <span className={black ? "text-black" : "text-white"}>Equip</span>
    </Link>
  );
};

export default Logo;
