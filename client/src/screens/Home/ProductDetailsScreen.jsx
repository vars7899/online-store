import { Button, Divider, IconButton, Image, Progress, Select, Tag } from "@chakra-ui/react";
import * as Layout from "../../layouts";
import * as Component from "../../components";
import { IconChevronLeft, IconHeart, IconShoppingBagPlus, IconUserCircle } from "@tabler/icons-react";
import Rating from "react-rating";
import { useNavigate, useParams } from "react-router-dom";
import ProductImage from "../../assets/p1.png";
import ReactRatingProps from "../../ReactRatingProps";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as storeThunkAction from "../../redux/thunkActions/storeActions";
import * as storeAction from "../../redux/features/storeSlice";
import toast from "react-hot-toast";
import { DateTime } from "luxon";
import ReactPaginate from "react-paginate";

export const ProductDetailsScreen = () => {
  // States
  const [cartQty, setCartQty] = useState(1);
  // Product Id from the params
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedProduct, isLoading, isError, message, cart, wishlist } = useSelector((state) => state.store);

  // Initialize page details
  useEffect(() => {
    if (productId) {
      dispatch(storeThunkAction.GET_STORE_PRODUCT_DETAILS(productId));
    }
    dispatch(storeThunkAction.GET_USER_WISHLIST_DETAILS());
  }, [dispatch]);

  // Handle Error
  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(storeAction.RESET_STORE());
    }
  }, [dispatch, isError, message]);

  // Handle add/remove product to/remove user cart
  const HandleProductUserCartButton = () => {
    if (!productId) return;
    dispatch(storeThunkAction.ADD_PRODUCT_TO_USER_CART({ productId, qty: { qty: cartQty } }));
    setCartQty(1);
  };

  // Handle add/remove product to/from user wishlist
  const HandleProductWishlistButton = () => {
    try {
      if (!productId) return;
      // Check if the product exist in the wishlist remove the product otherwise add the product
      if (wishlist.find((existingProduct) => existingProduct._id === productId)) {
        dispatch(storeThunkAction.REMOVE_PRODUCT_FROM_USER_WISHLIST(productId));
        return;
      }
      dispatch(storeThunkAction.ADD_PRODUCT_TO_USER_WISHLIST(productId));
    } catch (err) {
      return toast.error(err);
    }
  };

  const ReviewData = [
    { name: "5 star", averageRating: 67 },
    { name: "4 star", averageRating: 95 },
    { name: "3 star", averageRating: 7 },
    { name: "2 star", averageRating: 3 },
    { name: "1 star", averageRating: 8 },
  ];
  if (!selectedProduct && isLoading) {
    return <p>Loading....</p>;
  }
  if (selectedProduct)
    return (
      <Layout.Basic>
        <div className="grid grid-cols-[1.5fr,_1fr] my-6 gap-8">
          <div className="bg-gray-50 rounded-2xl p-4 h-full">
            <IconButton
              variant={"outline"}
              icon={<IconChevronLeft className="text-gray-300" />}
              colorScheme="gray"
              onClick={() => navigate(-1)}
              rounded={"full"}
            />
            <div className="mt-2 flex items-center justify-center h-full">
              <Image src={ProductImage} boxSize={500} objectFit={"contain"} />
            </div>
          </div>

          <div>
            <p className="text-lg mb-4 text-yellow-500 capitalize">{selectedProduct.supplier}</p>
            <p className="text-3xl font-semibold tracking-wide my-2">{selectedProduct.name}</p>
            <div className="my-2 flex items-center justify-start">
              <Rating
                initialRating={selectedProduct?.averageRating}
                readonly
                {...ReactRatingProps(20)}
                className="mt-2"
              />
              <p className="ml-2">{selectedProduct?.numReviews} Reviews</p>
            </div>
            <p className="mr-2 text-3xl my-4">{selectedProduct.price.toFixed(2)} CAD</p>
            <Tag px={8} colorScheme={selectedProduct.qty > 10 ? "green" : selectedProduct.qty <= 0 ? "red" : "yellow"}>
              {selectedProduct.qty > 10 ? "In Stock" : selectedProduct.qty <= 0 ? "Out Of Stock" : "Limited Stock"}
            </Tag>
            <Component.Default.CustomBorderLine />
            <p className="text-lg mb-2 font-semibold">Description</p>
            <p className="text-gray-500">{selectedProduct.desc}</p>
            <Component.Default.CustomBorderLine />
            <div className="my-6 grid grid-cols-[85px,_1fr,_1fr] gap-2">
              <Select size={"lg"} onChange={(e) => setCartQty(e.target.value)} value={cartQty}>
                {Array.from({ length: 9 }).map((_, index) => (
                  <option key={`cart-qty-${index}`} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </Select>
              <Button
                colorScheme="brandBlack"
                leftIcon={<IconShoppingBagPlus />}
                size={"lg"}
                onClick={HandleProductUserCartButton}
                isLoading={isLoading}
              >
                Add To Cart
              </Button>
              <Button
                colorScheme={wishlist.find((existingProduct) => existingProduct._id === productId) ? "pink" : "gray"}
                p={2}
                leftIcon={<IconHeart />}
                size={"lg"}
                variant={"outline"}
                onClick={HandleProductWishlistButton}
                isLoading={isLoading}
              >
                {wishlist.find((existingProduct) => existingProduct._id === productId)
                  ? "Remove From Wishlist"
                  : "Save For Later"}
              </Button>
            </div>
            <div className="mt-6">
              <p className="text-lg">Product Details</p>
              <Component.Default.CustomBorderLine />
              <ProductPackageDetailsPair
                productPropertyName={"Available units"}
                propertyValue={selectedProduct?.qty}
                propertyUnit={"nos"}
              />
              <ProductPackageDetailsPair
                productPropertyName={"net weight"}
                propertyValue={selectedProduct?.weight.toFixed(2)}
                propertyUnit={"gm"}
              />
              <ProductPackageDetailsPair
                productPropertyName={"Height"}
                propertyValue={selectedProduct?.dimension?.height.toFixed(2)}
                propertyUnit={"cm"}
              />
              <ProductPackageDetailsPair
                productPropertyName={"width"}
                propertyValue={selectedProduct?.dimension?.width.toFixed(2)}
                propertyUnit={"cm"}
              />
              <ProductPackageDetailsPair
                productPropertyName={"length"}
                propertyValue={selectedProduct?.dimension?.length.toFixed(2)}
                propertyUnit={"cm"}
              />
            </div>
          </div>
        </div>
        <ProductRating product={selectedProduct} />
        <Divider my={6} />
        <ProductReviews
          reviews={[
            ...selectedProduct.reviews,
            ...selectedProduct.reviews,
            ...selectedProduct.reviews,
            ...selectedProduct.reviews,
            ...selectedProduct.reviews,
            ...selectedProduct.reviews,
            ...selectedProduct.reviews,
            ...selectedProduct.reviews,
            ...selectedProduct.reviews,
            ...selectedProduct.reviews,
          ]}
        />

        <div className="text-3xl my-16">
          <p>Related Products</p>
          <Component.Default.CustomBorderLine />
        </div>
      </Layout.Basic>
    );
};

const ProductPackageDetailsPair = ({ productPropertyName, propertyValue, propertyUnit }) => {
  return (
    <div className="flex items-center justify-between my-2 text-gray-500">
      <p className="capitalize">{productPropertyName}</p>
      <p>
        {propertyValue} {propertyUnit}
      </p>
    </div>
  );
};

const ProductRating = ({ product }) => {
  // Here index + 1 is equal to the rating and value is equal to num reviews
  const [typeNumReviews, setTypeNumReviews] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    $calcRatingNumReviews(product.reviews);
  }, [product]);

  function $calcRatingNumReviews(reviews) {
    const reviewRating = reviews.reduce(
      (acc, review) => {
        const rating = review.rating;

        if (rating >= 1 && rating <= 5) {
          acc[rating - 1] += 1;
        }
        return acc;
      },
      [0, 0, 0, 0, 0]
    );

    setTypeNumReviews(reviewRating);
  }

  function $calcPercentageForNumReview(total, totalOfType) {
    return (totalOfType / total) * 100;
  }

  return (
    <div>
      <p className="text-2xl mb-4">Rating & Reviews</p>
      <div className="flex">
        <div className="border-r-[1px] pl-2 pr-20">
          <p>
            <span className="text-4xl font-semibold">{Number(product.averageRating).toFixed(1)}</span>
            <span className="text-gray-400 text-lg ml-1">/ 5</span>
          </p>
          <div className="text-gold my-3">
            <Rating initialRating={product.averageRating} {...ReactRatingProps(28)} readonly />
          </div>
        </div>
        <div className="pl-8">
          {typeNumReviews.map((rate, index) => (
            <div className="text-gold flex items-start justify-start">
              <Rating initialRating={index + 1} {...ReactRatingProps(20)} readonly />
              <Progress
                mt={0.5}
                value={$calcPercentageForNumReview(product.reviews.length, rate)}
                h={"14px"}
                w={"400px"}
                mx={4}
                borderRadius={"full"}
                bg={"blackAlpha.100"}
                colorScheme="blackAlpha"
              />
              <p className="text-gray-400 text-center">{rate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductReviews = ({ reviews }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const REVIEW_PER_PAGE = 4;

  const endOffset = itemOffset + REVIEW_PER_PAGE;
  const currentReviews = reviews.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(reviews.length / REVIEW_PER_PAGE);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * REVIEW_PER_PAGE) % reviews.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="grid grid-cols-[1fr,_400px]">
      <div>
        <div>
          {currentReviews.map((review) => (
            <div className="mb-4 pb-4 border-b-[1px]">
              <div className="flex items-center justify-between text-gold">
                <Rating initialRating={review.rating} {...ReactRatingProps(20)} />
                <p className="text-gray-400">{DateTime.fromISO(review.createdAt).toLocaleString(DateTime.DATE_MED)}</p>
              </div>
              <p className="text-gray-400 my-1">
                {review.user.firstName} {review.user.lastName}
              </p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          {reviews.length > REVIEW_PER_PAGE && (
            <ReactPaginate
              className="paginate"
              activeClassName="paginate-item active-paginate-item"
              breakClassName="paginate-item"
              pageClassName="paginate-item"
              nextClassName="paginate-move-item"
              previousClassName="paginate-move-item"
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
            />
          )}
        </div>
      </div>
    </div>
  );
};
