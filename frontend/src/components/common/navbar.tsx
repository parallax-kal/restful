import { userAtom } from "@/lib/recoil";
import { FaUser } from "react-icons/fa6";
import { useRecoilValue } from "recoil";
import { FaAngleDown } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import Logo from "./logo";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const user = useRecoilValue(userAtom);
  const navs = ["employees", "laptops"];

  const pathname = window.location.pathname.split("/")[1];

  return (
    <div className="sticky w-full z-50 top-0 flex justify-between bg-white px-10 py-5">
      <div className="flex gap-20 items-center">
        <Logo className="!text-[20px] !font-extrabold" black />
        <div className="gap-8 flex items-center">
          {navs.map((nav) => (
            <Link
            key={nav}
              to={`/${nav.toLowerCase()}`}
              className={cn(
                "capitalize font-semibold text-[20px] duration-200 transition-all",
                pathname === nav.toLowerCase() ? "text-[#4880FF]" : "text-black"
              )}
            >
              {nav}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="rounded-full p-2 bg-[#EDEDED]">
          <FaUser color="#8280FF" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1">
            <div>{user.fullname}</div>
            <FaAngleDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]">
            <DropdownMenuItem
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/auth/login";
              }}
              className="cursor-pointer flex gap-2"
            >
              <IoMdLogOut />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
