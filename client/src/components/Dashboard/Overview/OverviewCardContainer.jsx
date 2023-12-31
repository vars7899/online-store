import { IconArrowRight, IconDotsVertical, IconReload } from "@tabler/icons-react";

export const OverviewCardContainer = ({ title, $reloadAction, children, footer, $footerAction, showFooter = true }) => {
  return (
    <div className="overview-card flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b-[1.5px]">
        <p>{title}</p>
        <div className="flex items-center text-gray-500">
          <IconReload strokeWidth={1.5} className="mr-3 cursor-pointer" onClick={$reloadAction} />
          <IconDotsVertical strokeWidth={1.5} className="cursor-pointer" />
        </div>
      </div>

      <div className="flex flex-col h-full">{children}</div>

      {showFooter && (
        <div
          className="flex items-center justify-center px-5 py-4 text-gray-500 border-t-[1.5px] cursor-pointer text-sm hover:text-accent-500 hover:bg-gray-50"
          onClick={$footerAction}
        >
          <p className="mr-2">View All {footer}</p>
          <IconArrowRight size={16} strokeWidth={1.75} />
        </div>
      )}
    </div>
  );
};

export const OverviewCardBox = ({ leftVal, rightVal, className, icon, $reloadAction, children }) => {
  return (
    <div className={`${className} p-5 rounded-lg flex flex-col flex-1`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start">
          <div className="mr-2">{icon}</div>
          <p className="text-lg">{leftVal}</p>
        </div>
        <div className="flex items-center">
          <IconReload strokeWidth={1.5} className="mr-3 cursor-pointer" onClick={$reloadAction} />
          <IconDotsVertical strokeWidth={1.5} className="cursor-pointer" />
        </div>
      </div>
      <div className="mt-5 w-full h-full">{children}</div>
    </div>
  );
};
