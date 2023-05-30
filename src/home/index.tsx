import React, { useContext, useEffect } from "react";
import { AuthContext } from "../auth";
import { Flex, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const HomePage: React.FC = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      if (user.roleId === 0) {
        navigate("/appointments");
      } else {
        navigate("/medics");
      }
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <Flex w="100vw" h="100vh" justifyContent={"center"} alignItems={"center"}>
      <Spinner size="xl" colorScheme="primary" />
    </Flex>
  );
};
