import { Button, FormControl, FormErrorMessage, FormLabel, Input, Switch } from "@chakra-ui/react";
import { Components } from "../../../global";
import { useFormik } from "formik";
import { IconFileUpload, IconRestore } from "@tabler/icons-react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { dashboardThunkActions as DTA } from "../../../redux/thunkActions";

const DangerSettings = ({ product }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      isActive: product?.isActive,
      buyingLimit: product?.buyingLimit,
    },
    validationSchema: Yup.object({
      isActive: Yup.boolean().required(),
      buyingLimit: Yup.number()
        .required("Buying limit is required")
        .max(9999, "Max buying limit is 9999")
        .min(1, "Min buying limit is 1"),
    }),
    onSubmit: (values) => {
      const productFormData = new FormData();

      productFormData.append("isActive", values.isActive);
      productFormData.append("buyingLimit", values.buyingLimit);

      dispatch(DTA.UPDATE_PRODUCT_DETAILS({ productId: product._id, formData: productFormData }));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex items-center justify-between">
        <p className="uppercase text-gray-400 text-sm">SKU #{product._id}</p>
        <div>
          <Button
            mr={2}
            variant={"outline"}
            leftIcon={<IconRestore strokeWidth={1.5} size={16} />}
            onClick={formik.handleReset}
            size={"sm"}
          >
            Reset
          </Button>
          <Button
            type="submit"
            variant={"outline"}
            leftIcon={<IconFileUpload strokeWidth={1.5} size={16} />}
            size={"sm"}
          >
            Update
          </Button>
        </div>
      </div>
      <Components.Default.SettingsPairContainer
        title={"Product Availability"}
        desc={
          "The product will be discontinued from the catalog, and future orders will no longer be able to purchase it"
        }
      >
        <FormControl>
          <FormLabel>Discontinue Product</FormLabel>
          <Switch name="isActive" onChange={formik.handleChange} isChecked={formik.values.isActive} />
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        <FormControl mt={4} isInvalid={formik.errors.buyingLimit && formik.touched.buyingLimit}>
          <FormLabel>Buying Limit</FormLabel>
          <Input
            type="number"
            name="buyingLimit"
            fontSize={"sm"}
            onChange={formik.handleChange}
            value={formik.values.buyingLimit}
          />
          <FormErrorMessage>{formik.errors.buyingLimit}</FormErrorMessage>
        </FormControl>
      </Components.Default.SettingsPairContainer>
    </form>
  );
};

export default DangerSettings;
