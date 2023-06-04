import {
  Box,
  Flex,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { AppointmentContext } from ".";
import { SummaryComponent } from "./FinalStep/SummaryComponent";
import { AppointmentInfoComponent } from "./FirstStep/AppointmentInfoComponent";
import { SelectMedicComponent } from "./SecondStep/SelectMedicComponent";
import { SelectTimeComponent } from "./ThirdStep/SelectTimeComponent";
import { steps } from "./useAppointment";

export const CreateAppointmentComponent: React.FC = () => {
  const { activeStep } = useContext(AppointmentContext);

  const renderPage = () => {
    switch (activeStep) {
      case 0:
        return <AppointmentInfoComponent />;
      case 1:
        return <SelectMedicComponent />;
      case 2:
        return <SelectTimeComponent />;
      case 3:
        return <SummaryComponent />;
    }
  };

  return (
    <Flex w="60%" h="100%" direction="column" alignItems={"center"} gap={3}>
      <Stepper size="lg" index={activeStep} w="100%" colorScheme="primary">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <Flex
        height="100%"
        w="100%"
        minW={"700px"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Flex
          height="100%"
          w="100%"
          border="3px solid"
          borderRadius="20px"
          borderColor="primary.200"
          justifyContent={"center"}
          alignItems={"center"}
          direction={"column"}
        >
          {renderPage()}
        </Flex>
      </Flex>
    </Flex>
  );
};
