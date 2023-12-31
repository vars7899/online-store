import React from "react";
import ColdCoffee from "../../assets/heroImage.png";
import MatchaSupreme from "../../assets/matchaSupreme.webp";

export const SelectByCategory = () => {
  return (
    <section className="bg-white px-28 min-h-[100vh] flex flex-col justify-center">
      <div className="py-4">
        <p className="capitalize text-2xl font-semibold">Shop By Category</p>
      </div>
      <div className="grid grid-cols-4 grid-row-6 gap-[20px] h-[600px]">
        <div className="col-span-2 row-span-2 rounded-2xl grid grid-cols-3 overflow-hidden">
          <div className="col-span-2 flex flex-col justify-between p-6 bg-emerald-900">
            <div className="">
              <p className="text-2xl mb-2 font-semibold text-slate-200">Learn what's new at Little Cafe</p>
              <p className="text-base text-slate-400">
                Check out the latest news and stories about our partners (employees), stores and communities.
              </p>
            </div>
            <button className="border-[1px] rounded-full px-6 py-2 border-black min-w-min">Learn More</button>
          </div>
          <div className="col-span-1"></div>
        </div>
        <div className="bg-red-200  col-span-2"></div>
        <div className="relative rounded-2xl row-span-3 overflow-hidden shadow-2xl">
          <div className="p-6">
            <p className="text-2xl mb-2 font-semibold">Coffee</p>
            <p>Choose from </p>
          </div>
          <div className="absolute">
            <img src={ColdCoffee} alt="" />
          </div>
        </div>
        <div className="relative rounded-2xl row-span-3 overflow-hidden shadow-2xl">
          <div className="p-6">
            <p className="text-2xl mb-2 font-semibold">croissants</p>
            <p>Choose from </p>
          </div>
          <div className="absolute right-32">
            <img src={MatchaSupreme} />
          </div>
        </div>
        <div className="bg-red-200  row-span-2"></div>
        <div className="bg-red-200  row-span-2"></div>

        <div className="bg-red-200  col-span-2 row-span-2"></div>
        <div className="bg-red-200  row-span-2"></div>
        <div className="bg-red-200  row-span-2"></div>
      </div>
    </section>
  );
};
