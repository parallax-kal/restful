import Loader from "@/components/common/loader";
import { instance } from "@/lib/axios";
import { useQuery } from "react-query";
import PeopleIcon from "@/assets/svg/people.svg?react";
import EmployeesIcon from "@/assets/svg/employees.svg?react";
import LaptopsIcon from "@/assets/svg/laptops.svg?react";

const Dashboard = () => {
  const { data, isLoading } = useQuery(
    "totals",
    async () => {
      const response = await instance.get("/users/totals");

      return response.data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  return isLoading ? (
    <Loader className="h-[200px]" />
  ) : (
    <div className="grid gap-6 grid-cols-3">
      <div className="bg-white rounded-[14px] py-8 px-6 flex justify-between">
        <div className="flex flex-col gap-2 text-[#202224]">
          <div className="font-semibold text-[16px]">Total User</div>
          <div className="text-[28px] font-bold">{data.totalUsers}</div>
        </div>
        <div className="rounded-[20px] h-fit bg-[#8280ff54] p-4">
          <PeopleIcon />
        </div>
      </div>
      <div className="bg-white rounded-[14px] py-8 px-6 flex justify-between">
        <div className="flex flex-col gap-2 text-[#202224]">
          <div className="font-semibold text-[16px]">Total User</div>
          <div className="text-[28px] font-bold">{data.totalEmployees}</div>
        </div>
        <div className="rounded-[20px] h-fit bg-[#fec43d44] p-4">
          <EmployeesIcon />
        </div>
      </div>
      <div className="bg-white rounded-[14px] py-8 px-6 flex justify-between">
        <div className="flex flex-col gap-2 text-[#202224]">
          <div className="font-semibold text-[16px]">Total User</div>
          <div className="text-[28px] font-bold">{data.totalLaptops}</div>
        </div>
        <div className="rounded-[20px] h-fit bg-[#4ad99242] p-4">
          <LaptopsIcon />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
