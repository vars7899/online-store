import { useEffect, useState } from "react";
import * as Layout from "../../layouts";
import * as Component from "../../components";
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  Select,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import { IconPhotoUp } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { RESET_DASHBOARD } from "../../redux/features/dashboardSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { dashboardThunkActions as DTA } from "../../redux/thunkActions";

const defaultFormData = {
  name: "",
  desc: "",
  supplier: "",
  categoryId: "",
  price: 0.0,
  qty: 0,
  featured: false,
};
const defaultPackageData = {
  length: 0,
  width: 0,
  height: 0,
  weight: 0,
};
export const AddNewProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryList, isError, message, isSuccess } = useSelector((state) => state.dashboard);
  const [formData, setFormData] = useState(defaultFormData);
  const [packageFormData, setPackageFormData] = useState(defaultPackageData);
  const [productImage, setProductImage] = useState(null);

  const $updateFormData = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const $updatePackageFormData = (e) => {
    const { value, name } = e.target;
    setPackageFormData((prev) => ({ ...prev, [name]: value }));
  };

  const $clearData = () => {
    setFormData(defaultFormData);
    setPackageFormData(defaultPackageData);
    navigate("/dashboard/products");
  };

  const $handleCreateNewProduct = (e) => {
    e.preventDefault();

    const { name, desc, supplier, categoryId, price, qty, featured } = formData;
    const { length, width, height, weight } = packageFormData;

    if (!name || !supplier || !categoryId) {
      return toast.error("Missing one or more required field, Please try again.");
    }
    if (desc.length <= 20 || desc.length > 2000) {
      return toast.error("Please provide a brief description about the product (20 - 2000 characters).");
    }
    if (price <= 0) {
      return toast.error("Price cannot be 0 or negative, Please provide valid product price.");
    }
    if (qty < 0) {
      return toast.error("Stock quantity cannot be less than 0");
    }
    if (!length || !width || !height || !weight) {
      return toast.error(
        "Missing one or more Package details. Make sure all the details are precise as these are use to calculate the shipping charges."
      );
    }
    if (!productImage || !productImage.name) {
      return toast.error("Missing product image, please add product image to proceed.");
    }
    const newProductDetails = new FormData();
    newProductDetails.append("name", name);
    newProductDetails.append("desc", desc);
    newProductDetails.append("categoryId", categoryId);
    newProductDetails.append("price", price);
    newProductDetails.append("qty", qty);
    newProductDetails.append("supplier", supplier);
    newProductDetails.append("featured", featured);
    newProductDetails.append("length", length);
    newProductDetails.append("width", width);
    newProductDetails.append("height", height);
    newProductDetails.append("weight", weight);
    newProductDetails.append("file", productImage);
    dispatch(DTA.CREATE_NEW_PRODUCT(newProductDetails));
    navigate("/dashboard/products");
  };

  const $initPage = () => {
    dispatch(DTA.GET_ALL_PRODUCT_CATEGORIES());
  };

  useEffect(() => {
    $initPage();
  }, []);

  useEffect(() => {
    if (isError) toast.error(message);
    dispatch(RESET_DASHBOARD());
  }, [isError, message, dispatch]);

  console.log(productImage);

  return (
    <Layout.Dashboard>
      <form onSubmit={$handleCreateNewProduct}>
        <Component.Default.SettingsPairContainer
          title={"Product Details"}
          desc={
            "Please provide in-depth information about the product, please try to provide as much as details as these specific details published publicly."
          }
        >
          <FormControl>
            <FormLabel>Product Name</FormLabel>
            <Input
              type="text"
              placeholder="Eccent waterproof solenoid valve"
              name="name"
              value={formData.name}
              onChange={$updateFormData}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              type="text"
              placeholder="Brief description about the product"
              minH={"200px"}
              name="desc"
              value={formData.desc}
              onChange={$updateFormData}
            />
            <FormHelperText>Do not exceed 200 character when entering product description</FormHelperText>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Category</FormLabel>
            <Select
              className="capitalize"
              placeholder="Select product category"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  categoryId: e.target.value,
                }))
              }
            >
              {categoryList
                ? categoryList.map((category) => (
                    <option value={category._id} className="capitalize">
                      {category.name}
                    </option>
                  ))
                : null}
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Price</FormLabel>
            <Input type="number" placeholder="13.99" name="price" value={formData.price} onChange={$updateFormData} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Available Stock Quantity</FormLabel>
            <Input type="number" placeholder="200" name="qty" min={0} value={formData.qty} onChange={$updateFormData} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Product Image</FormLabel>
            <div className="flex items-center justify-start">
              <div
                className="border-[2px] border-dashed rounded-lg h-[200px] w-[300px] flex flex-col items-center justify-center cursor-pointer mr-4"
                onClick={() => document.querySelector("#image-select").click()}
              >
                <Input
                  type="file"
                  id="image-select"
                  accept="image/*"
                  hidden
                  onChange={(e) => setProductImage(e.target.files[0])}
                />
                <IconPhotoUp size={28} className="mb-4 text-slate-300" />
                <p className="cursor-pointer text-slate-300 font-semibold">Click to browse & select.</p>
              </div>
              <div>
                {productImage ? (
                  <Image
                    src={URL.createObjectURL(productImage)}
                    alt={productImage.name}
                    boxSize={200}
                    borderRadius={"lg"}
                    objectFit={"cover"}
                  />
                ) : null}
              </div>
            </div>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="is-featured" mb="0">
              Feature this product to increase visibility
            </FormLabel>
            <Switch
              size={"lg"}
              id="is-featured"
              mt={2}
              defaultChecked={formData.featured}
              onChange={() => setFormData((prev) => ({ ...prev, featured: !prev.featured }))}
            />
          </FormControl>
        </Component.Default.SettingsPairContainer>
        <Divider my={4} />
        <Component.Default.SettingsPairContainer
          title={"Supplier Details"}
          desc={
            "Please provide in-depth information about the product supplier, please try to provide as much as details as these specific details published publicly."
          }
        >
          <FormControl>
            <FormLabel>Supplier Name</FormLabel>
            <Input
              type="text"
              placeholder="Eccent Components private limited"
              name="supplier"
              value={formData.supplier}
              onChange={$updateFormData}
            />
          </FormControl>
        </Component.Default.SettingsPairContainer>
        <Divider my={4} />
        <Component.Default.SettingsPairContainer
          title={"Package Details"}
          desc={
            "Please provide in-depth information about the product package, please try to provide as much as details as these specific details published publicly are these details are used to calculate the shipping charges for the product."
          }
        >
          <div className="grid grid-cols-3 gap-2">
            <FormControl>
              <FormLabel>Length (cm)</FormLabel>
              <Input
                type="number"
                placeholder="In centimeter"
                name="length"
                value={packageFormData.length}
                onChange={$updatePackageFormData}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Width (cm)</FormLabel>
              <Input
                type="number"
                placeholder="In centimeter"
                name="width"
                value={packageFormData.width}
                onChange={$updatePackageFormData}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Height (cm)</FormLabel>
              <Input
                type="number"
                placeholder="In centimeter"
                name="height"
                value={packageFormData.height}
                onChange={$updatePackageFormData}
              />
            </FormControl>
          </div>
          <FormControl mt={4}>
            <FormLabel>Net Weight (gm)</FormLabel>
            <Input
              type="number"
              placeholder="In grams"
              name="weight"
              value={packageFormData.weight}
              onChange={$updatePackageFormData}
            />
          </FormControl>
        </Component.Default.SettingsPairContainer>
        <Divider my={8} />
        <div className="flex items-center justify-end">
          <Button variant={"outline"} onClick={$clearData}>
            Cancel
          </Button>
          <Button colorScheme="blue" ml={4} type="submit">
            Add Product
          </Button>
        </div>
      </form>
    </Layout.Dashboard>
  );
};
