import Logo from "./logo";

const Sidebar = () => {
  return (
    <div className="fixed left-0 h-screen bg-white flex flex-col items-center w-[12rem] py-[20px] gap-[15px]">
      <Logo className="font-semibold !text-[20px]" black/>
    </div>
  )
}

export default Sidebar;