import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HPButton } from "../../common/HPButton";
import { apiClient, authorize } from "../../utils/apiClient";
import { AuthContext } from "../../auth";
import { ClientInterface } from "../../auth/types";
import { SummaryAppointmentInterface } from "../types";
import { HPBadge } from "../../common/HPBadge";
import { specializations, timeIntervals } from "../../utils";
import { HPGridItem } from "../../common/HPGridItem";

export const MyAppointmentsPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCancel, setLoadingCancel] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [appointmentsData, setAppointmentsData] =
    useState<SummaryAppointmentInterface[]>();

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = async () => {
    setLoading(true);
    await apiClient
      .get(
        `/api/appointment/appointments/${(user as ClientInterface).clientId}`,
        authorize()
      )
      .then((res) => {
        setAppointmentsData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  };

  const cancelAppointments = async (appointmentId: string) => {
    setLoadingCancel(true);
    await apiClient
      .get(`/api/appointment/cancel-appointment/${appointmentId}`, authorize())
      .then((res) => {
        setAppointmentsData(
          appointmentsData?.map((ap) => {
            if (ap.id === appointmentId) {
              return { ...ap, status: "canceled" };
            } else {
              return { ...ap };
            }
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
    setLoadingCancel(false);
  };

  return loading ? (
    <Flex w="100vw" h="100vh" justifyContent={"center"} alignItems={"center"}>
      <Spinner size="xl" color="primary.600" thickness="4px" />
    </Flex>
  ) : (
    <Flex
      borderTop={"4px solid"}
      borderColor={"primary.100"}
      borderRadius={"20px 20px 0px 0px"}
      w="100%"
      h="100%"
      direction="column"
    >
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        px={9}
        py={4}
        borderRadius={"16px 16px 0px 0px"}
        bgColor={"offWhite"}
      >
        <Text fontWeight={"bold"} fontSize={"4xl"} color={"primary.500"}>
          My Appointments
        </Text>
        <HPButton
          w="280px"
          m={0}
          onClick={() => {
            navigate("/create-appointment");
          }}
          gap={2}
        >
          <Icon as={AddIcon} boxSize={4} />
          Create new appointment
        </HPButton>
      </Flex>

      {appointmentsData?.length !== 0 ? (
        <Grid
          justifyContent={"center"}
          border="6px solid"
          borderColor="offWhite"
          w="100%"
          templateColumns="repeat(2, 45%)"
          gap={6}
          py={6}
        >
          {appointmentsData?.map((a, index) => {
            return (
              <HPGridItem
                loadingCancel={loadingCancel}
                key={a.id}
                appointment={a}
                index={index}
                onClick={() => cancelAppointments(a.id)}
              />
            );
          })}
        </Grid>
      ) : (
        <></>
      )}
    </Flex>
  );
};
