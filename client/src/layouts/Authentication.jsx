import { Link } from "react-router-dom";

export const Authentication = ({ children }) => {
  return (
    <div className="grid lg:grid-cols-[1fr,_650px] max-h-[100vh] sm:h-[100vh]">
      <div className="bg-black p-4 xl:p-12 flex flex-col justify-between h-min lg:h-full">
        <div className="hidden lg:contents">
          <Link to="/">
            <p className="text-xl flex flex-col leading-tight tracking-wide font-medium z-10">
              <span className="text-purple">Eccent*</span>
              <span className="text-white">Components</span>
            </p>
          </Link>
        </div>
        <div className="flex justify-center lg:justify-start cursor-default select-none">
          <div className="border-[2px] border-dashed border-purple px-4 w-min">
            <p className="text-4xl sm:text-9xl font-audio text-purple">E*C</p>
          </div>
        </div>
      </div>
      <div className="bg-white h-full">{children}</div>
    </div>
  );
};

{
  /* <div className="absolute top-16 left-16 flex text-white z-10 cursor-pointer" onClick={() => navigate("/")}>
          <IconChevronLeft />
          <p className="ml-2 font-semibold">Back to Home</p>
        </div> */
}
