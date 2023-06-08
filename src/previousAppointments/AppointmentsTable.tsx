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
  isForYesterdayAppointments?: boolean;
  onFulfillClick: (id: string) => void;
  onUnfulfillClick: (id: string) => void;
  title: string;
}

export const AppointmentsTable: React.FC<AppointmentsTableInterface> = ({
  appointmentsData,
  isForYesterdayAppointments,
  onFulfillClick,
  onUnfulfillClick,

  title,
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
    <Flex w="100%" h="100%" direction={"column"} pb={4}>
      <Text fontWeight={"bold"} fontSize={"4xl"} color={"primary.600"}>
        {title}
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
            <Th></Th>
          </Tr>
        </Thead>
        {appointmentsData?.length === 0 ? (
          <Tbody>
            <Tr>
              <Td colSpan={9}>
                <Text
                  fontWeight={"semibold"}
                  fontSize={"2xl"}
                  color={"primary.700"}
                  textAlign="center"
                >
                  The medic doesn't have appointments!
                </Text>
              </Td>
            </Tr>
          </Tbody>
        ) : (
          <Tbody>
            {appointmentsData?.map((ap) => {
              return (
                <Tr key={ap.id}>
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
                  {ap.status === "canceled" ? (
                    <>
                      <Td></Td>
                      <Td></Td>
                    </>
                  ) : (
                    <>
                      <Td p={0}>
                        {isForYesterdayAppointments && (
                          <Button
                            onClick={() => onFulfillClick(ap.id)}
                            colorScheme="secondary"
                            borderRadius={20}
                            h={8}
                          >
                            fulfill
                          </Button>
                        )}
                      </Td>
                      <Td p={0}>
                        {isForYesterdayAppointments && (
                          <Button
                            onClick={() => onUnfulfillClick(ap.id)}
                            colorScheme="purple"
                            borderRadius={20}
                            h={8}
                          >
                            unfulfill
                          </Button>
                        )}
                      </Td>
                    </>
                  )}
                </Tr>
              );
            })}
          </Tbody>
        )}
      </Table>
    </Flex>
  );
};
