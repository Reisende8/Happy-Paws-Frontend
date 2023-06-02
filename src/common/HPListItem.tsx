import { Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { HPButton } from "./HPButton";
import { MedicInterface } from "../medics/types";
import { ConfirmDeleteModal } from "../medics/confirmDeleteModal";

interface HPListItemInterface {
  medic: MedicInterface;
  name: string;
  onDelete: (medic: MedicInterface) => Promise<void>;
  onMoreDetailsClick: () => void;
}

export const HPListItem: React.FC<HPListItemInterface> = ({
  medic,
  name,
  onDelete,
  onMoreDetailsClick,
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const handleDelete = async () => {
    await onDelete(medic);
    setDeleteModalOpen(false);
  };

  return (
    <Flex
      onClick={() => {}}
      display={"flex"}
      border="1px solid "
      borderColor={"primary.200"}
      borderRadius={100}
      bgColor={"primary.100"}
      mx={20}
      my={2}
      py={2}
      px={5}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Flex direction="column">
        <Text fontWeight={"bold"} fontSize={"sm"} color={"primary.900"}>
          Name:
        </Text>
        <Text fontWeight={"bold"} fontSize={"xl"} color={"primary.700"}>
          {name}
        </Text>
      </Flex>

      <Flex gap={2}>
        {deleteModalOpen && (
          <ConfirmDeleteModal
            medic={medic}
            onConfirm={handleDelete}
            onClose={() => {
              setDeleteModalOpen(false);
            }}
          />
        )}
        <HPButton
          _hover={{ bgColor: "danger.500" }}
          m={0}
          borderRadius={100}
          w={"90px"}
          bgColor={"danger.300"}
          textColor={"offWhite"}
          fontSize={"md"}
          onClick={() => {
            setDeleteModalOpen(true);
          }}
        >
          Delete
        </HPButton>
        <HPButton
          _hover={{ bgColor: "primary.600" }}
          m={0}
          borderRadius={100}
          w={"170px"}
          bgColor={"primary.400"}
          textColor={"offWhite"}
          fontSize={"md"}
          onClick={onMoreDetailsClick}
        >
          See more details
        </HPButton>
      </Flex>
    </Flex>
  );
};
