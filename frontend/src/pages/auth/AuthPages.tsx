import loginCover from "@/assets/images/login-cover.png";
import Logo from "@/components/common/logo";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import { Route, Routes } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex">
      <div className="md:block w-2/3 hidden relative  min-h-screen lg:h-screen">
        <img src={loginCover} className="h-full w-full" />
        <Logo className="absolute top-[40%] left-[18%]"/>
      </div>

      <div className="bg-white flex flex-col items-center justify-center w-full">
        <div className="md:w-[480px] md:border-none border rounded-[12px] px-5 md:my-0 my-5 py-3">
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
