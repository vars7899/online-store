import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import * as storeActions from "../../redux/thunkActions/storeActions";

export const EditShippingAddressModal = ({ children, givenShippingAddress }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // redux
  const dispatch = useDispatch();
  const { isError, isLoading, isSuccess, message } = useSelector((state) => state.store);
  // form data
  const [shippingAddressDetails, setShippingAddressDetails] = useState(givenShippingAddress);

  const $updateShippingAddressDetails = (e) => {
    const { name, value } = e.target;
    setShippingAddressDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const $clearAndCloseForm = () => {
    // setShippingAddressDetails(null);
    onClose();
  };

  const createNewShippingAddressHandler = (e) => {
    e.preventDefault();
    const { name, contactInformation, street, city, state, country, postalCode } = shippingAddressDetails;

    if (!name || !contactInformation || !street || !city || !state || !country || !postalCode) {
      return toast.error(
        "It appears that one or more required fields are missing from the address form. Please try again"
      );
    }
    dispatch(
      storeActions.UPDATE_SHIPPING_ADDRESS({ addressId: givenShippingAddress._id, formData: shippingAddressDetails })
    );
    $clearAndCloseForm();
  };

  return (
    <>
      {children ? <Box onClick={onOpen}>{children}</Box> : null}

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <p>Edit Address</p>
            <p className="text-sm font-light">
              The address of the property should be given as much detail as possible.
            </p>
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <div className="mb-12">
              <FormControl isRequired mt={2}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={shippingAddressDetails.name}
                  onChange={$updateShippingAddressDetails}
                  placeholder="Jonathan Dawson"
                />
              </FormControl>
              <FormControl isRequired mt={2}>
                <FormLabel>Contact Information</FormLabel>
                <Input
                  type="tel"
                  name="contactInformation"
                  value={shippingAddressDetails.contactInformation}
                  onChange={$updateShippingAddressDetails}
                  placeholder="+16047781923"
                />
                <FormHelperText>We may need to contact you</FormHelperText>
              </FormControl>
              <FormControl isRequired mt={2}>
                <FormLabel>Street</FormLabel>
                <Input
                  type="text"
                  name="street"
                  value={shippingAddressDetails.street}
                  onChange={$updateShippingAddressDetails}
                  placeholder="4280 Pearl Street"
                />
              </FormControl>
              <FormControl mt={2}>
                <FormLabel>Address Line</FormLabel>
                <Textarea
                  name="addressLine"
                  value={shippingAddressDetails.addressLine}
                  onChange={$updateShippingAddressDetails}
                  placeholder="Unit number 345"
                />
              </FormControl>
              <FormControl isRequired mt={2}>
                <FormLabel>City</FormLabel>
                <Input
                  type="text"
                  name="city"
                  value={shippingAddressDetails.city}
                  onChange={$updateShippingAddressDetails}
                  placeholder="Streetsville"
                />
              </FormControl>
              <FormControl isRequired mt={2}>
                <FormLabel>State / Province</FormLabel>
                <Input
                  type="text"
                  name="state"
                  value={shippingAddressDetails.state}
                  onChange={$updateShippingAddressDetails}
                  placeholder="Ontario"
                />
              </FormControl>
              <FormControl isRequired mt={2}>
                <FormLabel>Country</FormLabel>
                <Input
                  type="text"
                  name="country"
                  value={shippingAddressDetails.country}
                  onChange={$updateShippingAddressDetails}
                  placeholder="Canada"
                />
              </FormControl>
              <FormControl isRequired mt={2}>
                <FormLabel>Postal Code</FormLabel>
                <Input
                  type="text"
                  name="postalCode"
                  value={shippingAddressDetails.postalCode}
                  onChange={$updateShippingAddressDetails}
                  placeholder="L5M 1X2"
                />
              </FormControl>
              <FormControl mt={2}>
                <FormLabel>Delivery Instruction</FormLabel>
                <Textarea
                  name="deliveryInstruction"
                  value={shippingAddressDetails.deliveryInstruction}
                  onChange={$updateShippingAddressDetails}
                  placeholder="L5M 1X2"
                />
                <FormHelperText>Let us know your instructions clearly</FormHelperText>
              </FormControl>
            </div>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <div className="flex items-center justify-between w-[100%]">
              <Button colorScheme="gray" variant={"outline"} mr={3} onClick={$clearAndCloseForm}>
                Cancel
              </Button>
              <Button variant="outline" colorScheme="blue" onClick={createNewShippingAddressHandler}>
                Save Changes
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
