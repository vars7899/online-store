import { Image } from "@chakra-ui/react";
import { IconArrowUpRight } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-neutral-100 p-6 cursor-pointer flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-center">
          <Image src={product.img.url} boxSize="300" objectFit={"contain"} />
        </div>
        <p className="text-xs uppercase my-1 text-neutral-400 rounded-full whitespace-nowrap w-min truncate">
          {product.supplier}
        </p>
        <p className="mt-4 capitalize">{product.name}</p>
      </div>

      <motion.div
        className="mt-6 px-6 py-4 text-neutral-500 border-2 border-dashed border-neutral-300 flex items-center justify-between rounded-full text-sm w-fit"
        initial={{ width: "50%" }}
        whileHover={{ width: "100%" }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate(`/components/${product?._id}`)}
      >
        <p className="tracking-wide mr-2 whitespace-nowrap">View Details</p>
        <IconArrowUpRight strokeWidth={1} />
      </motion.div>
    </div>
  );
};

export default ProductCard;
