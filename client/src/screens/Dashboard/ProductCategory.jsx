import * as Layout from "../../layouts";
import * as Components from "../../components";
import { Button, Input, Tag } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  GET_ALL_PRODUCT_CATEGORIES,
  RESET_DASHBOARD,
  CREATE_NEW_PRODUCT_CATEGORY,
} from "../../redux/features/dashboardSlice";
import { toast } from "react-hot-toast";

export const ProductCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message, categoryList } = useSelector((state) => state.dashboard);

  const $initPage = () => {
    dispatch(GET_ALL_PRODUCT_CATEGORIES());
  };

  const $handleAddNewCategory = (e) => {
    e.preventDefault();
    if (!categoryName || categoryName.length < 6) {
      return toast.error(
        "Invalid category name, please make sure category name is unique and at least 5 character long."
      );
    }
    dispatch(
      CREATE_NEW_PRODUCT_CATEGORY({
        name: categoryName.toLowerCase(),
      })
    );
    setCategoryName("");
  };

  useEffect(() => {
    $initPage();
  }, []);

  useEffect(() => {
    if (isError) toast.error(message);
    dispatch(RESET_DASHBOARD());
  }, [isError, message, dispatch]);

  return (
    <Layout.Dashboard>
      <Components.Default.BreadCrumbList />
      <Components.Dashboard.PageHeadline
        headline={"Product Categories"}
        desc={
          "In the store product categories section, you can review all product categories with their details. You can view and edit all the product categories. Access to this area is limited. Only administrator can view this section. The changes you make will come to effect immediately."
        }
      />

      <div className="flex items-center mt-2">
        <p className="font-medium">Total Product Categories</p>
        <Tag className="font-semibold ml-2">{categoryList ? categoryList.length : null}</Tag>
      </div>
      <div>
        <form className="flex mt-6" onSubmit={$handleAddNewCategory}>
          <Input
            placeholder="Please enter name of the category"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <Button ml={2} px={8} colorScheme="red" type="submit" isLoading={isLoading}>
            Add Category
          </Button>
        </form>
        <p className="text-sm px-1 py-1 text-black/50">
          Each category must be unique and category name must be at least 5 character long.
        </p>
        <div className="mt-6">
          <Components.Dashboard.Category.ProductCategoryList categoryList={categoryList} />
        </div>
      </div>
    </Layout.Dashboard>
  );
};
