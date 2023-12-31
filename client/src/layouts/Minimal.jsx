import { Divider } from "@chakra-ui/react";

export const Minimal = ({ children, bottomBar }) => {
  return (
    <div className="relative min-h-screen">
      <div className="px-32 py-4">
        <p className="text-xl leading-none">Eccent</p>
        <p className="text-xl leading-none">components</p>
      </div>
      <Divider />
      <div className="min-h-[calc(100vh-75px)] px-32 flex flex-col">{children}</div>
      {bottomBar ? (
        <div className="fixed left-0 bottom-0 w-full z-50 py-4 px-32 bg-white shadow-3xl">{bottomBar}</div>
      ) : null}
    </div>
  );
};
