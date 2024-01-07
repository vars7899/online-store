import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
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
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { storeThunkActions as STA } from "../../redux/thunkActions";

export const AddNewShippingAddressModal = ({ children }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const $clearAndCloseForm = () => {
    formik.resetForm();
    onClose();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      contactInformation: "",
      street: "",
      addressLine: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      deliveryInstruction: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      contactInformation: Yup.number().required("Contact Details is required"),
      street: Yup.string().required("Street Address is required"),
      addressLine: Yup.string(),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      country: Yup.string().required("Country is required"),
      postalCode: Yup.string().required("Postal Address is required"),
      deliveryInstruction: Yup.string(),
    }),
    onSubmit: (values) => {
      dispatch(STA.CREATE_NEW_SHIPPING_ADDRESS(values));
      formik.resetForm();
      onClose();
    },
  });

  return (
    <>
      {children ? (
        <Box onClick={onOpen} display={"flex"} alignItems={"center"}>
          {children}
        </Box>
      ) : null}

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <p>New Address</p>
            <p className="text-sm font-light">
              The address of the property should be given as much detail as possible.
            </p>
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <div className="mb-12">
              <FormControl mt={2} isInvalid={formik.errors.name && formik.touched.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  placeholder="Jonathan Dawson"
                />
                <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
              </FormControl>
              <FormControl mt={2} isInvalid={formik.errors.contactInformation && formik.touched.contactInformation}>
                <FormLabel>Contact Information</FormLabel>
                <Input
                  type="number"
                  name="contactInformation"
                  value={formik.values.contactInformation}
                  onChange={formik.handleChange}
                  placeholder="+16047781923"
                />
                <FormHelperText>We may need to contact you</FormHelperText>
                <FormErrorMessage>{formik.errors.contactInformation}</FormErrorMessage>
              </FormControl>
              <FormControl mt={2} isInvalid={formik.errors.street && formik.touched.street}>
                <FormLabel>Street</FormLabel>
                <Input
                  type="text"
                  name="street"
                  value={formik.values.street}
                  onChange={formik.handleChange}
                  placeholder="4280 Pearl Street"
                />
                <FormErrorMessage>{formik.errors.street}</FormErrorMessage>
              </FormControl>
              <FormControl mt={2} isInvalid={formik.errors.addressLine && formik.touched.addressLine}>
                <FormLabel>Address Line</FormLabel>
                <Textarea
                  name="addressLine"
                  value={formik.values.addressLine}
                  onChange={formik.handleChange}
                  placeholder="Unit number 345"
                />
                <FormErrorMessage>{formik.errors.addressLine}</FormErrorMessage>
              </FormControl>
              <FormControl mt={2} isInvalid={formik.errors.city && formik.touched.city}>
                <FormLabel>City</FormLabel>
                <Input
                  type="text"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  placeholder="Streetsville"
                />
                <FormErrorMessage>{formik.errors.city}</FormErrorMessage>
              </FormControl>
              <FormControl mt={2} isInvalid={formik.errors.state && formik.touched.state}>
                <FormLabel>State / Province</FormLabel>
                <Input
                  type="text"
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  placeholder="Ontario"
                />
                <FormErrorMessage>{formik.errors.state}</FormErrorMessage>
              </FormControl>
              <FormControl mt={2} isInvalid={formik.errors.country && formik.touched.country}>
                <FormLabel>Country</FormLabel>
                <Input
                  type="text"
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  placeholder="Canada"
                />
                <FormErrorMessage>{formik.errors.country}</FormErrorMessage>
              </FormControl>
              <FormControl mt={2} isInvalid={formik.errors.postalCode && formik.touched.postalCode}>
                <FormLabel>Postal Code</FormLabel>
                <Input
                  type="text"
                  name="postalCode"
                  value={formik.values.postalCode}
                  onChange={formik.handleChange}
                  placeholder="L5M 1X2"
                />
                <FormErrorMessage>{formik.errors.postalCode}</FormErrorMessage>
              </FormControl>
              <FormControl mt={2}>
                <FormLabel>Delivery Instruction</FormLabel>
                <Textarea
                  name="deliveryInstruction"
                  value={formik.values.deliveryInstruction}
                  onChange={formik.handleChange}
                  placeholder="L5M 1X2"
                />
                <FormHelperText>Let us know your instructions clearly</FormHelperText>
                <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
              </FormControl>
            </div>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <div className="flex items-center justify-between w-[100%]">
              <Button colorScheme="gray" variant={"outline"} mr={3} onClick={$clearAndCloseForm}>
                Cancel
              </Button>
              <Button variant="outline" colorScheme="blue" onClick={formik.handleSubmit}>
                Add New Address
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
