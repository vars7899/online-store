import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Divider,
  Image,
  Center,
  FormControl,
  FormLabel,
  Textarea,
  Stack,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import Rating from "react-rating";
import ReactRatingProps from "../../ReactRatingProps";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { storeThunkActions } from "../../redux/thunkActions";

const defaultReviewData = {
  rating: 0,
  comment: null,
  wouldRecommend: true,
};

const ReviewModal = ({ children, item }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const [reviewData, setReviewData] = useState(defaultReviewData);

  function $submitReview() {
    const { rating, comment, wouldRecommend } = reviewData;

    if (!comment || !wouldRecommend) {
      return toast.error("Missing one or more required field(s). Please try again");
    }
    if (!rating) {
      return toast.error("Minimum rating of 1 is valid");
    }

    dispatch(storeThunkActions.CREATE_PRODUCT_REVIEW({ productId: item.product._id, formData: reviewData }));
    $clearForm();
  }

  function $clearForm() {
    setReviewData(defaultReviewData);
    onClose();
  }

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <p>Leave a Review</p>
          </ModalHeader>
          <ModalCloseButton mt={2} />
          <Divider />
          <ModalBody>
            <Center py={6} bg={"gray.100"} borderRadius={"lg"} mb={4}>
              <Image src={item.product.img.url} boxSize={200} objectFit={"contain"} />
            </Center>
            <p className="text-sm font-medium">{item.product.name}</p>
            <div className="my-4">
              <FormControl mb={2}>
                <FormLabel>Rating</FormLabel>
                <div className="!text-gold flex justify-between">
                  <Rating
                    {...ReactRatingProps(32)}
                    initialRating={reviewData.rating}
                    onChange={(rating) => setReviewData((prev) => ({ ...prev, rating: rating }))}
                  />
                  <p className="text-gray-400">{reviewData.rating} / 5</p>
                </div>
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Comment</FormLabel>
                <Textarea
                  placeholder="Share details about your experience with this product"
                  onChange={(e) => setReviewData((prev) => ({ ...prev, comment: e.target.value }))}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Would you recommend this product</FormLabel>
                <RadioGroup
                  onChange={(opt) => setReviewData((prev) => ({ ...prev, wouldRecommend: opt }))}
                  value={reviewData.wouldRecommend}
                >
                  <Stack direction="row">
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" variant={"outline"} mr={3} onClick={$clearForm}>
              Cancel
            </Button>
            <Button colorScheme={"blue"} variant={"outline"} onClick={$submitReview}>
              Submit Review
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReviewModal;
