import { useNavigate } from "react-router-dom";
import { Components } from "../../../global";
import { Button } from "@chakra-ui/react";
import { OrderStateTag } from "../../Order";
import { DateTime } from "luxon";
import { IconAlertTriangle } from "@tabler/icons-react";

export const OrdersListTable = ({ orderList }) => {
  const navigate = useNavigate();

  const columns = [
    {
      header: " ",
      accessorKey: "isUrgent",
      cell: (val) => (
        <IconAlertTriangle strokeWidth={1} className={`${val.getValue() ? "text-red-500" : "text-gray-300"}`} />
      ),
    },
    {
      header: "Order ID",
      accessorKey: "_id",
      cell: (val) => (
        <Button
          variant={"link"}
          size={"sm"}
          color="black"
          className="text-sm uppercase"
          onClick={() => navigate(`/dashboard/orders/${val.getValue()}`)}
        >
          {val.getValue()}
        </Button>
      ),
    },
    {
      header: "Customer",
      accessorFn: (row) => ({
        userId: row.user._id,
        fullName: row.user.firstName + " " + row.user.lastName,
      }),
      cell: (val) => (
        <Button
          variant={"link"}
          size={"sm"}
          color="black"
          onClick={() => navigate(`/dashboard/users/${val.getValue().userId}`)}
        >
          {val.getValue().fullName}
        </Button>
      ),
    },
    {
      header: "Order Status",
      accessorKey: "orderState",
      cell: (val) => <OrderStateTag value={val.getValue()} />,
    },
    {
      header: "Payment Method",
      accessorKey: "paymentMethod",
      cell: (val) => <p className="text-sm capitalize text-center">{val.getValue()}</p>,
    },
    {
      header: "Shipping Method",
      accessorKey: "shippingMethod",
      cell: (val) => <p className="text-sm capitalize text-center">{val.getValue()}</p>,
    },
    {
      header: "Shipping Service",
      accessorKey: "shippingServiceType",
      cell: (val) => <p className="text-sm capitalize text-center">{val.getValue()}</p>,
    },
    {
      header: "Delivery Date",
      accessorKey: "estimatedDeliveryDate",
      cell: (val) => (
        <p className="text-sm capitalize text-center">
          {DateTime.fromISO(val.getValue()).toLocaleString(DateTime.DATE_SHORT)}
        </p>
      ),
    },
    {
      header: "Order Total",
      accessorKey: "bill",
      cell: (val) => <p className="text-sm capitalize text-center">{val.getValue().total.toFixed(2)}</p>,
    },
  ];
  if (!orderList) {
    return <div>Loading...</div>;
  } else
    return (
      <div className="pt-6">
        <Components.Default.BasicTable data={orderList} columns={columns} />
      </div>
    );
};
