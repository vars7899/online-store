import { Image } from "@chakra-ui/react";
import RoundButton from "../default/RoundButton";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const TopSellers = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  return (
    <div className="my-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl text-gray-500">
            Our Store <span className="!text-orange-500">Top Sellers</span>
          </p>
          <p className="text-gray-500 text-sm mt-1">Buy Products with the highest sales</p>
        </div>
        <RoundButton title={"View All"} />
      </div>
      <div className="mt-6">
        <Slider {...settings}>
          {Array.from({ length: 10 }).map(() => (
            <div className="overflow-hidden !rounded-2xl relative cursor-pointer px-2">
              <Image
                src={"https://source.unsplash.com/random"}
                h={"400"}
                w={"100%"}
                objectFit={"cover"}
                className="mix-blend-darken rounded-2xl"
                loading="lazy"
              />
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-3xl font-semibold text-white">Solenoid</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
