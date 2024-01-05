export const validateProductDetails = (productDetails, packageDetails) => {
  const { name, desc, supplier, categoryId, price, qty } = productDetails;
  const { length, width, height, weight } = packageFormData;

  const validationRules = [
    { condition: !name || !supplier || !categoryId, message: "Missing one or more required fields. Please try again." },
    {
      condition: desc.length <= 20 || desc.length > 2000,
      message: "Please provide a brief description about the product (20 - 2000 characters).",
    },
    { condition: price <= 0, message: "Price cannot be 0 or negative. Please provide a valid product price." },
    { condition: qty < 0, message: "Stock quantity cannot be less than 0." },
    {
      condition: !length || !width || !height || !weight,
      message:
        "Missing one or more package details. Make sure all the details are precise as these are used to calculate the shipping charges.",
    },
  ];

  const validationFailure = validationRules.find((rule) => rule.condition);

  if (validationFailure) {
    return toast.error(validationFailure.message);
  }

  // If all validations pass, return null (indicating success)
  return null;

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
};
