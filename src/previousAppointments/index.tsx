import { Flex, Spinner, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiClient, authorize } from "../utils/apiClient";
import { PreviousAppointmentInterface } from "./types";

import { AppointmentsTable } from "./AppointmentsTable";

export const PreviousAppointmentsPage: React.FC = () => {
  const toast = useToast();
  const { medicId } = useParams();
  const [todayAppointmentsData, setTodayAppointmentsData] =
    useState<PreviousAppointmentInterface[]>();
  const [yesterdayAppointmentsData, setYesterdayAppointmentsData] =
    useState<PreviousAppointmentInterface[]>();
  const [prevAppointmentsData, setPrevAppointmentsData] =
    useState<PreviousAppointmentInterface[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingFulfill, setLoadingFulfill] = useState<boolean>(false);
  const [loadingUnfulfill, setLoadingUnfulfill] = useState<boolean>(false);
  useEffect(() => {
    getPreviousAppointments();
  }, []);

  const getPreviousAppointments = async () => {
    setLoading(true);
    await apiClient
      .get(`/api/appointment/medics-appointments/${medicId}`, authorize())
      .then((res) => {
        setTodayAppointmentsData(res.data.todayAppointments);
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

  const fulfillAppointment = async (appointmentId: string) => {
    setLoadingFulfill(true);
    await apiClient
      .get(`/api/appointment/fulfill-appointment/${appointmentId}`, authorize())
      .then((res) => {
        setYesterdayAppointmentsData(
          yesterdayAppointmentsData?.map((ap) => {
            if (ap.id === appointmentId) {
              return { ...ap, status: "fulfilled" };
            } else {
              return { ...ap };
            }
          })
        );
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
    setLoadingFulfill(false);
  };

  const unfulfillAppointment = async (appointmentId: string) => {
    setLoadingUnfulfill(true);
    await apiClient
      .get(
        `/api/appointment/unfulfill-appointment/${appointmentId}`,
        authorize()
      )
      .then((res) => {
        setYesterdayAppointmentsData(
          yesterdayAppointmentsData?.map((ap) => {
            if (ap.id === appointmentId) {
              return { ...ap, status: "unfulfilled" };
            } else {
              return { ...ap };
            }
          })
        );
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
    setLoadingUnfulfill(false);
  };

  return loading ? (
    <Flex w="100vw" h="100vh" justifyContent={"center"} alignItems={"center"}>
      <Spinner size="xl" colorScheme="primary" thickness="4px" />
    </Flex>
  ) : (
    <Flex w="100%" h="100%" direction="column" gap={5}>
      <AppointmentsTable
        title={"Yesterday Appointments"}
        onFulfillClick={fulfillAppointment}
        onUnfulfillClick={unfulfillAppointment}
        appointmentsData={
          yesterdayAppointmentsData as PreviousAppointmentInterface[]
        }
        isForYesterdayAppointments={true}
      />
      <AppointmentsTable
        title={"Today Appointments"}
        onFulfillClick={() => {}}
        onUnfulfillClick={() => {}}
        appointmentsData={
          todayAppointmentsData as PreviousAppointmentInterface[]
        }
        isForYesterdayAppointments={false}
      />

      <AppointmentsTable
        title={"Previous Appointments"}
        onFulfillClick={() => {}}
        onUnfulfillClick={() => {}}
        appointmentsData={
          prevAppointmentsData as PreviousAppointmentInterface[]
        }
        isForYesterdayAppointments={false}
      />
    </Flex>
  );
};
