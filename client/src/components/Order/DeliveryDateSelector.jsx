import { DateTime } from "luxon";
import { useEffect, useState, useMemo } from "react";
import { Components } from "../../global";

export const DeliveryDateSelector = ({ formData, $setter }) => {
  // >> Generate delivery day options along with service type and price
  let dt = useMemo(() => DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }), []);
  const [deliveryDateOptions] = useState(() => [
    { day: dt.plus({ days: 7 }), price: 4.99, type: "express" },
    { day: dt.plus({ days: 8 }), price: 4.99, type: "express" },
    { day: dt.plus({ days: 9 }), price: 2.99, type: "standard" },
    { day: dt.plus({ days: 10 }), price: 2.99, type: "standard" },
    { day: dt.plus({ days: 11 }), price: 0.0, type: "free" },
    { day: dt.plus({ days: 12 }), price: 0.0, type: "free" },
  ]);

  // >> On Mount set deliveryDay option to first option only if not selected already
  useEffect(() => {
    if (deliveryDateOptions.length === 6 && !formData.shippingServiceType && !formData.estimatedDeliveryDate) {
      $setter((prev) => ({
        ...prev,
        shippingServiceType: deliveryDateOptions[0].type,
        estimatedDeliveryDate: deliveryDateOptions[0].day.toISO(),
        shippingCharges: deliveryDateOptions[0].price,
      }));
    }
  }, [formData]);

  // >> handler change in service and delivery day option
  function $updateDeliveryDateAndService(newDeliveryData) {
    $setter((prev) => ({
      ...prev,
      shippingServiceType: newDeliveryData.type,
      estimatedDeliveryDate: newDeliveryData.day.toISO(),
      shippingCharges: newDeliveryData.price,
    }));
  }

  return (
    <div>
      <p className="mb-2">Choose Delivery Day</p>
      <div className="grid grid-cols-1 gap-1">
        {deliveryDateOptions.map((deliveryDate, index) => (
          <Components.Default.SelectionBox
            key={`delivery-date-option-${index}`}
            onClick={() => $updateDeliveryDateAndService(deliveryDate)}
            selected={deliveryDate.day.toISO() === formData.estimatedDeliveryDate}
          >
            <p>{deliveryDate.day.toLocaleString(DateTime.DATE_HUGE)}</p>
            <div className="flex items-center justify-between">
              <p className="text-gray-400 capitalize text-sm">{deliveryDate.type} delivery</p>
              <p className="font-semibold text-sm">{deliveryDate.price.toFixed(2)} CAD</p>
            </div>
          </Components.Default.SelectionBox>
        ))}
      </div>
    </div>
  );
};
