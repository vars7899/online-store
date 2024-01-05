import { Components } from "../../../global";
import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Select,
  Switch,
  Tag,
  Textarea,
} from "@chakra-ui/react";
import { IconFileUpload, IconPhotoUp, IconRestore } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { dashboardThunkActions } from "../../../redux/thunkActions";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export const ProductDetailsForm = ({ categoryList }) => {
  const { selectedProduct: product } = useSelector((state) => state.dashboard);

  if (!product) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <ProductDetailsSection product={product} categoryList={categoryList} />
      </div>
    );
  }
};

const ProductDetailsSection = ({ product, categoryList }) => {
  const dispatch = useDispatch();
  const [newProductImage, setNewProductImage] = useState(null);
  // Form
  const formik = useFormik({
    initialValues: {
      name: product?.name,
      desc: product?.desc,
      price: product?.price,
      category: product?.category._id,
      supplier: product?.supplier,
      qty: product?.qty,
      buyingLimit: product?.buyingLimit,
      length: product?.dimension?.length,
      width: product?.dimension?.width,
      height: product?.dimension?.height,
      featured: product?.featured,
      weight: product?.weight,
    },
    onSubmit: (values) => {
      const productFormData = new FormData();

      productFormData.append("name", values.name);
      productFormData.append("desc", values.desc);
      productFormData.append("category", values.category);
      productFormData.append("price", values.price);
      productFormData.append("qty", values.qty);
      productFormData.append("supplier", values.supplier);
      productFormData.append("length", values.length);
      productFormData.append("width", values.width);
      productFormData.append("height", values.height);
      productFormData.append("weight", values.weight);
      productFormData.append("featured", values.featured);
      productFormData.append("file", newProductImage);

      dispatch(dashboardThunkActions.updateProductDetails({ productId: product._id, formData: productFormData }));
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      desc: Yup.string()
        .required("Product description is required")
        .min(20, "Description length is too small")
        .max(2000, "Do not exceed 2000 character"),
      supplier: Yup.string().required("Supplier name is required"),
      category: Yup.string().required("Product category is required"),
      price: Yup.number().required("Price is required").min(0, "Minimum valid price 0"),
      qty: Yup.number().required("Stock quantity is required").min(0, "Minimum valid quantity 0"),
      height: Yup.number().required("Invalid Height").min(0, "Invalid height"),
      width: Yup.number().required("Invalid Width").min(0, "Invalid width"),
      length: Yup.number().required("Invalid Length").min(0, "Invalid length"),
      weight: Yup.number().required("Invalid Weight").min(0, "Invalid weight"),
      featured: Yup.boolean("Invalid featured value"),
    }),
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
        title={"Product Details"}
        desc={
          "Please provide in-depth information about the product distributor, please try to provide as much as details as these specific details published publicly."
        }
      >
        <FormControl isInvalid={formik.errors.name && formik.touched.name}>
          <FormLabel>Product Name</FormLabel>
          <Input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} fontSize={"sm"} />
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl mt={4} isInvalid={formik.errors.desc && formik.touched.desc}>
          <FormLabel>Description</FormLabel>
          <Textarea
            type="text"
            minH={"100px"}
            name="desc"
            value={formik.values.desc}
            onChange={formik.handleChange}
            fontSize={"sm"}
          />
          <FormErrorMessage>{formik.errors.desc}</FormErrorMessage>
        </FormControl>
        <FormControl mt={4} isInvalid={formik.errors.price && formik.touched.price}>
          <FormLabel>Price</FormLabel>
          <Input
            type="number"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            fontSize={"sm"}
          />
          <FormErrorMessage>{formik.errors.price}</FormErrorMessage>
        </FormControl>
        <FormControl mt={4} isInvalid={formik.errors.category && formik.touched.category}>
          <FormLabel>Category</FormLabel>
          <Select
            className="capitalize"
            placeholder="Select option"
            name="category"
            defaultValue={formik.values.category}
            onChange={formik.handleChange}
            fontSize={"sm"}
          >
            {categoryList
              ? categoryList.map((category) => (
                  <option value={category._id} className="capitalize">
                    {category.name}
                  </option>
                ))
              : null}
          </Select>
          <FormErrorMessage>{formik.errors.category}</FormErrorMessage>
        </FormControl>
        <FormControl mt={4} isInvalid={formik.errors.qty && formik.touched.qty}>
          <FormLabel>Available Stock Quantity</FormLabel>
          <Input type="number" name="qty" value={formik.values.qty} onChange={formik.handleChange} fontSize={"sm"} />
          <FormErrorMessage>{formik.errors.qty}</FormErrorMessage>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Product Image</FormLabel>
          <div
            className="border-[2px] border-dashed rounded-lg min-h-[200px] min-w-[200px] flex flex-col items-center justify-center cursor-pointer p-4"
            onClick={() => document.querySelector("#image-select").click()}
          >
            <Input
              type="file"
              id="image-select"
              accept="image/*"
              hidden
              name="file"
              onChange={(e) => setNewProductImage(e.target.files[0])}
            />
            {newProductImage ? (
              <Image
                src={URL.createObjectURL(newProductImage)}
                alt={newProductImage.name}
                boxSize={"full"}
                maxH={"200"}
                borderRadius={"lg"}
                objectFit={"cover"}
              />
            ) : (
              <>
                <IconPhotoUp size={36} strokeWidth={1.25} className="mb-2 text-slate-300" />
                <p className="cursor-pointer text-slate-300 max-w-[15rem] text-center text-sm">
                  Drag & drop image anywhere or Upload a file
                </p>
              </>
            )}
          </div>
        </FormControl>
        <FormControl mt={4} isInvalid={formik.errors.featured && formik.touched.featured}>
          <FormLabel>Feature this product to increase visibility</FormLabel>
          <Switch size={"md"} name="featured" isChecked={formik.values.featured} onChange={formik.handleChange} />
          <FormErrorMessage>{formik.errors.featured}</FormErrorMessage>
        </FormControl>
      </Components.Default.SettingsPairContainer>
      <Divider my={4} />
      <Components.Default.SettingsPairContainer
        title={"Supplier Details"}
        desc={
          "Please provide in-depth information about the product supplier, please try to provide as much as details as these specific details published publicly."
        }
      >
        <FormControl isInvalid={formik.errors.supplier && formik.touched.supplier}>
          <FormLabel>Supplier Name</FormLabel>
          <Input
            type="text"
            name="supplier"
            value={formik.values.supplier}
            onChange={formik.handleChange}
            fontSize={"sm"}
          />
          <FormErrorMessage>{formik.errors.supplier}</FormErrorMessage>
        </FormControl>
      </Components.Default.SettingsPairContainer>
      <Divider my={4} />
      <Components.Default.SettingsPairContainer
        title={"Package Details"}
        desc={
          "Please provide in-depth information about the package as this information will be used to calculate the shipping price, please try to provide as much as details as these specific details published publicly."
        }
      >
        <div className="grid grid-cols-3 gap-2">
          <FormControl isInvalid={formik.errors.length && formik.touched.length}>
            <FormLabel>Length (In Cm)</FormLabel>
            <Input
              type="number"
              name="length"
              value={formik.values.length}
              onChange={formik.handleChange}
              fontSize={"sm"}
            />
            <FormErrorMessage>{formik.errors.length}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={formik.errors.width && formik.touched.width}>
            <FormLabel>Width (In Cm)</FormLabel>
            <Input
              type="number"
              name="width"
              value={formik.values.width}
              onChange={formik.handleChange}
              fontSize={"sm"}
            />
            <FormErrorMessage>{formik.errors.width}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={formik.errors.height && formik.touched.height}>
            <FormLabel>Height (In Cm)</FormLabel>
            <Input
              type="number"
              name="height"
              value={formik.values.height}
              onChange={formik.handleChange}
              fontSize={"sm"}
            />
            <FormErrorMessage>{formik.errors.height}</FormErrorMessage>
          </FormControl>
        </div>
        <FormControl mt={4} isInvalid={formik.errors.weight && formik.touched.weight}>
          <FormLabel>Net Weight (In Gm)</FormLabel>
          <Input
            type="number"
            name="weight"
            value={formik.values.weight}
            onChange={formik.handleChange}
            fontSize={"sm"}
          />
          <FormErrorMessage>{formik.errors.weight}</FormErrorMessage>
        </FormControl>
      </Components.Default.SettingsPairContainer>
    </form>
  );
};
