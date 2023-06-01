import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { HPButton } from "./HPButton";

interface HPListItemInterface {
  name: string;
}

export const HPListItem: React.FC<HPListItemInterface> = ({ name }) => {
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
        <HPButton
          _hover={{ bgColor: "danger.500" }}
          m={0}
          borderRadius={100}
          w={"90px"}
          bgColor={"danger.300"}
          textColor={"offWhite"}
          fontSize={"md"}
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
        >
          See more details
        </HPButton>
      </Flex>
    </Flex>
  );
};
