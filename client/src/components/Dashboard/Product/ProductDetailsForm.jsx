import * as Component from "../../../components";
import { DateTime } from "luxon";
import {
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  Select,
  Switch,
  Tag,
  Textarea,
} from "@chakra-ui/react";
import { IconPhotoUp } from "@tabler/icons-react";

export const ProductDetailsForm = ({ product, categoryList }) => {
  if (!product) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="grid grid-cols-[400px,_1fr] h-[100%] gap-4">
        <div className="bg-slate-50 p-4 rounded-lg">
          <Tag className="capitalize" mb={4} colorScheme="blue" variant={"outline"} isTruncated>
            {product.supplier}
          </Tag>
          <div className="mb-4 rounded-lg flex items-center justify-center">
            <Image src={product.img.url} borderRadius={"lg"} height={"325px"} alt={product.name} objectFit={"cover"} />
          </div>
          <Divider mb={4} />
          <div className="text-sm flex items-center justify-between mb-3">
            <div>Product ID</div>
            <div className="capitalize">{product._id}</div>
          </div>
          <div className="text-sm flex items-center justify-between mb-3">
            <div>Created At</div>
            <div>{DateTime.fromISO(product.createdAt).toLocaleString(DateTime.DATETIME_MED)}</div>
          </div>
          <div className="text-sm flex items-center justify-between mb-3">
            <div>Category ID</div>
            <div>{product.category._id}</div>
          </div>
          <div className="text-sm flex items-center justify-between mb-3">
            <div>Category Name</div>
            <Tag className="capitalize" variant={"outline"} colorScheme="blue" size={"sm"}>
              {product.category.name}
            </Tag>
          </div>
          <div className="text-sm flex items-center justify-between mb-3">
            <div>Category Owner</div>
            <div className="capitalize">
              {product.category.createdBy.firstName} {product.category.createdBy.lastName}
            </div>
          </div>
          <div className="text-sm flex items-center justify-between mb-3">
            <div>Stock Status</div>
            <Tag
              variant={"outline"}
              colorScheme={product.qty <= 0 ? "red" : product.qty > 10 ? "green" : "yellow"}
              flex
              justifyContent={"center"}
              alignItems={"center"}
              wordBreak={"keep-all"}
              size={"sm"}
            >
              {product.qty <= 0 ? "Out Of Stock" : product.qty > 10 ? "Available" : "Low On Stock"}
            </Tag>
          </div>
          <div className="text-sm flex items-center justify-between mb-3">
            <div>Total Sold</div>
            <div className="capitalize">{product.totalSold}</div>
          </div>
        </div>
        <div className="">
          <Component.Default.SettingsPairContainer
            title={"Product Details"}
            desc={
              "Please provide in-depth information about the product distributor, please try to provide as much as details as these specific details published publicly."
            }
          >
            <FormControl isRequired>
              <FormLabel>Product Name</FormLabel>
              <Input type="text" placeholder="Eccent waterproof solenoid valve" value={product.name} />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                type="text"
                placeholder="Brief description about the product"
                minH={"200px"}
                value={product.desc}
              />
              <FormHelperText>Do not exceed 200 character when entering product description</FormHelperText>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Price</FormLabel>
              <Input type="number" placeholder="13.99" value={product.price} />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Category</FormLabel>
              <Select className="capitalize" placeholder="Select option" defaultValue={product.category._id}>
                {categoryList
                  ? categoryList.map((category) => (
                      <option value={category._id} className="capitalize">
                        {category.name}
                      </option>
                    ))
                  : null}
              </Select>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Available Stock Quantity</FormLabel>
              <Input type="number" placeholder="200" value={product.qty} />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Product Image</FormLabel>
              <div
                className="border-[2px] border-dashed rounded-lg min-h-[200px] flex flex-col items-center justify-center cursor-pointer"
                onClick={() => document.querySelector("#image-select").click()}
              >
                <Input type="file" id="image-select" accept="image/*" hidden />
                <IconPhotoUp size={28} className="mb-4 text-slate-300" />
                <p className="cursor-pointer text-slate-300 font-semibold">Click to browse.</p>
              </div>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel htmlFor="is-featured" mb="0">
                Feature this product to increase visibility
              </FormLabel>
              <Switch size={"lg"} id="is-featured" mt={2} isChecked={product.featured} />
              <p>{product.featured}</p>
            </FormControl>
          </Component.Default.SettingsPairContainer>
          <Divider my={4} />
          <Component.Default.SettingsPairContainer
            title={"Supplier Details"}
            desc={
              "Please provide in-depth information about the product supplier, please try to provide as much as details as these specific details published publicly."
            }
          >
            <FormControl isRequired>
              <FormLabel>Supplier Name</FormLabel>
              <Input type="text" placeholder="Eccent Components private limited" value={product?.supplier} />
            </FormControl>
          </Component.Default.SettingsPairContainer>
          <Divider my={4} />
          <Component.Default.SettingsPairContainer
            title={"Package Details"}
            desc={
              "Please provide in-depth information about the package as this information will be used to calculate the shipping price, please try to provide as much as details as these specific details published publicly."
            }
          >
            <div className="grid grid-cols-3 gap-2">
              <FormControl isRequired>
                <FormLabel>Length (In Cm)</FormLabel>
                <Input type="text" placeholder="In centimeter" value={product.dimension.length} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Width (In Cm)</FormLabel>
                <Input type="text" placeholder="In centimeter" value={product.dimension.width} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Height (In Cm)</FormLabel>
                <Input type="text" placeholder="In centimeter" value={product.dimension.height} />
              </FormControl>
            </div>
            <FormControl isRequired mt={4}>
              <FormLabel>Net Weight (In Gm)</FormLabel>
              <Input type="text" placeholder="In grams" value={product.weight} />
            </FormControl>
          </Component.Default.SettingsPairContainer>
        </div>
      </div>
    );
  }
};
