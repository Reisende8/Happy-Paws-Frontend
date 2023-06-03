import React, { useContext } from "react";
import { AppointmentContext } from "..";
import { Flex } from "@chakra-ui/react";
import { HPButton } from "../../../common/HPButton";

export const SelectTimeComponent: React.FC = () => {
  const { activeStep, setActiveStep } = useContext(AppointmentContext);
  return (
    <>
      <Flex
        height="100%"
        w="100%"
        border="2px solid red"
        justifyContent={"center"}
        alignItems={"center"}
      >
        Select Time Component
      </Flex>
      <Flex gap={40} w="100%" justifyContent={"center"}>
        <HPButton
          m={0}
          w="200px"
          colorScheme="primary"
          onClick={() => setActiveStep(activeStep - 1)}
        >
          Prev
        </HPButton>
        <HPButton
          m={0}
          w="200px"
          colorScheme="primary"
          onClick={() => setActiveStep(activeStep + 1)}
        >
          Next
        </HPButton>
      </Flex>
    </>
  );
};
