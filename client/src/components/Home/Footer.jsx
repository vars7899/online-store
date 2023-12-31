import { IconArrowRight } from "@tabler/icons-react";
import React from "react";

export const Footer = () => {
  return (
    <div className="px-32 py-16 bg-stone-900 w-[100%]">
      <div className="grid gap-6 grid-cols-[400px,_1fr] text-lg text-white">
        <p className="text-white font-semibold">Contact</p>
        <div>
          <p className="text-6xl font-semibold uppercase leading-none text-white">How to reach us?</p>
          <div className="grid grid-cols-2 mt-12">
            <div>
              <div>
                <p className="mb-2">Phone:</p>
                <p>+1 (324) 298-2039 ext 124</p>
                <p>+1 (324) 345-3453 ext 978</p>
              </div>
              <div className="mt-8">
                <p className="mb-2">Email</p>
                <p>info@eccent-world.com</p>
              </div>
            </div>
            <div>
              <p className="mb-2">Subscribe to our newsletter</p>
              <div className="flex items-center justify-between border-[1px] border-stone-600 px-6 py-4">
                <input
                  type="email"
                  placeholder="E-mail"
                  className="bg-transparent outline-none placeholder:text-stone-300"
                />
                <IconArrowRight />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-2 border-dashed border-stone-600 mt-16 pt-16">
        <div className="grid gap-6 grid-cols-[400px,_1fr] text-lg text-stone-600">
          <p className="font-semibold">Product & Services</p>
          <div className="grid grid-cols-3 gap-6">
            <div></div>
            <div></div>
            <div className="text-stone-200">
              <p className="py-1">About us</p>
              <p className="py-1">Knowledge Center</p>
              <p className="py-1">News</p>
              <p className="py-1">Contact</p>
              <p className="py-1">Careers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
