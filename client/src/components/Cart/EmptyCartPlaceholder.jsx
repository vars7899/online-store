import { Button } from "@chakra-ui/react";
import { IconShoppingBag } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const EmptyCartPlaceholder = () => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col items-center justify-center h-[100%] rounded-xl">
      <div className="text-accent-500 bg-accent-100/20 p-6 rounded-full animate-bounce">
        <IconShoppingBag size={60} strokeWidth={1.25} />
      </div>
      <p className="text-lg font-semibold mt-10">Your Cart is Empty</p>
      <p className="max-w-sm text-center mt-1">Tap add to cart button to start adding products to your cart.</p>
      <Button mt={8} onClick={() => navigate("/components")} variant="outline" colorScheme="gray">
        View Catalog
      </Button>
    </section>
  );
};
