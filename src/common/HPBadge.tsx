import { Flex, Text } from "@chakra-ui/react";
import React from "react";

interface HPBadgeInterface {
  label: string;
  content: string;
}

export const HPBadge: React.FC<HPBadgeInterface> = ({ label, content }) => {
  return (
    <Flex direction={"column"} w="100%">
      <Text
        fontWeight={"semibold"}
        fontSize={"md"}
        color={"primary.500"}
        px={2}
      >
        {label}
      </Text>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        h="40px"
        borderRadius={100}
        bgColor="primary.200"
      >
        <Text fontWeight={"bold"} fontSize={"lg"} color={"primary.600"}>
          {content}
        </Text>
      </Flex>
    </Flex>
  );
};
