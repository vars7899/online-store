import { Button, Image } from "@chakra-ui/react";
import WishListImage from "../../../assets/wishlist.png";
import { useNavigate } from "react-router-dom";

export const EmptyWishlistFallback = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center h-[90%] bg-gray-50">
      <Image src={WishListImage} boxSize={100} loading="lazy" />
      <p className="text-lg font-semibold mt-12">Your Wishlist is Empty</p>
      <p className="max-w-sm text-center mt-1">
        Tap heart icon or save for later button to start saving your favorite products.
      </p>
      <Button mt={8} onClick={() => navigate("/components")} variant="outline" colorScheme="gray">
        Add Now
      </Button>
    </section>
  );
};
