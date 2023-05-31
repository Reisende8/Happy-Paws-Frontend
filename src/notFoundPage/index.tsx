import { Flex, Text } from "@chakra-ui/react";
import React from "react";

export const NotFoundPage: React.FC = () => {
  return (
    <Flex
      width={"100%"}
      height="100vh"
      justifyContent={"center"}
      alignItems="center"
    >
      <Flex
        justifyContent={"center"}
        alignItems="center"
        direction="column"
        border="2px solid"
        borderRadius={28}
        bgColor={"primary.100"}
        borderColor={"primary.600"}
        width={"40%"}
        height="40%"
      >
        <Text fontSize={"5xl"} fontWeight="bold" color="primary.600">
          404
        </Text>

        <Text fontSize={"3xl"} fontWeight="bold" color="primary.600">
          Oops!
        </Text>
        <Text
          fontSize={"2xl"}
          fontWeight="bold"
          color="primary.600"
          textAlign={"center"}
        >
          The page you are looking for does not exist.
        </Text>
      </Flex>
    </Flex>
  );
};
