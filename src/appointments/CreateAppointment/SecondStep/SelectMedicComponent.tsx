import { Flex, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AppointmentContext } from "..";
import { HPAppointmentListItem } from "../../../common/HPAppointmentListItem";

export const SelectMedicComponent: React.FC = () => {
  const { recommendedMedicsData, onSelectMedic } =
    useContext(AppointmentContext);

  return (
    <>
      <Flex
        my={4}
        py={3}
        borderRadius={"20px"}
        height="100%"
        w="100%"
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
        gap={4}
      >
        <Text fontWeight={"bold"} fontSize={"3xl"} color={"primary.500"}>
          Recommended Medics
        </Text>
        {recommendedMedicsData.length !== 0 ? (
          <Flex direction={"column"} w="100%" h="100%">
            {recommendedMedicsData?.map((medic) => {
              return (
                <HPAppointmentListItem
                  medic={medic}
                  key={medic.medicId}
                  onSelect={() => onSelectMedic(medic.medicId)}
                />
              );
            })}
          </Flex>
        ) : (
          <Flex
            w="100%"
            h="100%"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text
              fontWeight={"semibold"}
              fontSize={"2xl"}
              color={"primary.700"}
            >
              No medics to recommend!
            </Text>
          </Flex>
        )}
      </Flex>
    </>
  );
};
