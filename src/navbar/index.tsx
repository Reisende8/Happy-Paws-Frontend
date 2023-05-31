import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { HPTab } from "../common/HPTab";
import { HPButton } from "../common/HPButton";
import { AuthContext } from "../auth";

export const Navbar: React.FC = () => {
  const { logOut, user } = useContext(AuthContext);
  return (
    <Flex
      align="center"
      wrap="wrap"
      w="100%"
      h="64px"
      bg={"primary.400"}
      px={7}
    >
      <Flex alignItems={"center"} h="100%" w="100%" gap={8}>
        <Image src="icons/logo1.png" h="100%" />

        <Flex gap={6} h="100%" alignItems={"center"} w="100%">
          {user?.roleId === 0 ? (
            <>
              <HPTab url="/appointments" name="Appointments" />
              <HPTab url="/client-profile" name="Profile" />
            </>
          ) : (
            <>
              <HPTab url="/medics" name="Medics" />
              <HPTab url="/clinic-profile" name="Profile" />
            </>
          )}
        </Flex>

        <HPButton mx={0} w="120px" onClick={logOut}>
          Log Out
        </HPButton>
      </Flex>
    </Flex>
  );
};
