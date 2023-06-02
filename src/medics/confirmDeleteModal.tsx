import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { MedicInterface } from "./types";
import { HPButton } from "../common/HPButton";

interface ConfirmDeleteProps {
  medic: MedicInterface;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteProps> = ({
  medic,
  onConfirm,
  onClose,
}) => {
  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      size={"lg"}
      closeOnOverlayClick={false}
    >
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent borderRadius={20} margin="auto" gap={4} px={4}>
        <ModalHeader>
          <Text fontSize="3xl" color="danger.500">
            CONFIRM DELETE
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize={"xl"} color="danger.200" fontWeight={"semibold"}>
            {`Are you sure you want to delete "${medic.firstName} ${medic.lastName}"? This will also delete all informations about this medic.`}
          </Text>
        </ModalBody>

        <ModalFooter>
          <HPButton
            textColor={"secondary.600"}
            bgColor={"secondary.200"}
            mr={4}
            onClick={onClose}
            w={"90px"}
            _hover={{ bgColor: "secondary.300" }}
          >
            NO
          </HPButton>
          <HPButton colorScheme="danger" w={"90px"} m={0} onClick={onConfirm}>
            YES
          </HPButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
