import { Button, Image } from "@chakra-ui/react";
import { IconX } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as storeActions from "../../../redux/thunkActions/storeActions";
import toast from "react-hot-toast";

export const UserWishlistDetails = ({ wishlist, isLoading, isSuccess }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const $navigateToProductDetailsPage = (productId) => navigate(`/components/${productId}`);

  const $removeProductFromUserWishlist = (productId) => {
    if (!productId) return;
    dispatch(storeActions.REMOVE_PRODUCT_FROM_USER_WISHLIST(productId));
  };
  const $moveProductFromWishlistToCart = (productId) => {
    if (!productId) return;
    dispatch(storeActions.ADD_PRODUCT_TO_USER_CART({ productId, qty: { qty: 1 } }))
      .then(() => dispatch(storeActions.REMOVE_PRODUCT_FROM_USER_WISHLIST(productId)))
      .then(() => toast.success("Product moved to cart"));
  };

  return (
    <section className="mt-4">
      <div className="grid grid-cols-[repeat(auto-fill,_280px)] gap-6">
        {wishlist.map((product, index) => (
          <div key={`wishlist-product-${index}`}>
            <div className="relative bg-gray-100 rounded-xl p-6 mb-2 flex items-center justify-center">
              <Image
                src={product.img.url}
                boxSize={200}
                objectFit={"contain"}
                onClick={() => $navigateToProductDetailsPage(product._id)}
                className="cursor-pointer"
                loading="lazy"
              />
              <div
                className="absolute top-3 right-3 cursor-pointer hover:scale-90"
                onClick={() => $removeProductFromUserWishlist(product._id)}
              >
                <IconX />
              </div>
            </div>
            <p className="max-w-[280px] truncate">{product.name}</p>
            <p className="max-w-xs text-gray-400">CAD {product.price.toFixed(2)}</p>
            <div className="mt-2 flex flex-col items-center">
              <Button
                colorScheme="gray"
                variant={"outline"}
                w={"full"}
                mb={2}
                onClick={() => $navigateToProductDetailsPage(product._id)}
                className="cursor-pointer"
              >
                View Details
              </Button>
              <Button
                colorScheme="blue"
                variant={"outline"}
                w={"full"}
                onClick={() => $moveProductFromWishlistToCart(product._id)}
                isLoading={isLoading}
              >
                Move to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
