import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ErrorInterface } from "../auth/types";
import { apiClient } from "../utils/apiClient";
import { AuthContext } from "../auth";

export const ActivateAccount: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [errorActivationAccount, setErrorActivationAccount] =
    useState<ErrorInterface | null>(null);
  const { logInFromActivation } = useContext(AuthContext);

  const activateAccount = async (email: string, token: string) => {
    await apiClient
      .get(`/api/user/validate-email/${email}/${token}`)
      .then((res) => {
        logInFromActivation(res.data.token);
      })
      .catch((err) => {
        console.error(err);
        setErrorActivationAccount(err.response.data);
      });
  };

  useEffect(() => {
    const email = searchParams.get("email") ?? "";
    const token = searchParams.get("token") ?? "";
    activateAccount(email, token);
  }, []);

  return errorActivationAccount ? (
    <Modal
      closeOnOverlayClick={false}
      isOpen={true}
      onClose={() => {}}
      size={"xl"}
    >
      <ModalOverlay />
      <ModalContent
        justifyContent={"center"}
        alignItems={"center"}
        margin="auto"
        gap={3}
      >
        <ModalHeader>
          <Text fontSize="3xl" color="danger.500">
            {errorActivationAccount?.error}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign={"center"}>
          <Text fontSize={"xl"} color="danger.600">
            {errorActivationAccount?.message}
          </Text>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  ) : (
    <Flex w="100vw" h="100vh" justifyContent={"center"} alignItems={"center"}>
      <Spinner size="xl" color="primary.600" thickness="4px" />
    </Flex>
  );
};
