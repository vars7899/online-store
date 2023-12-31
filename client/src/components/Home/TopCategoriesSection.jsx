import { Image } from "@chakra-ui/react";
import RoundButton from "../default/RoundButton";
import { useDispatch } from "react-redux";

const TopCategoriesSection = () => {
  const dispatch = useDispatch();
  return (
    <div className="my-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl text-gray-500">
            Browse Our <span className="!text-orange-500">Top Categories</span>
          </p>
          <p className="text-gray-500 text-sm mt-1">Choose from wide variety of Items</p>
        </div>
        <RoundButton title={"View All"} />
      </div>
      <div className="grid grid-cols-5 gap-4 mt-6">
        {Array.from({ length: 5 }).map(() => (
          <div className="overflow-hidden rounded-2xl relative cursor-pointer">
            <Image
              src={"https://source.unsplash.com/random"}
              h={"400"}
              w={"100%"}
              objectFit={"cover"}
              className="mix-blend-darken"
            />
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-3xl font-semibold text-white">Solenoid</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategoriesSection;
