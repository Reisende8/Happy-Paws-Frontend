import { Flex, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { HPBadge } from "../../common/HPBadge";
import { HPButton } from "../../common/HPButton";
import { AuthContext } from "../../auth";
import { ClientInterface } from "../../auth/types";
import { EditClientModal } from "./editClientModal";

export const ClientProfile: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);

  return (
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
            My Profile
          </Text>
          <EditClientModal user={user as ClientInterface} setUser={setUser} />
        </Flex>

        <Flex w="100%" gap={8}>
          <HPBadge
            label="First Name"
            content={(user as ClientInterface).firstName}
          />
          <HPBadge
            label="Last Name"
            content={(user as ClientInterface).lastName}
          />
        </Flex>
        <HPBadge label="Email" content={(user as ClientInterface).email} />
        <HPBadge
          label="Phone Number"
          content={(user as ClientInterface).phoneNumber}
        />
      </Flex>
    </Flex>
  );
};
