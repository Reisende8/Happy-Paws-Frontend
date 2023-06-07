import { Flex, Spinner, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiClient, authorize } from "../utils/apiClient";
import { PreviousAppointmentInterface } from "./types";

import { AppointmentsTable } from "./AppointmentsTable";

export const PreviousAppointmentsPage: React.FC = () => {
  const toast = useToast();
  const { medicId } = useParams();
  const [yesterdayAppointmentsData, setYesterdayAppointmentsData] =
    useState<PreviousAppointmentInterface[]>();
  const [prevAppointmentsData, setPrevAppointmentsData] =
    useState<PreviousAppointmentInterface[]>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    getPreviousAppointments();
  }, []);

  const getPreviousAppointments = async () => {
    setLoading(true);
    await apiClient
      .get(
        `/api/appointment/medics-previous-appointments/${medicId}`,
        authorize()
      )
      .then((res) => {
        console.log(res.data);
        setYesterdayAppointmentsData(res.data.yesterdayAppointments);
        setPrevAppointmentsData(res.data.previousAppointments);
      })
      .catch((err) => {
        console.error(err);
        return toast({
          title: "ERROR",
          status: "error",
          position: "top-right",
          description: `${err.response.data.message}`,
        });
      });
    setLoading(false);
  };
  return loading ? (
    <Flex w="100vw" h="100vh" justifyContent={"center"} alignItems={"center"}>
      <Spinner size="xl" colorScheme="primary" thickness="4px" />
    </Flex>
  ) : (
    <Flex width="100%" direction="column" h="100%" gap={5}>
      <AppointmentsTable
        appointmentsData={
          yesterdayAppointmentsData as PreviousAppointmentInterface[]
        }
        isForYesterdayAppointments={true}
      />
      <AppointmentsTable
        appointmentsData={
          prevAppointmentsData as PreviousAppointmentInterface[]
        }
        isForYesterdayAppointments={false}
      />
    </Flex>
  );
};
