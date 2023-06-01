import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ClinicInterface } from "../../auth/types";
import { HPButton } from "../../common/HPButton";
import { HPInput } from "../../common/HPInput";
import { apiClient, authorize } from "../../utils/apiClient";
import { EditClinicErrorsInterface } from "../types";

interface EditClinicInterface {
  user: ClinicInterface;
  setUser: (user: ClinicInterface) => void;
}

export const EditClinicModal: React.FC<EditClinicInterface> = ({
  user,
  setUser,
}) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);
  const [editClinicData, setEditClinicData] = useState<ClinicInterface>(user);
  const [editClinicErrors, setEditClinicErrors] =
    useState<EditClinicErrorsInterface>({
      nameError: "",
      addressError: "",
      phoneNumberError: "",
    });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setEditClinicErrors({
        ...editClinicErrors,
        nameError: "This field is required!",
      });
    } else {
      setEditClinicErrors({ ...editClinicErrors, nameError: "" });
    }
    setEditClinicData({
      ...editClinicData,
      name: e.target.value,
    });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setEditClinicErrors({
        ...editClinicErrors,
        addressError: "This field is required!",
      });
    } else {
      setEditClinicErrors({ ...editClinicErrors, addressError: "" });
    }
    setEditClinicData({
      ...editClinicData,
      address: e.target.value,
    });
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setEditClinicErrors({
        ...editClinicErrors,
        phoneNumberError: "This field is required!",
      });
    } else {
      setEditClinicErrors({
        ...editClinicErrors,
        phoneNumberError: "",
      });
    }
    setEditClinicData({
      ...editClinicData,
      phoneNumber: e.target.value,
    });
  };

  const handleEditClinicErrors = () => {
    const errors: EditClinicErrorsInterface = {
      nameError: "",
      addressError: "",
      phoneNumberError: "",
    };
    if (editClinicData.name === "") {
      errors.nameError = "This field is required!";
    }
    if (editClinicData.address === "") {
      errors.addressError = "This field is required!";
    }
    if (editClinicData.phoneNumber === "") {
      errors.phoneNumberError = "This field is required!";
    }

    return errors;
  };

  const handleEditClinicClick = () => {
    const errors = handleEditClinicErrors();
    if (
      errors.nameError === "" &&
      errors.addressError === "" &&
      errors.phoneNumberError === ""
    ) {
      editClinic(editClinicData);
    }
    setEditClinicErrors(errors);
  };
  const onCloseModal = () => {
    setEditClinicData(user);
    setEditClinicErrors({
      nameError: "",
      addressError: "",
      phoneNumberError: "",
    });
    onClose();
  };

  const editClinic = async (editClinicData: ClinicInterface) => {
    setLoading(true);
    await apiClient
      .put(
        `/api/user/clinics/${editClinicData.clinicId}`,
        editClinicData,
        authorize()
      )
      .then((res) => {
        setUser(res.data);
        setEditClinicData(res.data);
        setEditClinicErrors({
          nameError: "",
          addressError: "",
          phoneNumberError: "",
        });
        onClose();
        return toast({
          title: "SUCCESS",
          status: "success",
          position: "top-right",
          description: `Your profile has been updated successfully!`,
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
                label="Name"
                borderRadius={20}
                error={editClinicErrors.nameError}
                value={editClinicData.name}
                onChange={handleNameChange}
              />
              <HPInput
                label="Address"
                borderRadius={20}
                error={editClinicErrors.addressError}
                value={editClinicData.address}
                onChange={handleAddressChange}
              />
            </Flex>
            <HPInput
              type="number"
              label="Phone Number"
              borderRadius={20}
              error={editClinicErrors.phoneNumberError}
              value={editClinicData.phoneNumber}
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
              onClick={handleEditClinicClick}
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
