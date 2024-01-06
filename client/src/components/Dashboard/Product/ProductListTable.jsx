import { IconButton, Tag } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import * as Components from "../../../components";
import { IconCopy, IconExternalLink, IconLink, IconStar, IconStarFilled } from "@tabler/icons-react";
import copy from "copy-text-to-clipboard";
import { useDispatch, useSelector } from "react-redux";
import { RESET_DASHBOARD, UPDATE_PRODUCT_FEATURE_VISIBILITY } from "../../../redux/features/dashboardSlice";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export const ProductListTable = ({ productList }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector((state) => state.dashboard);

  useEffect(() => {
    if (isError) toast.error(message);
    dispatch(RESET_DASHBOARD());
  }, [isError, message, dispatch]);

  const columns = [
    {
      header: " ",
      accessorFn: (row) => ({
        _id: row._id,
        featured: row.featured,
      }),
      cell: (val) => (
        <div className="uppercase underline text-sm">
          {val.getValue().featured ? (
            <IconButton
              isLoading={isLoading}
              size={"sm"}
              variant={"ghost"}
              colorScheme="blue"
              onClick={() => dispatch(UPDATE_PRODUCT_FEATURE_VISIBILITY(val.getValue()._id))}
            >
              <IconStarFilled size={"20"} />
            </IconButton>
          ) : (
            <IconButton
              isLoading={isLoading}
              size={"sm"}
              variant={"ghost"}
              colorScheme="blackAlpha"
              onClick={() => dispatch(UPDATE_PRODUCT_FEATURE_VISIBILITY(val.getValue()._id))}
            >
              <IconStar size={"20"} />
            </IconButton>
          )}
        </div>
      ),
    },
    {
      header: "Product ID",
      accessorFn: (row) => ({
        _id: row._id,
      }),
      cell: (val) => (
        <div
          className="flex items-center justify-between"
          onClick={() => navigate(`/dashboard/products/${val.getValue()._id}`)}
        >
          <p className="uppercase underline text-sm">{val.getValue()._id}</p>
          <IconButton size={"sm"} variant={"ghost"} colorScheme="blue">
            <IconCopy onClick={() => copy(val.getValue()._id)} strokeWidth={1} />
          </IconButton>
        </div>
      ),
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: (val) => <p className="font-medium truncate max-w-xs text-sm">{val.getValue()}</p>,
    },
    {
      header: "",
      accessorKey: "_id",
      cell: (val) => (
        <IconButton size={"sm"} variant={"ghost"} colorScheme="blue">
          <IconExternalLink onClick={() => navigate(`/dashboard/products/${val.getValue()}`)} strokeWidth={1} />
        </IconButton>
      ),
    },
    {
      header: "Status",
      accessorKey: "qty",
      cell: (val) =>
        val.getValue() > 10 ? (
          <Tag
            variant={"solid"}
            colorScheme="green"
            w={"100%"}
            flex
            justifyContent={"center"}
            alignItems={"center"}
            wordBreak={"keep-all"}
            size={"sm"}
          >
            Available
          </Tag>
        ) : val.getValue() <= 0 ? (
          <Tag
            variant={"solid"}
            colorScheme="red"
            w={"100%"}
            flex
            justifyContent={"center"}
            alignItems={"center"}
            whiteSpace={"nowrap"}
            size={"sm"}
          >
            Out of stock
          </Tag>
        ) : (
          <Tag
            variant={"solid"}
            colorScheme="yellow"
            w={"100%"}
            flex
            justifyContent={"center"}
            alignItems={"center"}
            whiteSpace={"nowrap"}
            size={"sm"}
          >
            Low on stock
          </Tag>
        ),
    },
    {
      header: "Supplier",
      accessorKey: "supplier",
      cell: (val) => <p className="max-w-[100px] truncate capitalize font-medium text-sm">{val.getValue()}</p>,
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: (val) => (
        <Tag
          variant={"outline"}
          colorScheme="blue"
          w={"100%"}
          flex
          justifyContent={"center"}
          alignItems={"center"}
          whiteSpace={"nowrap"}
          className="capitalize"
          size={"sm"}
        >
          {val.getValue().name}
        </Tag>
      ),
    },
    {
      header: "Price",
      accessorKey: "price",
      cell: (val) => <p className="font-medium  text-sm">{val.getValue().toFixed(2)}</p>,
    },
    {
      header: "Sold",
      accessorKey: "totalSold",
      cell: (val) => <p className="font-medium  text-sm text-center">{val.getValue()}</p>,
    },
    {
      header: "Stock Qty",
      accessorKey: "qty",
      cell: (val) => (
        <p
          className={`text-center font-medium  text-sm ${
            val.getValue() > 10 ? "text-green-500" : val.getValue() <= 0 ? "text-red-500" : "text-orange-500"
          }`}
        >
          {val.getValue()}
        </p>
      ),
    },
  ];

  if (!productList) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="pt-6">
        <Components.Default.BasicTable data={productList} columns={columns} />
      </div>
    );
  }
};
