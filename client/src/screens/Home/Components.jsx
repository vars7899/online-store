import { IconArrowUpRight } from "@tabler/icons-react";
import * as Layout from "../../layouts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RESET_STORE } from "../../redux/features/storeSlice";
import { toast } from "react-hot-toast";
import { Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { storeThunkActions as STA } from "../../redux/thunkActions";

export const Components = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productList, isError, message, categoryList } = useSelector((state) => state.store);

  const $initPage = () => {
    dispatch(STA.GET_ALL_STORE_PRODUCTS());
    dispatch(STA.GET_ALL_STORE_PRODUCT_CATEGORIES());
  };

  useEffect(() => {
    $initPage();
  }, []);

  useEffect(() => {
    if (isError) toast.error(message);
    dispatch(RESET_STORE());
  }, [isError, message, dispatch]);

  return (
    <Layout.Basic>
      <div>
        <div className="border-b-2 border-dashed py-12">
          <p className="uppercase text-8xl font-semibold tracking-tight">Components</p>
        </div>
        {categoryList
          ? categoryList.map((category) =>
              category.numberOfProducts ? (
                <div>
                  <div className="py-12 grid grid-cols-[400px,_1fr] gap-6">
                    <div className="flex flex-col justify-between min-h-[450px]">
                      <div>
                        <div className="text-4xl mb-4 flex">
                          <p className="uppercase">{category.name.match(/\b(\w)/g)} - </p>
                          <p className="capitalize">{category.name}</p>
                        </div>
                        <p className="text-sm text-gray-500 font-extralight">
                          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, repellat consequuntur.
                          Numquam quisquam ut enim, ea eligendi, ad asperiores dolor, a libero magni non dicta quis
                          ipsam. Molestiae voluptatum ut necessitatibus molestias ipsam nostrum dolores doloribus,
                          obcaecati sed tenetur quos!
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="border-2 rounded-full border-dashed p-4">
                          <IconArrowUpRight />
                        </div>
                        <p className="font-semibold text-lg ml-4">View all</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      {/* Filter out all the products that have same category then only display max 3 products */}
                      {productList
                        .filter((product) => product.category._id === category._id)
                        .slice(0, 3)
                        .map((product) => (
                          <div
                            className="bg-gray-100 p-6 cursor-pointer flex flex-col justify-between"
                            onClick={() => navigate(`/components/${product?._id}`)}
                          >
                            <div>
                              <p className="text-xs font-semibold uppercase mb-4 bg-yellow-400 px-4 py-2 rounded-full whitespace-nowrap w-min truncate">
                                {product.supplier}
                              </p>
                              <div className="flex items-center justify-center">
                                <Image src={product.img.url} boxSize="300" objectFit={"contain"} />
                              </div>
                              <p className="mt-4 capitalize font-semibold">{product.name}</p>
                            </div>

                            <motion.div
                              className="mt-6 px-6 py-4 text-gray-500 border-2 border-dashed border-gray-300 flex items-center justify-between rounded-full text-sm w-fit"
                              initial={{ width: "50%" }}
                              whileHover={{ width: "100%" }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <p className="tracking-wide mr-2 whitespace-nowrap">View Details</p>
                              <IconArrowUpRight strokeWidth={1} />
                            </motion.div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ) : null
            )
          : null}
      </div>
    </Layout.Basic>
  );
};
