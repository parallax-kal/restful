import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-[#08193F]">
      <RotatingLines
        visible={true}
        // height="96"
        width="96"
        // color="#1685FB"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
};

export default Loader;
