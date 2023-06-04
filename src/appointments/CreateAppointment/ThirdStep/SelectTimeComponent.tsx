import React, { useContext, useEffect, useState } from "react";
import { AppointmentContext } from "..";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { HPButton } from "../../../common/HPButton";
import { HPBadge } from "../../../common/HPBadge";
import { specializations, timeIntervals } from "../../../utils";
import { AppointmentErrorInterface } from "../../types";
import { HPSelectSlot } from "../../../common/HPSelectSlot";

export const SelectTimeComponent: React.FC = () => {
  const {
    activeStep,
    setActiveStep,
    appointmentData,
    setAppointmentData,
    appointmentErrors,
    setAppointmentErrors,
    selectedMedicInfo,
    createAppointment,
    loading,
  } = useContext(AppointmentContext);

  const handleSelectTimeClick = (index: number) => {
    setAppointmentData({
      ...appointmentData,
      slot: index,
    });
  };

  const handleAppointmentErrors = () => {
    const errors: AppointmentErrorInterface = {
      dateError: "",
      descriptionError: "",
      specializationError: "",
      animalAgeError: "",
      animalError: "",
      veterinarianError: "",
      slotError: "",
    };

    if (appointmentData.slot === -1) {
      errors.slotError = "This select is required!";
    }

    return errors;
  };

  const handleFinishAppointmentClick = () => {
    const errors = handleAppointmentErrors();
    if (errors.slotError === "") {
      createAppointment(appointmentData);
    }
    setAppointmentErrors(errors);
  };

  return (
    <Flex
      my={4}
      py={3}
      borderRadius={"20px"}
      height="100%"
      w="100%"
      justifyContent={"center"}
      alignItems={"center"}
      direction={"column"}
      gap={4}
      px={8}
    >
      <Flex w="100%" gap={4}>
        <HPBadge
          label="First Name"
          content={selectedMedicInfo.firstName}
          h={"30px"}
        />
        <HPBadge
          label="Last Name"
          content={selectedMedicInfo.lastName}
          h={"30px"}
        />
        <HPBadge
          label="Medic Specialization"
          content={
            specializations.filter(
              (sp) => sp.id.toString() === selectedMedicInfo?.specializationId
            )[0]?.name as string
          }
          h={"30px"}
        />
      </Flex>
      <Flex w="100%" gap={4}>
        <HPBadge
          label="Estimated Price"
          content={selectedMedicInfo?.estimatedPrice.toString() as string}
          h={"30px"}
        />
        <HPBadge
          label="Animals"
          content={
            selectedMedicInfo?.animals
              .map((animal) => animal.name)
              .toString() as string
          }
          h={"30px"}
        />
      </Flex>
      <Flex w="100%" gap={4}>
        <HPBadge
          label="Clinic Name"
          content={selectedMedicInfo?.clinic.name}
          h={"30px"}
        />
        <HPBadge
          label="Clinic Phone Number"
          content={selectedMedicInfo?.clinic.phoneNumber}
          h={"30px"}
        />
      </Flex>
      <HPBadge
        label="Clinic Address"
        content={selectedMedicInfo?.clinic.address}
        h={"30px"}
      />

      <Flex
        w="100%"
        my={2}
        direction={"column"}
        gap={2}
        border="2px solid"
        borderColor="primary.200"
        borderRadius={12}
        p={3}
      >
        <Text
          fontWeight={"semibold"}
          fontSize={"lg"}
          color={"primary.500"}
          px={2}
        >
          Select free time interval:
        </Text>
        <Flex w="100%" gap={4}>
          {timeIntervals.map((interval, index) => {
            return (
              <HPSelectSlot
                key={index}
                timeInterval={interval}
                index={index}
                isDisabled={selectedMedicInfo.takenSlots.includes(index)}
                onClick={handleSelectTimeClick}
                slot={appointmentData.slot}
              />
            );
          })}
        </Flex>
        {!!appointmentErrors.slotError && (
          <Text color="danger.400" px={1} fontSize={16} fontWeight={"semibold"}>
            {appointmentErrors.slotError}
          </Text>
        )}
      </Flex>
      <Flex gap={8} w="100%">
        <HPButton m={0} onClick={() => setActiveStep(activeStep - 1)}>
          Previous
        </HPButton>
        <HPButton
          m={0}
          onClick={handleFinishAppointmentClick}
          isLoading={loading}
        >
          Finish Appointment
        </HPButton>
      </Flex>
    </Flex>
  );
};
