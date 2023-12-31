import { useNavigate } from "react-router-dom";
import { BasicTable } from "../../default";
import { Button, Tag } from "@chakra-ui/react";
import { IconArrowUpRight, IconCircleCheck } from "@tabler/icons-react";

export const UserListTable = ({ isLoading, userList }) => {
  const navigate = useNavigate();
  const columns = [
    {
      header: "Name",
      accessorFn: (row) => ({
        userId: row._id,
        fullName: row.firstName + " " + row.lastName,
      }),
      cell: (val) => (
        <Button
          variant={"link"}
          size={"sm"}
          color="black"
          onClick={() => navigate(`/dashboard/users/${val.getValue().userId}`)}
        >
          <p className="text-sm">{val.getValue().fullName}</p>
        </Button>
      ),
    },
    {
      header: " ",
      accessorKey: "_id",
      cell: (val) => (
        <Button
          variant={"link"}
          size={"sm"}
          color="black"
          onClick={() => navigate(`/dashboard/users/${val.getValue().userId}`)}
        >
          <IconArrowUpRight strokeWidth={1} className="text-orange-500" />
        </Button>
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: (val) => <p className="text-sm">{val.getValue()}</p>,
    },
    {
      header: "Phone",
      accessorKey: "phone",
      cell: (val) => <p className="text-sm">{val.getValue()}</p>,
    },
    {
      header: "Role",
      accessorKey: "role",
      cell: (val) => (
        <Tag
          size={"sm"}
          colorScheme={val.getValue() === "admin" ? "red" : val.getValue() === "customer" ? "yellow" : "gray"}
          textTransform={"uppercase"}
        >
          {val.getValue()}
        </Tag>
      ),
    },
    {
      header: "Verified",
      accessorKey: "isVerified",
      cell: (val) => (
        <div className="flex items-center justify-center">
          <IconCircleCheck className={val.getValue() ? "text-green-500" : "text-gray-200"} />
        </div>
      ),
    },
    {
      header: "Balance",
      accessorFn: (row) => ({
        balance: row.wallet.balance,
      }),
      cell: (val) => <p className="text-sm">{Number(val.getValue().balance).toFixed(2)}</p>,
    },
    {
      header: "Cart Products",
      accessorKey: "cart",
      cell: (val) => (
        <div className="bg-gray-50 flex items-center justify-center rounded-lg text-sm">
          {val.getValue().length ? val.getValue().length : "N/A"}
        </div>
      ),
    },
    {
      header: "Wishlist Products",
      accessorKey: "wishlist",
      cell: (val) => (
        <div className="bg-gray-50 flex items-center justify-center rounded-lg text-sm">
          {val.getValue().length ? val.getValue().length : "N/A"}
        </div>
      ),
    },
    {
      header: "Active Shipping Address",
      accessorKey: "shippingAddress",
      cell: (val) => (
        <div className="bg-gray-50 flex items-center justify-center rounded-lg text-sm">
          {val.getValue().length ? val.getValue().length : "N/A"}
        </div>
      ),
    },
  ];

  if (isLoading && !userList) return <p>Loading...</p>;
  else
    return (
      <div className="my-4">
        <BasicTable data={userList} columns={columns} />
      </div>
    );
};
