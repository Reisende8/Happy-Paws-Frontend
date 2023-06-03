import { useSteps } from "@chakra-ui/react";
import React from "react";
import { UseAppointment } from "../types";

export const steps = [
  { title: "First Step", description: "Appointment Info" },
  { title: "Second Step", description: "Select Medic " },
  { title: "Third Step", description: "Select Time" },
  { title: "Final Step", description: "Summary" },
];

export const useAppointment: UseAppointment = () => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  return { activeStep, setActiveStep };
};
