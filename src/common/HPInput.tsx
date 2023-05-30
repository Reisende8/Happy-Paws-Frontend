import { Flex, Input, InputProps, Text } from "@chakra-ui/react";
import React from "react";

interface HPInput extends InputProps {
  error?: string;
  label: string;
}

export const HPInput: React.FC<HPInput> = (props) => {
  const { error, label, ...others } = props;
  return (
    <Flex direction={"column"} width="100%" fontWeight={500} fontSize={"18px"}>
      <Text color={"primary.900"} px={1}>
        {label}
      </Text>
      <Input
        isInvalid={!!error}
        focusBorderColor="secondary.700"
        errorBorderColor={"danger.400"}
        borderColor={"primary.400"}
        w="100%"
        border="2px solid"
        borderRadius={12}
        {...others}
      />
      {!!error && (
        <Text color="danger.400" px={1} fontSize={16}>
          {error}
        </Text>
      )}
    </Flex>
  );
};
