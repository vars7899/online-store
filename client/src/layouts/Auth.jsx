import { IconBleachNoChlorine } from "@tabler/icons-react";

export const Auth = ({ children }) => {
  return (
    <div className="grid grid-cols-[1.25fr,_1fr] min-h-[100vh]">
      <div className="bg-black px-16 py-14 relative">
        <div className="flex items-center">
          <IconBleachNoChlorine size={48} strokeWidth={1} className="text-accent-500" />
          <div className="ml-2 flex flex-col items-start justify-center cursor-pointer text-white">
            <p className="text-[1.15rem] leading-none">Eccent</p>
            <p className="text-[1.15rem] leading-none">Components</p>
          </div>
        </div>
      </div>
      <div className="bg-white px-32 py-16">{children}</div>
    </div>
  );
};
