import { Button, Flex, Icon, Spinner, Text, useToast } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { HPButton } from "../common/HPButton";
import { HPListItem } from "../common/HPListItem";
import { AddIcon } from "@chakra-ui/icons";
import { MedicInterface } from "./types";
import { AuthContext } from "../auth";
import { apiClient, authorize } from "../utils/apiClient";
import { ClinicInterface } from "../auth/types";

export const AllMedicsPage: React.FC = () => {
  const toast = useToast();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [medicsData, setMedicsData] = useState<MedicInterface[]>();

  useEffect(() => {
    getMedics((user as ClinicInterface).clinicId);
  }, []);

  const getMedics = async (clinicId: string) => {
    setLoading(true);
    await apiClient
      .post("/api/medic/get-medics", { clinicId: clinicId }, authorize())
      .then((res) => {
        setMedicsData(res.data);
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
    <Flex w="100vw" h="70vh" justifyContent={"center"} alignItems={"center"}>
      <Spinner size="xl" colorScheme="primary" thickness="4px" />
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
          All Medics
        </Text>
        <HPButton w="0" px={24} m={0} onClick={() => {}} gap={2}>
          <Icon as={AddIcon} boxSize={4} />
          Add new medic
        </HPButton>
      </Flex>
      <Flex direction={"column"} py={6}>
        {medicsData?.map((medic) => {
          return (
            <HPListItem
              key={medic.medicId}
              name={`${medic.firstName} ${medic.lastName}`}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};
