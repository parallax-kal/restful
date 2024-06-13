import loginCover from "@/assets/images/login-cover.png";
import Logo from "@/components/common/logo";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { Route, Routes } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex h-full md:h-screen">
      <div className="w-2/3 md:block hidden relative">
        <img src={loginCover} className="h-full w-full" />
        <Logo className="absolute top-[40%] left-[18%]"/>
      </div>

      <div className="bg-white flex flex-col items-center justify-center w-full">
        <div className="md:w-[480px] md:border-none border rounded-[12px] px-5 md:h-auto h-full md:my-0 my-5 md:py-0 py-3">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
