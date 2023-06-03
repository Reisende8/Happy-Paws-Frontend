import { Flex, Icon, Text } from "@chakra-ui/react";
import react from "react";
import { HPButton } from "../../common/HPButton";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export const MyAppointmentsPage: React.FC = () => {
  const navigate = useNavigate();
  return (
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
    </Flex>
  );
};
