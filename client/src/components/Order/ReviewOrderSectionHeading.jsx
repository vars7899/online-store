import { Divider, Button } from "@chakra-ui/react";

export const ReviewOrderSectionHeading = ({ title, onClickAction }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="font-semibold">{title}</div>
        <Button variant={"link"} size={"sm"} colorScheme="blue" onClick={onClickAction}>
          Edit
        </Button>
      </div>
      <Divider mt={3} />
    </>
  );
};
