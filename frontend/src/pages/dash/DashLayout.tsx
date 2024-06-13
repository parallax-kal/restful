import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { instance } from "@/lib/axios";
import Dashboard from ".";
import { useRecoilState } from "recoil";
import { userAtom } from "@/lib/recoil";
import Loader from "@/components/common/loader";
import Navbar from "@/components/common/navbar";
import Sidebar from "@/components/common/sidebar";

const DashLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userAtom);
  useEffect(() => {
    instance
      .get("/users/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
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
    <Loader />
  ) : (
    <div className="bg-[#F5F6FA]">
      <Sidebar />
      <div className="pl-[12rem] h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashLayout;
