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

const Navbar = () => {
  const user = useRecoilValue(userAtom);
  return (
    <div className="sticky w-full flex justify-between bg-white px-5 py-3">
      <div></div>
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
              className="cursor-pointer"
            >
              <IoMdLogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
