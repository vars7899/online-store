import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Divider,
  Checkbox,
  CheckboxGroup,
  VStack,
} from "@chakra-ui/react";

const filterOptionsArray = [
  {
    type: "order status",
    options: [
      "all",
      "Pending/Unpaid",
      "Paid",
      "Processing",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Completed",
      "Canceled",
      "On Hold",
    ],
  },
  {
    type: "payment method",
    options: ["all", "cash on delivery", "credit card", "wallet"],
  },
  {
    type: "shipping method",
    options: ["all", "delivery", "pickup"],
  },
  {
    type: "shipping service",
    options: ["all", "express", "standard", "free"],
  },
];

export const OrderFilterSideBar = ({ children, orderFilter, setOrderFilter, $updateAction }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div onClick={onOpen}>{children ? children : null}</div>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"sm"}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Filter Order List</DrawerHeader>
            <Divider />
            <DrawerBody>
              <RenderFilterOption
                title={filterOptionsArray[0].type}
                options={filterOptionsArray[0].options}
                value={orderFilter.orderState}
                $setter={(e) => {
                  // !! Here we are getting the last choice from the checkbox list
                  setOrderFilter((prev) => ({ ...prev, orderState: e[e.length - 1] }));
                }}
              />
              <RenderFilterOption
                title={filterOptionsArray[1].type}
                options={filterOptionsArray[1].options}
                value={orderFilter.paymentMethod}
                $setter={(e) => {
                  // !! Here we are getting the last choice from the checkbox list
                  setOrderFilter((prev) => ({ ...prev, paymentMethod: e[e.length - 1] }));
                }}
              />
              <RenderFilterOption
                title={filterOptionsArray[2].type}
                options={filterOptionsArray[2].options}
                value={orderFilter.shippingMethod}
                $setter={(e) => {
                  // !! Here we are getting the last choice from the checkbox list
                  setOrderFilter((prev) => ({ ...prev, shippingMethod: e[e.length - 1] }));
                }}
              />
              <RenderFilterOption
                title={filterOptionsArray[3].type}
                options={filterOptionsArray[3].options}
                value={orderFilter.shippingServiceType}
                $setter={(e) => {
                  // !! Here we are getting the last choice from the checkbox list
                  setOrderFilter((prev) => ({ ...prev, shippingServiceType: e[e.length - 1] }));
                }}
              />
            </DrawerBody>
            <Divider />
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="accent"
                onClick={() => {
                  $updateAction();
                  onClose();
                }}
              >
                Update
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

const RenderFilterOption = ({ title, options, value, $setter }) => {
  return (
    <div className="mb-4">
      <p className="uppercase font-semibold text-sm mb-2">{title}</p>
      <div className="border-[1.5px] px-4 py-2 rounded-xl">
        {options.map((option, childIndex) => (
          <CheckboxGroup key={`option-${childIndex}`} onChange={$setter} value={value}>
            <VStack align="stretch" spacing={6}>
              <Checkbox value={option} colorScheme="accent">
                <p className="ml-2 capitalize">{option}</p>
              </Checkbox>
            </VStack>
          </CheckboxGroup>
        ))}
      </div>
    </div>
  );
};
