import React, { useContext } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import { HPButton } from "../../common/HPButton";
import { HPInput } from "../../common/HPInput";
import { steps } from "./useAppointment";
import { AppointmentContext } from ".";
import { AppointmentInfoComponent } from "./FirstStep/AppointmentInfoComponent";
import { SelectMedicComponent } from "./SecondStep/SelectMedicComponent";
import { SelectTimeComponent } from "./ThirdStep/SelectTimeComponent";
import { SummaryComponent } from "./FinalStep/SummaryComponent";

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
      {/* <Text fontWeight={"bold"} fontSize={"4xl"} color={"primary.700"}>
        Create Appointment
      </Text> */}
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
        {renderPage()}
      </Flex>
    </Flex>
  );
};
