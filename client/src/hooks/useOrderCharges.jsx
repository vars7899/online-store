import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderThunkActions, storeThunkActions } from "../redux/thunkActions";
import { updateNewOrderTotal } from "../redux/features/orderSlice";

export function useOrderCharges({ shippingCharges }) {
  const dispatch = useDispatch();
  const { chargesPercentage, cartSubtotal } = useSelector((state) => state.store);

  useEffect(() => {
    dispatch(storeThunkActions.getStoreChargesPercentage());
  }, []);

  // >> cart charges
  const convenienceFee = cartSubtotal * chargesPercentage.convenienceFeesPercentage;
  const gstFee = cartSubtotal * chargesPercentage.gstPercentage;
  const pstFee = cartSubtotal * chargesPercentage.pstPercentage;
  const total = cartSubtotal + convenienceFee + gstFee + pstFee + shippingCharges;

  useEffect(() => {
    dispatch(updateNewOrderTotal(total));
  }, [total]);

  return {
    convenienceFee,
    gstFee,
    pstFee,
    total,
  };
}
