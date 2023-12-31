import { Tag } from "@chakra-ui/react";

const stateColorMap = new Map([
  ["Pending/Unpaid", "gray"],
  ["Paid", "green"],
  ["Processing", "yellow"],
  ["Shipped", "blue"],
  ["Out for Delivery", "teal"],
  ["Delivered", "cyan"],
  ["Completed", "pink"],
  ["Canceled", "red"],
  ["On Hold", "purple"],
]);

export const colorSelector = (currentState) => {
  return stateColorMap.get(currentState) || "gray";
};

export const OrderStateTag = ({ variant, size, value, ...rest }) => {
  return (
    <Tag
      variant={variant ? variant : "solid"}
      size={size ? size : "sm"}
      colorScheme={colorSelector(value)}
      w={"100%"}
      flex
      justifyContent={"center"}
      alignItems={"center"}
      {...rest}
    >
      {value}
    </Tag>
  );
};
