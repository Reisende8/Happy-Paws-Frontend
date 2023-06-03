import { Flex, Select, SelectProps, Text } from "@chakra-ui/react";
import React from "react";
import { AnimalInterface, SpecializationInterface } from "../medics/types";

interface SelectInterface extends SelectProps {
  options: SpecializationInterface[] | AnimalInterface[];
  error?: string;
  label: string;
}

export const HPSelect: React.FC<SelectInterface> = (props) => {
  const { options, error, label, ...others } = props;
  return (
    <Flex direction={"column"} width="100%" fontWeight={500} fontSize={"18px"}>
      <Text color={"primary.900"} px={1}>
        {label}
      </Text>
      <Select
        border="2px solid"
        focusBorderColor="secondary.700"
        errorBorderColor={"danger.400"}
        borderColor={"primary.400"}
        w="100%"
        borderRadius={20}
        {...others}
      >
        {options.map((options) => {
          return (
            <option value={options.id} key={options.id}>
              {options.name}
            </option>
          );
        })}
      </Select>
      {!!error && (
        <Text color="danger.400" px={1} fontSize={16}>
          {error}
        </Text>
      )}
    </Flex>
  );
};
