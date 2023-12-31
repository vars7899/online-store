import { Box, IconButton, Image, Tag } from "@chakra-ui/react";
import { IconArrowRight, IconMinus, IconPlus } from "@tabler/icons-react";

export const CartProductCard = ({
  cartItem,
  isLoading,
  $moveGivenProductToUserWishlist,
  $removeProductFromUserCart,
  $updateCartItemQuantity,
}) => {
  return (
    <div className={`grid grid-cols-[140px,_1fr] gap-6 px-1`}>
      <div className="bg-gray-100 rounded-xl flex items-center justify-center py-4">
        <Image src={cartItem.product?.img.url} boxSize={100} objectFit={"contain"} loading="lazy" />
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="flex justify-between">
          <div className="flex items-center">
            <p className="max-w-lg truncate">{cartItem.product.name}</p>
            {cartItem.product.qty <= 0 ? (
              <Tag variant={"outline"} colorScheme="red" size={"sm"} ml={2}>
                Out of Stock
              </Tag>
            ) : cartItem.product.qty > 10 ? (
              <Tag variant={"outline"} colorScheme="green" size={"sm"} ml={2}>
                In Stock
              </Tag>
            ) : (
              <Tag variant={"outline"} colorScheme="yellow" size={"sm"} ml={2}>
                Limited Stock
              </Tag>
            )}
          </div>
          <div className="flex items-center border-[1.5px] rounded-full overflow-hidden">
            <IconButton
              icon={<IconMinus size={16} />}
              variant={"ghost"}
              borderRadius={0}
              colorScheme="blue"
              borderLeftWidth={1.5}
              size={"sm"}
              px={3}
              onClick={() => $updateCartItemQuantity(cartItem, "decrease")}
              isLoading={isLoading}
              isDisabled={!cartItem.qty}
            />
            <div className="min-w-[50px] flex items-center justify-center px-4 text-sm">
              <p>{cartItem.qty}</p>
            </div>

            <IconButton
              icon={<IconPlus size={16} />}
              variant={"ghost"}
              borderRadius={0}
              colorScheme="blue"
              borderRightWidth={1.5}
              size={"sm"}
              px={3}
              onClick={() => $updateCartItemQuantity(cartItem, "increase")}
              isLoading={isLoading}
              isDisabled={cartItem.qty >= cartItem.product.buyingLimit}
            />
          </div>
        </div>
        <div>
          <div className="flex cartItems-center text-gray-500 text-sm">
            <p>Price (per piece)</p>
            <IconArrowRight className="mx-2" strokeWidth={1} size={16} />
            <p className="capitalize">{cartItem.product.price.toFixed(2)} CAD</p>
          </div>
          <div className="flex cartItems-center text-gray-500 text-sm">
            <p>Supplier</p>
            <IconArrowRight className="mx-2" strokeWidth={1} size={16} />
            <p className="capitalize">{cartItem.product.supplier}</p>
          </div>
          <div className="flex cartItems-center text-gray-500 text-sm">
            <p>Package Dimensions</p>
            <IconArrowRight className="mx-2" strokeWidth={1} size={16} />
            <p className="capitalize">
              {cartItem.product.dimension.length.toFixed(2)} cm x {cartItem.product.dimension.width.toFixed(2)} cm x{" "}
              {cartItem.product.dimension.height.toFixed(2)} cm
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-end justify-between text-sm">
            <p className="underline cursor-pointer" onClick={() => $removeProductFromUserCart(cartItem._id)}>
              Remove from Cart
            </p>
            <p
              className="underline ml-4 cursor-pointer"
              onClick={() => $moveGivenProductToUserWishlist(cartItem.product._id, cartItem._id)}
            >
              Move to Wishlist
            </p>
          </div>
          <p className="font-semibold text-sm">{(cartItem.product.price * cartItem.qty).toFixed(2)} CAD</p>
        </div>
      </div>
    </div>
  );
};
