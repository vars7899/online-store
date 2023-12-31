import {
  Button,
  Divider,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import * as Components from "../";
import { useSearchParams } from "react-router-dom";
import { IconBox, IconCoins, IconMapPin, IconReceipt, IconTruck } from "@tabler/icons-react";
import { DateTime } from "luxon";

export const ReviewOrderDetails = ({ formData, shippingAddressList }) => {
  const currentShippingAddress = shippingAddressList.find((address) => address._id === formData.shippingAddressId);
  const currentBillingAddress = shippingAddressList.find((address) => address._id === formData.shippingAddressId);
  return (
    <div>
      <Components.Order.OrderInformationContainerHeading title={"Review Order"} />
      <Divider my={4} />
      <div className="mb-4">
        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton>
              <div className="w-full">
                <div className="flex items-center justify-start">
                  <IconBox size={28} strokeWidth={1.5} />
                  <p className="ml-2 font-semibold">Order Items</p>
                </div>
              </div>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Table size={"sm"} variant={"simple"}>
                <Thead>
                  <Tr>
                    <Th>No.</Th>
                    <Th>Product Name</Th>
                    <Th>Package Dimension</Th>
                    <Th isNumeric>Qty</Th>
                    <Th isNumeric>Individual Price</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {formData.orderItems.map((item, index) => (
                    <Tr>
                      <Td>{index + 1}</Td>
                      <Td className="capitalize max-w-xs truncate">{item.product.name}</Td>
                      <Td className="grid grid-cols-3 gap-1">
                        <span className="bg-white border-[1.5px] rounded-lg px-2 py-1 text-center">
                          {item.product.dimension.length.toFixed(2)}
                        </span>
                        <span className="bg-white border-[1.5px] rounded-lg px-2 py-1 text-center">
                          {item.product.dimension.width.toFixed(2)}
                        </span>
                        <span className="bg-white border-[1.5px] rounded-lg px-2 py-1 text-center">
                          {item.product.dimension.height.toFixed(2)}
                        </span>
                      </Td>
                      <Td isNumeric>{item.qty}</Td>
                      <Td isNumeric>{item.product.price.toFixed(2)} CAD</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="border-[1.5px] rounded-xl px-6 py-4">
          <div className="flex items-center justify-start">
            <IconMapPin size={28} strokeWidth={1.5} />
            <p className="ml-2 font-semibold">Shipping Address</p>
          </div>
          <Divider my={2} />
          <div>
            <InformationPair title={"name"} value={currentShippingAddress.name} />
            <InformationPair title={"contact Information"} value={currentShippingAddress.contactInformation} />
            <InformationPair title={"street"} value={currentShippingAddress.street} />
            <InformationPair title={"city"} value={currentShippingAddress.city} />
            <InformationPair title={"state"} value={currentShippingAddress.state} />
            <InformationPair title={"country"} value={currentShippingAddress.country} />
            <InformationPair title={"postal code"} value={currentShippingAddress.postalCode} />
          </div>
        </div>
        <div className="border-[1.5px] rounded-xl px-6 py-4">
          <div className="flex items-center justify-start">
            <IconReceipt size={28} strokeWidth={1.5} />
            <p className="ml-2 font-semibold">Billing Address</p>
          </div>
          <Divider my={2} />
          <div>
            <InformationPair title={"name"} value={currentBillingAddress.name} />
            <InformationPair title={"contact Information"} value={currentBillingAddress.contactInformation} />
            <InformationPair title={"street"} value={currentBillingAddress.street} />
            <InformationPair title={"city"} value={currentBillingAddress.city} />
            <InformationPair title={"state"} value={currentBillingAddress.state} />
            <InformationPair title={"country"} value={currentBillingAddress.country} />
            <InformationPair title={"postal code"} value={currentBillingAddress.postalCode} />
          </div>
        </div>
        <div className="border-[1.5px] rounded-xl px-6 py-4">
          <div className="flex items-center justify-start">
            <IconTruck size={28} strokeWidth={1.5} />
            <p className="ml-2 font-semibold">Order Service</p>
          </div>
          <Divider my={2} />
          <div>
            <InformationPair title={"Shipping Method"} value={formData.shippingMethod} />
            <InformationPair title={"Shipping Service Type"} value={formData.shippingServiceType} />
            <InformationPair
              title={"Estimated Delivery"}
              value={DateTime.fromISO(formData.estimatedDeliveryDate).toLocaleString(DateTime.DATE_SHORT)}
            />
          </div>
        </div>
        <div className="border-[1.5px] rounded-xl px-6 py-4">
          <div className="flex items-center justify-start">
            <IconCoins size={28} strokeWidth={1.5} />
            <p className="ml-2 font-semibold">Payment Details</p>
          </div>
          <Divider my={2} />
          <div>
            <InformationPair title={"Payment Method"} value={formData.paymentMethod} />
            <InformationPair title={"current Status"} value={formData.shippingServiceType} />
            <InformationPair
              title={"Requested Timestamp"}
              value={DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const InformationPair = ({ title, value }) => {
  return (
    <div className="flex items-center justify-between text-sm capitalize">
      <p className="mb-1">{title}</p>
      <p>{value}</p>
    </div>
  );
};
