import { Flex, Text } from "@chakra-ui/react";
import React from "react";

interface HPSelectSlotInterface {
  timeInterval: string;
  index: number;
  isDisabled: boolean;
  onClick: (index: number) => void;
  slot: number;
}

export const HPSelectSlot: React.FC<HPSelectSlotInterface> = ({
  timeInterval,
  index,
  isDisabled,
  onClick,
  slot,
}) => {
  return (
    <Flex
      onClick={() => {
        if (!isDisabled) {
          onClick(index);
        }
      }}
      cursor={isDisabled ? "not-allowed" : "pointer"}
      justifyContent={"center"}
      alignItems={"center"}
      h="36px"
      borderRadius={"full"}
      w="100%"
      bgColor={
        slot === index ? "primary.300" : isDisabled ? "offWhite" : "primary.100"
      }
    >
      <Text
        fontWeight={"semibold"}
        fontSize={"md"}
        color={isDisabled ? "primary.200" : "primary.700"}
        px={2}
      >
        {timeInterval}
      </Text>
    </Flex>
  );
};
