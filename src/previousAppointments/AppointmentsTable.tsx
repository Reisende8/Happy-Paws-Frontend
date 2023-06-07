import {
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  TableContainer,
  Badge,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { timeIntervals } from "../utils";
import { PreviousAppointmentInterface } from "./types";

interface AppointmentsTableInterface {
  appointmentsData: PreviousAppointmentInterface[];
  isForYesterdayAppointments: boolean;
}

export const AppointmentsTable: React.FC<AppointmentsTableInterface> = ({
  appointmentsData,
  isForYesterdayAppointments,
}) => {
  const getBadgeColorScheme = (status: string) => {
    switch (status) {
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
    <TableContainer>
      <Text fontWeight={"bold"} fontSize={"4xl"} color={"primary.600"} mb={2}>
        {isForYesterdayAppointments
          ? "Yesterday Appointments"
          : "Previous Appointments"}
      </Text>

      <Table variant="striped" colorScheme="primary" bgColor={"offWhite"}>
        <Thead bgColor={"primary.400"}>
          <Tr>
            <Th fontSize={"md"} color={"primary.900"}>
              Client Name
            </Th>
            <Th fontSize={"md"} color={"primary.900"}>
              Phone Number
            </Th>
            <Th fontSize={"md"} color={"primary.900"}>
              Appointment Date
            </Th>
            <Th fontSize={"md"} color={"primary.900"}>
              Appointment Time
            </Th>
            <Th fontSize={"md"} color={"primary.900"}>
              Animal
            </Th>
            <Th fontSize={"md"} color={"primary.900"}>
              Animal Age
            </Th>
            <Th fontSize={"md"} color={"primary.900"}>
              Status
            </Th>
            <Th></Th>
          </Tr>
        </Thead>

        <Tbody>
          {appointmentsData?.map((ap) => {
            return (
              <Tr>
                <Td fontWeight={"semibold"} color="primary.800">
                  {ap.client.firstName} {ap.client.lastName}
                </Td>
                <Td fontWeight={"semibold"} color="primary.800">
                  {ap.client.phoneNumber}
                </Td>
                <Td fontWeight={"semibold"} color="primary.800">
                  {ap.date.split("T")[0]}
                </Td>
                <Td fontWeight={"semibold"} color="primary.800">
                  {timeIntervals[ap.slot]}
                </Td>
                <Td fontWeight={"semibold"} color="primary.800">
                  {ap.animal.name}
                </Td>
                <Td fontWeight={"semibold"} color="primary.800">
                  {ap.animalAge}
                </Td>
                <Td fontWeight={"semibold"} color="primary.800">
                  <Badge
                    px={2}
                    colorScheme={getBadgeColorScheme(ap.status)}
                    fontSize={"sm"}
                    borderRadius={"full"}
                  >
                    {ap.status}
                  </Badge>
                </Td>
                <Td>
                  {isForYesterdayAppointments && (
                    <Button colorScheme="primary" borderRadius={20}>
                      {ap.status === "fulfilled"
                        ? "Mark as unfulfilled"
                        : "fulfilled"}
                    </Button>
                  )}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
