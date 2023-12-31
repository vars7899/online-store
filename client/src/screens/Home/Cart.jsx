import { Button, Divider, IconButton, StackDivider, VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Components, Layouts } from "../../global";
import * as storeThunkAction from "../../redux/thunkActions/storeActions";
import { useEffect } from "react";
import { IconDotsVertical } from "@tabler/icons-react";
import toast from "react-hot-toast";

export const Cart = () => {
  const dispatch = useDispatch();
  const { cart, isLoading } = useSelector((state) => state.store);

  useEffect(() => {
    $reloadCartData();
  }, []);

  const $reloadCartData = () => {
    dispatch(storeThunkAction.GET_USER_CART_DETAILS());
  };

  const $moveGivenProductToUserWishlist = (productId, cartItemId) => {
    dispatch(storeThunkAction.ADD_PRODUCT_TO_USER_WISHLIST(productId)).then(
      dispatch(storeThunkAction.REMOVE_PRODUCT_FROM_USER_CART(cartItemId))
    );
  };
  const $removeProductFromUserCart = (cartItemId) => {
    dispatch(storeThunkAction.REMOVE_PRODUCT_FROM_USER_CART(cartItemId));
  };
  const $updateCartItemQuantity = (cartItem, action) => {
    // >> Limit the buy to available stock
    if (cartItem.qty >= cartItem.product.qty) {
      return toast.error(`At this time, we have only ${cartItem.product.qty} of ${cartItem.product.name}`);
    }
    // >> If product qty is one, if removed then remove the product from cart
    if (cartItem.qty === 1 && action === "decrease") {
      return dispatch(storeThunkAction.REMOVE_PRODUCT_FROM_USER_CART(cartItem._id));
    }
    // >> Increase product qty in cart
    if (action === "increase")
      dispatch(storeThunkAction.UPDATE_CART_ITEM_QTY({ cartItemId: cartItem._id, changeValue: 1 }));
    // >> Decrease product qty in cart
    if (action === "decrease")
      dispatch(storeThunkAction.UPDATE_CART_ITEM_QTY({ cartItemId: cartItem._id, changeValue: -1 }));
  };

  return (
    <Layouts.Basic>
      <div className="flex-1 flex flex-col pt-4 pb-12">
        <Components.Default.SettingsHeading
          title={"Shopping Cart"}
          desc={"Update and manage your cart details here."}
          className="pb-4"
        />
        <Divider mb={4} />
        <div className="grid xl:grid-cols-[1fr,_400px] gap-6 flex-1">
          <div className="border-[1.5px] rounded-xl px-6 py-4 max-h-[760px] overflow-y-scroll disable-scrollbars">
            {cart && cart.length ? (
              <>
                <div className="flex items-center justify-between">
                  <p className="tracking-wide text-lg">Product List</p>
                  <div className="flex items-center">
                    <Button
                      variant={"link"}
                      borderRight={"1px"}
                      borderRadius={"0"}
                      borderColor={"gray.200"}
                      paddingRight={"1rem"}
                      marginRight={"0.5rem"}
                      size={"sm"}
                      onClick={() => dispatch(storeThunkAction.clearUserCart())}
                    >
                      Clear Cart
                    </Button>
                    <IconButton icon={<IconDotsVertical />} variant={"link"} size={"sm"} />
                  </div>
                </div>
                <Divider my={4} />
                <VStack divider={<StackDivider borderColor="gray.200" />} spacing={8} align="stretch">
                  {cart.map((item, index) => (
                    <Components.Cart.CartProductCard
                      cartItem={item}
                      key={`cart-product-${index}`}
                      isLoading={isLoading}
                      $moveGivenProductToUserWishlist={$moveGivenProductToUserWishlist}
                      $removeProductFromUserCart={$removeProductFromUserCart}
                      $updateCartItemQuantity={$updateCartItemQuantity}
                    />
                  ))}
                </VStack>
              </>
            ) : (
              <Components.Cart.EmptyCartPlaceholder />
            )}
          </div>
          <Components.Cart.CartSummary title={"Cart Review"} />
        </div>
      </div>
    </Layouts.Basic>
  );
};
