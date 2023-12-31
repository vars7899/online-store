import { Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure, Button } from "@chakra-ui/react";
import { IconAlertTriangle } from "@tabler/icons-react";

export const ShippingAddressDeleteConfirmationModal = ({ children, onClick }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? <div onClick={onOpen}>{children}</div> : null}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <div className="flex flex-col items-center justify-center">
              <div className="p-4 bg-red-200 text-red-500 rounded-full my-8">
                <IconAlertTriangle size={40} strokeWidth={1.5} />
              </div>
              <p className="font-semibold text-xl">Are you sure?</p>
              <p className="mt-3 text-center">
                This action cannot be undone. All the values associated with this field will be lost.
              </p>
            </div>
            <div className="flex flex-col my-6">
              <Button
                colorScheme="red"
                mb={2}
                w={"100%"}
                onClick={() => {
                  onClick();
                  onClose();
                }}
                fontWeight={600}
              >
                I Understand, Delete this field
              </Button>
              <Button variant="outline" w={"100%"} onClick={onClose}>
                Cancel
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
