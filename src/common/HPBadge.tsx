import { Flex, Text } from "@chakra-ui/react";
import React from "react";

interface HPBadgeInterface {
  color?: string;
  label: string;
  content: string;
  h?: string;
}

export const HPBadge: React.FC<HPBadgeInterface> = ({
  label,
  content,
  color,
  h,
}) => {
  return (
    <Flex direction={"column"} w="100%">
      <Text
        fontWeight={"semibold"}
        fontSize={"md"}
        color={color ? color : "primary.500"}
        px={2}
      >
        {label}
      </Text>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        h={h ? h : "40px"}
        borderRadius={100}
        bgColor={color ? color : "primary.200"}
      >
        <Text
          fontWeight={"bold"}
          fontSize={"lg"}
          color={color ? color : "primary.600"}
        >
          {content}
        </Text>
      </Flex>
    </Flex>
  );
};
