import React, { useEffect, useState } from "react";
import { AnimalInterface, MedicInterface } from "../medics/types";
import { apiClient, authorize } from "../utils/apiClient";
import { useNavigate, useParams } from "react-router-dom";
import { Flex, useToast, Text, Spinner } from "@chakra-ui/react";
import { HPBadge } from "../common/HPBadge";
import { AddNewMedicModal } from "../medics/addNewMedicModal";
import { HPButton } from "../common/HPButton";
import { specializations } from "../utils";

export const MedicProfile: React.FC = () => {
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [loadingEdit, setLoadingEdit] = useState<boolean>(false);
  const [medicDetails, setMedicDetails] = useState<MedicInterface>();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const { medicId } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    getMedicDetails(medicId as string);
  }, []);
  const getMedicDetails = async (medicId: string) => {
    setLoadingData(true);
    await apiClient
      .get(`/api/medic/medics/${medicId}`, authorize())
      .then((res) => {
        setMedicDetails(res.data);
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
    setLoadingData(false);
  };

  const editMedic = async (medic: MedicInterface) => {
    setLoadingEdit(true);
    await apiClient
      .put(
        `/api/medic/medics/${medic.medicId}`,
        {
          firstName: medic.firstName,
          lastName: medic.lastName,
          estimatedPrice: medic.estimatedPrice,
          animalIds: medic.animals.map((an) => parseInt(an.id)),
        },
        authorize()
      )
      .then((res) => {
        setMedicDetails(res.data);
        setEditModalOpen(false);
        return toast({
          title: "SUCCESS",
          status: "success",
          position: "top-right",
          description: `You deleted a medic successfully!`,
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
    setLoadingEdit(false);
  };
  return loadingData ? (
    <Flex w="100vw" h="100vh" justifyContent={"center"} alignItems={"center"}>
      <Spinner size="xl" colorScheme="primary" thickness="4px" />
    </Flex>
  ) : (
    <Flex
      border="4px solid "
      borderColor={"primary.100"}
      borderRadius={"3xl"}
      w="100%"
      h="100%"
      alignItems="center"
      justifyContent={"center"}
      direction="column"
    >
      <Flex
        justifyContent={"center"}
        direction="column"
        minW="50%"
        border="4px solid "
        borderColor={"primary.200"}
        borderRadius={"3xl"}
        p={8}
        gap={8}
      >
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text fontWeight={"bold"} fontSize={"4xl"} color={"primary.600"}>
            Medic Details
          </Text>
          <HPButton
            colorScheme="primary"
            w="0"
            px={24}
            m={0}
            onClick={() => {
              setEditModalOpen(true);
            }}
            gap={2}
          >
            Edit
          </HPButton>
        </Flex>

        <Flex w="100%" gap={8}>
          <HPBadge
            label="First Name"
            content={medicDetails?.firstName as string}
          />
          <HPBadge
            label="Last Name"
            content={medicDetails?.lastName as string}
          />
        </Flex>
        <HPBadge
          label="Specialization"
          content={
            specializations.filter(
              (sp) => sp.id.toString() === medicDetails?.specializationId
            )[0]?.name as string
          }
        />
        <Flex w="100%" gap={8}>
          <HPBadge
            label="Estimated Price"
            content={medicDetails?.estimatedPrice.toString() as string}
          />
          <HPBadge
            label="Animals"
            content={
              medicDetails?.animals
                .map((animal) => animal.name)
                .toString() as string
            }
          />
        </Flex>
        <Flex justifyContent={"center"} w="100%">
          <HPButton
            maxW="400px"
            m={0}
            onClick={() => {
              navigate(`/medics/${medicId}/previous_appointments`);
            }}
          >
            Previous Appointments
          </HPButton>
        </Flex>
      </Flex>

      {editModalOpen && (
        <AddNewMedicModal
          isLoading={loadingEdit}
          medic={medicDetails}
          onClose={() => {
            setEditModalOpen(false);
          }}
          onSuccess={editMedic}
        />
      )}
    </Flex>
  );
};
