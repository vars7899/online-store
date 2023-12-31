import * as Layouts from "../../layouts";
import * as Components from "../../components";
import { Divider } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import * as storeActions from "../../redux/thunkActions/storeActions";
import { useEffect } from "react";

export const UserWishlist = () => {
  const dispatch = useDispatch();
  const { wishlist, isLoading, isSuccess } = useSelector((state) => state.store);

  const $initPageData = () => {
    dispatch(storeActions.GET_USER_WISHLIST_DETAILS());
  };

  useEffect(() => {
    $initPageData();
  }, []);

  return (
    <Layouts.ProfileSettings>
      <section className="h-[100%] mb-24">
        <Components.Default.SettingsHeading
          title={"User Wishlist"}
          desc="Update and manage your wishlist. Products you've saved for future consideration."
        />
        <Divider mt={4} />
        {wishlist.length ? (
          <Components.User.Wishlist.UserWishlistDetails
            wishlist={wishlist}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        ) : (
          <Components.User.Wishlist.EmptyWishlistFallback />
        )}
      </section>
    </Layouts.ProfileSettings>
  );
};
