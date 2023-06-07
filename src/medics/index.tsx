import { AddIcon } from "@chakra-ui/icons";
import { Flex, Icon, Spinner, Text, useToast } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth";
import { ClinicInterface } from "../auth/types";
import { HPButton } from "../common/HPButton";
import { HPListItem } from "../common/HPListItem";
import { apiClient, authorize } from "../utils/apiClient";
import { AddNewMedicModal } from "./addNewMedicModal";
import { MedicInterface } from "./types";

export const AllMedicsPage: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loadingModal, setLoadingModal] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [medicsData, setMedicsData] = useState<MedicInterface[]>([]);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getMedics((user as ClinicInterface).clinicId);
  }, []);

  const deleteMedic = async (medic: MedicInterface) => {
    await apiClient
      .delete(`/api/medic/delete-medic/${medic.medicId}`, authorize())
      .then((res) => {
        setMedicsData(medicsData.filter((m) => m.medicId !== medic.medicId));
        return toast({
          title: "SUCCESS",
          status: "success",
          position: "top-right",
          description: `You deleted a medic successfully!`,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addNewMedic = async (newMedic: MedicInterface) => {
    setLoadingModal(true);
    await apiClient
      .post(
        "/api/medic/create-medic",
        {
          firstName: newMedic.firstName,
          lastName: newMedic.lastName,
          estimatedPrice: newMedic.estimatedPrice,
          specializationId: parseInt(newMedic.specializationId),
          animalIds: newMedic.animals.map((an) => parseInt(an.id)),
        },
        authorize()
      )
      .then((res) => {
        setMedicsData([...medicsData, res.data]);
        setAddModalOpen(false);
        return toast({
          title: "SUCCESS",
          status: "success",
          position: "top-right",
          description: `You created a medic successfully!`,
        });
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
    setLoadingModal(false);
  };

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
        <HPButton
          w="0"
          px={24}
          m={0}
          onClick={() => {
            setAddModalOpen(true);
          }}
          gap={2}
        >
          <Icon as={AddIcon} boxSize={4} />
          Add new medic
        </HPButton>
      </Flex>
      {medicsData?.length !== 0 ? (
        <Flex direction={"column"} py={6}>
          {medicsData?.map((medic) => {
            return (
              <HPListItem
                medic={medic}
                key={medic.medicId}
                name={`${medic.firstName} ${medic.lastName}`}
                onDelete={deleteMedic}
                onMoreDetailsClick={() => {
                  navigate(`/medics/${medic.medicId}`);
                }}
              />
            );
          })}
        </Flex>
      ) : (
        <Flex w="100%" h="100%" justifyContent={"center"} alignItems={"center"}>
          <Text fontWeight={"semibold"} fontSize={"2xl"} color={"primary.700"}>
            The clinic doesn't have any medics!
          </Text>
        </Flex>
      )}

      {addModalOpen && (
        <AddNewMedicModal
          isLoading={loadingModal}
          onClose={() => {
            setAddModalOpen(false);
          }}
          onSuccess={addNewMedic}
        />
      )}
    </Flex>
  );
};
