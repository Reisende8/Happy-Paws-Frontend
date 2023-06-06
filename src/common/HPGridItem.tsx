import { Badge, Button, Flex, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { HPBadge } from "./HPBadge";
import { specializations, timeIntervals } from "../utils";
import { SummaryAppointmentInterface } from "../appointments/types";

interface HPGridItemInterface {
  appointment: SummaryAppointmentInterface;
  index: number;
  onClick: () => void;
  loadingCancel: boolean;
}

export const HPGridItem: React.FC<HPGridItemInterface> = ({
  appointment,
  index,
  onClick,
  loadingCancel,
}) => {
  const getBadgeColorScheme = () => {
    switch (appointment.status) {
      case "pending":
        return "warning";
      case "fulfilled":
        return "secondary";
      case "canceled":
        return "danger";
      case "unfulfilled":
        return "purple";
    }
  };
  return (
    <GridItem
      borderRadius={30}
      key={appointment.id}
      border="2px solid"
      borderColor="primary.300"
      h={"60vh"}
      w="100%"
      py={3}
      px={5}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Flex gap={3} alignItems={"center"}>
          <Text fontSize={"2xl"} fontWeight={"bold"} color="primary.800">
            Appointment No #{index + 1}
          </Text>
          <Badge
            px={2}
            colorScheme={getBadgeColorScheme()}
            fontSize={"lg"}
            borderRadius={"full"}
          >
            {appointment.status}
          </Badge>
        </Flex>

        {new Date(appointment.date) > new Date() &&
          appointment.status === "pending" && (
            <Button
              _hover={{ bgColor: "danger.500" }}
              m={0}
              borderRadius={100}
              w={"110px"}
              bgColor={"danger.300"}
              textColor={"offWhite"}
              fontSize={"md"}
              onClick={onClick}
              isLoading={loadingCancel}
            >
              Cancel
            </Button>
          )}
      </Flex>
      <Flex direction="column" gap={2} p={2}>
        <Flex w="100%" gap={4}>
          <HPBadge
            label="Appointment Date"
            content={appointment.date.split("T")[0]}
          />
          <HPBadge
            label="Appointment Time"
            content={timeIntervals[appointment.slot]}
          />
        </Flex>
        <Flex w="100%" gap={2}>
          <HPBadge
            label="Animal Age"
            content={appointment.animalAge.toString()}
          />
          <HPBadge label="Animal" content={appointment.animal.name} />
        </Flex>
        <Flex w="100%" gap={2}>
          <HPBadge
            label="Medic Name"
            content={`${appointment.medic.firstName} ${appointment.medic.lastName}`}
          />

          <HPBadge
            label="Estimated Price"
            content={appointment.medic.estimatedPrice.toString()}
          />
        </Flex>
        <HPBadge
          label="Medic Specialization"
          content={
            specializations.filter(
              (sp) => sp.id.toString() === appointment.medic.specializationId
            )[0]?.name as string
          }
        />
        <Flex w="100%" gap={2}>
          <HPBadge label="Clinic Name" content={appointment.clinic.name} />
          <HPBadge
            label="Clinic Phone Number"
            content={appointment.clinic.phoneNumber}
          />
        </Flex>
        <HPBadge label="Clinic Address" content={appointment.clinic.address} />
      </Flex>
    </GridItem>
  );
};
