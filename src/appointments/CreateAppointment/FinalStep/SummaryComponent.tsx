import { Flex, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppointmentContext } from "..";
import { HPBadge } from "../../../common/HPBadge";
import { HPButton } from "../../../common/HPButton";
import { timeIntervals } from "../../../utils";

export const SummaryComponent: React.FC = () => {
  const { createdAppointmentData } = useContext(AppointmentContext);
  const navigate = useNavigate();

  return (
    <>
      <Flex
        py={4}
        borderRadius={"20px"}
        height="100%"
        w="100%"
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
        gap={4}
        px={8}
      >
        <Flex
          h="100%"
          w="100%"
          direction={"column"}
          border="2px solid"
          borderColor="primary.200"
          borderRadius={12}
          px={4}
          py={1}
        >
          <Text
            fontWeight={"bold"}
            fontSize={"xl"}
            color={"primary.700"}
            px={2}
            mb={2}
          >
            APPOINTMENT INFO
          </Text>
          <Flex w="100%" gap={4}>
            <HPBadge
              label="Appointment Date"
              content={createdAppointmentData?.date.split("T")[0]}
            />
            <HPBadge
              label="Appointment Time"
              content={timeIntervals[createdAppointmentData.slot]}
            />
          </Flex>
          <Flex w="100%" gap={4}>
            <HPBadge
              label="Animal Age"
              content={createdAppointmentData?.animalAge.toString()}
            />
            <HPBadge
              label="Animal"
              content={createdAppointmentData?.animal.name}
            />
          </Flex>
          <HPBadge
            label="Description"
            content={createdAppointmentData?.description}
          />
        </Flex>
        <Flex
          h="100%"
          w="100%"
          direction={"column"}
          border="2px solid"
          borderColor="primary.200"
          borderRadius={12}
          px={4}
          py={1}
        >
          <Text
            fontWeight={"bold"}
            fontSize={"xl"}
            color={"primary.700"}
            px={2}
            mb={2}
          >
            MEDIC INFO
          </Text>
          <Flex w="100%" gap={4}>
            <HPBadge
              label="First Name"
              content={createdAppointmentData?.medic.firstName}
            />
            <HPBadge
              label="Last Name"
              content={createdAppointmentData?.medic.lastName}
            />
            <HPBadge
              label="Estimated Price"
              content={createdAppointmentData?.medic.estimatedPrice.toString()}
            />
          </Flex>
          <Flex w="100%" gap={4}>
            <HPBadge
              label="Clinic Name"
              content={createdAppointmentData?.clinic.name}
            />
            <HPBadge
              label="Clinic Phone Number"
              content={createdAppointmentData?.clinic.phoneNumber}
            />
          </Flex>
          <HPBadge
            label="Clinic Address"
            content={createdAppointmentData?.clinic.address}
          />
        </Flex>

        <Flex h="100%" w="100%" justifyContent={"center"}>
          <HPButton
            m={0}
            colorScheme="primary"
            onClick={() => navigate("/appointments")}
          >
            Back to My Appointments
          </HPButton>
        </Flex>
      </Flex>
    </>
  );
};
