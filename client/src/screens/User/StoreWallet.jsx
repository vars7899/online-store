import { Button, Divider, Input } from "@chakra-ui/react";
import { Components, Layouts } from "../../global";
import { UserTransactionHistory } from "../../components/User";
import { useEffect, useState } from "react";
import { IconCreditCard } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { paymentThunkActions } from "../../redux/thunkActions";
import toast from "react-hot-toast";
import { resetPayment } from "../../redux/features/paymentSlice";

export const StoreWallet = () => {
  const dispatch = useDispatch();
  const { transactionHistoryList, isError, message } = useSelector((state) => state.payment);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(paymentThunkActions.getAllUserTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(resetPayment());
  }, [isError, message, dispatch]);

  return (
    <Layouts.ProfileSettings>
      <Components.Default.SettingsHeading
        title={"Store Wallet"}
        desc="You can review and manage your store wallet, as well as track all the transaction of your wallet."
      />
      <Divider my={4} />
      <div className="grid gap-6">
        <div className="grid xl:grid-cols-[400px_1fr] gap-4">
          <Components.User.WalletCard user={user} />
          <AddBalanceToWalletSection />
        </div>
        <div>
          <Components.Default.SettingsHeading
            title={"Transaction History"}
            desc=" The following is the list of transaction created from this card. If you see anything wrong. Please call the Eccent customer support service."
          />
          <Divider my={4} />
          <UserTransactionHistory transactions={transactionHistoryList} />
        </div>
      </div>
    </Layouts.ProfileSettings>
  );
};

const AddBalanceToWalletSection = () => {
  const [amount, setAmount] = useState(null);
  const amountOptions = [10, 50, 100, 200, 250, 500];

  return (
    <div>
      <Components.Default.SettingsHeading
        title={"Add Balance"}
        desc=" Store credits cannot be exchanged for original payment. If you still have any question please call Eccent customer service. By proceeding and paying you agree to the terms and condition of the Eccent components."
        className={"mb-4"}
      />
      <div className="grid grid-cols-[repeat(2,_1fr)] gap-2">
        {amountOptions.map((amt, index) => (
          <Button variant={"outline"} onClick={() => setAmount(amt.toFixed(2))}>
            {amt.toFixed(2)} CAD
          </Button>
        ))}
      </div>
      <div className="grid xl:grid-cols-[1fr,_200px] my-4 gap-2">
        <Input
          min={0}
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Components.User.AddMoneyToUserWallet amount={amount}>
          <Button
            disabled={!amount}
            width={"full"}
            leftIcon={<IconCreditCard />}
            variant={"outline"}
            colorScheme="blue"
          >
            Add Amount
          </Button>
        </Components.User.AddMoneyToUserWallet>
      </div>
    </div>
  );
};
