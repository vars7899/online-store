import { useEffect } from "react";
import { Button, Divider } from "@chakra-ui/react";
import { IconReload } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeThunkActions } from "../../redux/thunkActions";
import * as storeActions from "../../redux/features/storeSlice";
import { ComponentLoadingBlock } from "../Loader";
import { DateTime } from "luxon";
import { Hooks } from "../../global";

export const CartSummary = ({
  title,
  displayProceed = true,
  shippingCharges = 0,
  displayOtherOrderInfo = false,
  orderDetails,
}) => {
  const dt = DateTime.now();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { convenienceFee, gstFee, pstFee, total } = Hooks.useOrderCharges({ shippingCharges });
  const { cartSubtotal, cart, isLoading, cartCount } = useSelector((state) => state.store);

  useEffect(() => {
    dispatch(storeActions.getCartSubtotal());
  }, [cart]);

  const $reloadCartData = () => {
    dispatch(storeThunkActions.GET_USER_CART_DETAILS());
  };

  return (
    <div className="bg-gray-50/90 py-4 px-6 rounded-xl flex flex-col flex-1 justify-between">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between">
          <div>
            <p className="tracking-wide text-lg">{title}</p>
            <p className="text-xs text-gray-500">{dt.toLocaleString(DateTime.DATETIME_MED)}</p>
          </div>
          <IconReload
            size={24}
            strokeWidth={1.25}
            className="cursor-pointer hover:scale-95"
            onClick={$reloadCartData}
          />
        </div>
        <Divider my={4} />
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <ComponentLoadingBlock />
          </div>
        ) : (
          <div>
            <CartProductDetails cart={cart} />

            {displayOtherOrderInfo && (
              <>
                <Divider my={4} />
                <OrderUserSelectionDetails className="my-4" orderDetails={orderDetails} />
              </>
            )}
            <Divider my={4} />
            <CartChargesDetails
              className="my-4"
              cartSubtotal={cartSubtotal}
              convenienceFee={convenienceFee}
              pstFee={pstFee}
              gstFee={gstFee}
              shippingCharges={shippingCharges}
              total={total}
            />
          </div>
        )}
      </div>
      {displayProceed && (
        <div>
          <Divider my={4} />
          <Button
            colorScheme="accent"
            variant={"outline"}
            w={"full"}
            onClick={() => navigate("/order/new-order")}
            isDisabled={!cartCount}
          >
            Proceed to Checkout
          </Button>
          <p className="mt-2 text-xs font-extralight text-gray-400">
            By agreeing to proceed to checkout, you are agreeing to all the terms and condition of Eccent* Components.
          </p>
        </div>
      )}
    </div>
  );
};

const CartProductDetails = ({ cart, className }) => {
  return (
    <div className={className}>
      <div className="flex items-center justify-between text-sm">
        <p>Products Details</p>
        <p className="">{cart.length}</p>
      </div>
      <div className="my-4 tracking-wide max-h-[140px] overflow-y-scroll disable-scrollbars">
        {cart.map((cartItem, index) => (
          <div className="text-sm flex items-start justify-between mb-2" key={`cart-item-${index}`}>
            <div className="flex justify-between">
              <p className="bg-accent-300 rounded-full h-[8px] min-w-[8px] mt-1 mr-4"></p>
              <p className="">{cartItem.product.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CartChargesDetails = ({ className, cartSubtotal, convenienceFee, pstFee, gstFee, total, shippingCharges }) => {
  return (
    <div className={className}>
      <p className=" text-sm">Charges Details</p>
      <div className="my-4 tracking-wide">
        <ChargesInfoPair chargeName={"subtotal"} value={cartSubtotal} />
        <ChargesInfoPair chargeName={"PST"} value={pstFee} />
        <ChargesInfoPair chargeName={"GST"} value={gstFee} />
        <ChargesInfoPair chargeName={"Convenience Fee"} value={convenienceFee} />
        <ChargesInfoPair chargeName={"shipping charges"} value={shippingCharges} />
        <Divider my={4} />
        <ChargesInfoPair chargeName={"Total"} value={total} className="font-semibold" />
        <Divider my={3} />
        <p className="text-xs">Shipping charges will be added according to shipping method.</p>
      </div>
    </div>
  );
};

const OrderUserSelectionDetails = ({ orderDetails, className }) => {
  return (
    <div className={className}>
      <p className=" text-sm">Order Details</p>
      <div className="my-4 tracking-wide">
        <DetailsPair title={"Shipping Method"} value={orderDetails.shippingMethod} />
        <DetailsPair
          title={"Estimated Delivery"}
          value={DateTime.fromISO(orderDetails.estimatedDeliveryDate).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
        />
        <DetailsPair title={"Payment Method"} value={orderDetails.paymentMethod} />
      </div>
    </div>
  );
};

const ChargesInfoPair = ({ chargeName, value, className }) => {
  return (
    <div className={`text-sm flex items-center justify-between mb-2 ${className}`}>
      <p className="capitalize">{chargeName}</p>
      <p>
        {value && typeof value === "number" ? value.toFixed(2) : "---"}{" "}
        <span className="text-xs ml-1 text-gray-400">CAD</span>
      </p>
    </div>
  );
};

const DetailsPair = ({ title, value, className }) => {
  return (
    <div className={`text-sm flex items-center justify-between mb-2 ${className}`}>
      <p className="capitalize">{title}</p>
      <p className="capitalize">{value}</p>
    </div>
  );
};
