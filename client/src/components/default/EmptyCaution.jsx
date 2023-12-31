import { IconAlertCircle } from "@tabler/icons-react";

export const EmptyCaution = ({ className }) => {
  return (
    <section className={`flex flex-col items-center justify-center h-[100%] rounded-xl py-24 ${className}`}>
      <div className="text-accent-500 bg-accent-100/20 p-6 rounded-full animate-bounce">
        <IconAlertCircle size={60} strokeWidth={1.25} />
      </div>
      <p className="text-lg mt-10">Nothing here !!!</p>
      <p className="max-w-sm text-center mt-1 text-sm text-gray-400">
        It appears that you do not have any documents of this type at the moment
      </p>
    </section>
  );
};
