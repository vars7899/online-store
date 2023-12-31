import { Components } from "../global";

export const Basic = ({ children, bottomBar }) => {
  return (
    <div className="relative min-h-screen">
      <Components.Home.Navbar />
      <div className="min-h-[calc(100vh-75px)] px-4 md:px-12 xl:px-32 flex flex-col">{children}</div>
      {bottomBar ? (
        <div className="fixed left-0 bottom-0 w-full z-50 py-4 px-32 bg-white shadow-3xl">{bottomBar}</div>
      ) : null}
      {/* <Components.Home.Footer /> */}
    </div>
  );
};
