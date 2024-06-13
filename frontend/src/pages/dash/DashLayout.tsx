import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { instance } from "@/lib/axios";
import Dashboard from ".";
import { useRecoilState } from "recoil";
import { userAtom } from "@/lib/recoil";
import Loader from "@/components/common/loader";
import Navbar from "@/components/common/navbar";
import Employees from "./employees";
import Laptops from "./laptops";

const DashLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userAtom);
  useEffect(() => {
    instance
      .get("/users/me")
      .then(({ data }) => {
        setUser(data.user);
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("token");
        navigate("/auth/login");
      });
  }, []);

  return !user ? (
    <Loader className="h-screen w-full" />
  ) : (
    <div className="bg-[#F5F6FA]">
      <Navbar />
      <div className="h-screen lg:px-10 px-5  pb-4 pt-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/laptops" element={<Laptops />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashLayout;
