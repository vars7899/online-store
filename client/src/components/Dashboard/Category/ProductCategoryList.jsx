import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Tag,
} from "@chakra-ui/react";
import { IconUfo } from "@tabler/icons-react";
import { DateTime } from "luxon";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_PRODUCT_ASSOCIATED_WITH_CATEGORY, RESET_DASHBOARD } from "../../../redux/features/dashboardSlice";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const ProductCategoryList = ({ categoryList }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedCategoryProducts, isError, message } = useSelector((state) => state.dashboard);

  const $getMoreDetailsAboutCategory = (categoryId) => {
    if (!categoryList || categoryList.numberOfProducts <= 0) return;
    dispatch(GET_ALL_PRODUCT_ASSOCIATED_WITH_CATEGORY(categoryId));
  };

  useEffect(() => {
    if (isError) toast.error(message);
    dispatch(RESET_DASHBOARD());
  }, [isError, message, dispatch]);

  if (!categoryList) {
    return <div>Loading.....</div>;
  } else {
    return (
      <div>
        <Accordion allowToggle>
          {categoryList
            ? categoryList.map((category, index) => (
                <AccordionItem
                  key={`category-item-${index}`}
                  onClick={() => $getMoreDetailsAboutCategory(category._id)}
                  _hover={{ bg: "white" }}
                >
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left" className="capitalize">
                        {category.name}
                        <Tag className="ml-2 uppercase" colorScheme="gray">
                          {category.numberOfProducts}
                        </Tag>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} className="bg-slate-100">
                    <div className="py-4 px-6 grid grid-cols-4">
                      <div>
                        <p className="text-xs">Category ID</p>
                        <p className="mt-1 font-semibold text-sm">{category._id}</p>
                      </div>
                      <div>
                        <p className="text-xs">Created At</p>
                        <p className="mt-1 font-semibold text-sm">
                          {DateTime.fromISO(category.createdAt).toLocaleString(DateTime.DATETIME_MED)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs">Number of Products</p>
                        <p className="mt-1 font-semibold text-sm">{category.numberOfProducts}</p>
                      </div>
                      <div>
                        <p className="text-xs">Created By</p>
                        <p className="mt-1 font-semibold text-sm">
                          {category.createdBy.firstName} {category.createdBy.lastName}
                        </p>
                      </div>
                    </div>
                    <Divider />
                    {category.numberOfProducts ? (
                      <div>
                        {selectedCategoryProducts ? (
                          <div className="px-4 py-2 grid grid-cols-4 gap-1">
                            {selectedCategoryProducts.map((product, index) => (
                              <div
                                key={`category-product-box-${index}`}
                                className="bg-slate-50 p-4 border-[1px] rounded-md cursor-pointer hover:bg-white"
                                onClick={() => navigate(`/dashboard/products/${product._id}`)}
                              >
                                <div>
                                  <p className="text-red-500 text-xs uppercase mb-1">#{product._id}</p>
                                  <p className="text-sm max-h-8 truncate">{product.name}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4">
                        <IconUfo size={28} />
                        <p className="mt-1 text-sm max-w-xs text-center">
                          Currently no products are available under this category.
                        </p>
                      </div>
                    )}
                  </AccordionPanel>
                </AccordionItem>
              ))
            : null}
        </Accordion>
      </div>
    );
  }
};
