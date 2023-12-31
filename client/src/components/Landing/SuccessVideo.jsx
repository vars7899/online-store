import React from "react";
import ReactPlayer from "react-player";
import video from "../../assets/v1.mp4";

export const SuccessVideo = () => {
  return (
    <div className="relative flex items-center justify-center grayscale mb-32">
      <ReactPlayer playing={true} loop muted url={[video]} width={"calc(100vw-64px)"} height={"50%"} />
      <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col items-start justify-start  mix-blend-difference">
        <p className=" text-9xl text-white uppercase font-semibold">Eccent*</p>
        <p className="max-w-lg mt-4 text-xl font-semibold text-white ml-2">
          Whatever the size of your business, whether you are an established company or a small business owner, we offer
          you a wide range of equipment.
        </p>
      </div>
    </div>
  );
};
