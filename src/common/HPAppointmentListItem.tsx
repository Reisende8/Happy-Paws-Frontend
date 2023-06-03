import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { HPButton } from "./HPButton";

import { RecommnendedMedicInterface } from "../appointments/types";

interface HPAppointmenListItemInterface {
  medic: RecommnendedMedicInterface;
  onSelect: () => void;
}

export const HPAppointmentListItem: React.FC<HPAppointmenListItemInterface> = ({
  medic,
  onSelect,
}) => {
  return (
    <Flex
      onClick={() => {}}
      display={"flex"}
      border="1px solid "
      borderColor={"primary.200"}
      borderRadius={100}
      bgColor={"primary.100"}
      mx={10}
      my={2}
      py={1}
      px={5}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Flex direction="column">
        <Text fontWeight={"bold"} fontSize={"sm"} color={"primary.900"}>
          Name:
        </Text>
        <Text fontWeight={"bold"} fontSize={"lg"} color={"primary.700"}>
          {medic.firstName} {medic.lastName}
        </Text>
      </Flex>

      <HPButton
        _hover={{ bgColor: "primary.600" }}
        m={0}
        borderRadius={100}
        w={"120px"}
        h="36px"
        bgColor={"primary.400"}
        textColor={"offWhite"}
        fontSize={"md"}
        onClick={onSelect}
      >
        Select
      </HPButton>
    </Flex>
  );
};
