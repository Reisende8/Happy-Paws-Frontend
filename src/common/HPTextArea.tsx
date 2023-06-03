import { Flex, Text, Textarea, TextareaProps } from "@chakra-ui/react";
import React from "react";

interface HPInputProps extends TextareaProps {
  error?: string;
  label: string;
}

export const HPTextArea: React.FC<HPInputProps> = (props) => {
  const { error, label, ...other } = props;
  return (
    <Flex direction={"column"} width="100%" fontWeight={500} fontSize={"18px"}>
      <Text color={"primary.900"} px={1}>
        {label}
      </Text>
      <Textarea
        resize={"none"}
        border={error ? "3px solid" : "2px solid"}
        borderRadius={14}
        colorScheme="primary"
        focusBorderColor="secondary.700"
        borderColor={error ? "danger.400" : "primary.400"}
        width="100%"
        {...other}
      />
      {!!error && (
        <Text color="danger.400" px={1} fontSize={16}>
          {error}
        </Text>
      )}
    </Flex>
  );
};
