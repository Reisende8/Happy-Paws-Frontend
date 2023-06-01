import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { HPButton } from "../../common/HPButton";
import { HPInput } from "../../common/HPInput";
import { ClientInterface } from "../../auth/types";
import { ClientProfile } from ".";
import { EditClientErrorsInterface } from "../types";
import { apiClient, authorize } from "../../utils/apiClient";

interface EditClientInterface {
  user: ClientInterface;
  setUser: (user: ClientInterface) => void;
}

export const EditClientModal: React.FC<EditClientInterface> = ({
  user,
  setUser,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);
  const [editClientData, setEditClientData] = useState<ClientInterface>(user);
  const [editClientErrors, setEditClientErrors] =
    useState<EditClientErrorsInterface>({
      firstNameError: "",
      lastNameError: "",
      phoneNumberError: "",
    });

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setEditClientErrors({
        ...editClientErrors,
        firstNameError: "This field is required!",
      });
    } else {
      setEditClientErrors({ ...editClientErrors, firstNameError: "" });
    }
    setEditClientData({
      ...editClientData,
      firstName: e.target.value,
    });
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setEditClientErrors({
        ...editClientErrors,
        lastNameError: "This field is required!",
      });
    } else {
      setEditClientErrors({ ...editClientErrors, lastNameError: "" });
    }
    setEditClientData({
      ...editClientData,
      lastName: e.target.value,
    });
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setEditClientErrors({
        ...editClientErrors,
        phoneNumberError: "This field is required!",
      });
    } else {
      setEditClientErrors({
        ...editClientErrors,
        phoneNumberError: "",
      });
    }
    setEditClientData({
      ...editClientData,
      phoneNumber: e.target.value,
    });
  };

  const handleRegisterClientErrors = () => {
    const errors: EditClientErrorsInterface = {
      firstNameError: "",
      lastNameError: "",
      phoneNumberError: "",
    };
    if (editClientData.firstName === "") {
      errors.firstNameError = "This field is required!";
    }
    if (editClientData.lastName === "") {
      errors.lastNameError = "This field is required!";
    }
    if (editClientData.phoneNumber === "") {
      errors.phoneNumberError = "This field is required!";
    }

    return errors;
  };

  const handleEditClientClick = () => {
    const errors = handleRegisterClientErrors();
    if (
      errors.firstNameError === "" &&
      errors.lastNameError === "" &&
      errors.phoneNumberError === ""
    ) {
      editClient(editClientData);
    }
    setEditClientErrors(errors);
  };
  const onCloseModal = () => {
    setEditClientData(user);
    setEditClientErrors({
      firstNameError: "",
      lastNameError: "",
      phoneNumberError: "",
    });
    onClose();
  };

  const editClient = async (editClientData: ClientInterface) => {
    setLoading(true);
    await apiClient
      .put(
        `/api/user/clients/${editClientData.clientId}`,
        editClientData,
        authorize()
      )
      .then((res) => {
        setUser(res.data);
        setEditClientData(res.data);
        setEditClientErrors({
          firstNameError: "",
          lastNameError: "",
          phoneNumberError: "",
        });
        onClose();
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  };

  return (
    <>
      <HPButton w="0" px={20} m={0} onClick={onOpen}>
        EDIT
      </HPButton>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size={"lg"}
      >
        <ModalOverlay backdropFilter="blur(4px) " />
        <ModalContent borderRadius={20} margin="auto" gap={4} px={4}>
          <ModalHeader>
            <Text fontSize="3xl" color="primary.600">
              Edit my profile
            </Text>
          </ModalHeader>

          <ModalBody display={"flex"} flexDirection="column" gap={6}>
            <Flex gap={4}>
              <HPInput
                label="First Name"
                borderRadius={20}
                error={editClientErrors.firstNameError}
                value={editClientData.firstName}
                onChange={handleFirstNameChange}
              />
              <HPInput
                label="Last Name"
                borderRadius={20}
                error={editClientErrors.lastNameError}
                value={editClientData.lastName}
                onChange={handleLastNameChange}
              />
            </Flex>
            <HPInput
              type="number"
              label="Phone Number"
              borderRadius={20}
              error={editClientErrors.phoneNumberError}
              value={editClientData.phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </ModalBody>
          <ModalFooter>
            <HPButton
              textColor={"primary.300"}
              mr={3}
              onClick={onCloseModal}
              w={"90px"}
              variant="outline"
              _hover={{ bgColor: "primary.100" }}
            >
              Close
            </HPButton>
            <HPButton
              w={"120px"}
              m={0}
              onClick={handleEditClientClick}
              isLoading={loading}
            >
              Edit
            </HPButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
