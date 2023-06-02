import {
  Checkbox,
  CheckboxGroup,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { HPButton } from "../common/HPButton";
import { HPInput } from "../common/HPInput";
import { HPSelect } from "../common/HPSelect";
import {
  AnimalInterface,
  MedicErrorsInterface,
  MedicInterface,
  SpecializationInterface,
} from "./types";
import { specializations } from "../utils";

interface AddNewMedicModalInterface {
  isLoading: boolean;
  medic?: MedicInterface;
  onClose: () => void;
  onSuccess: (medic: MedicInterface) => Promise<void>;
}

export const AddNewMedicModal: React.FC<AddNewMedicModalInterface> = ({
  onClose,
  medic,
  onSuccess,
  isLoading,
}) => {
  const [medicModalData, setMedicModalData] = useState<MedicInterface>(
    medic ?? {
      medicId: "",
      clinicId: "",
      firstName: "",
      lastName: "",
      specializationId: "0",
      estimatedPrice: 0,
      animals: [],
    }
  );
  const [medicErrors, setMedicErrors] = useState<MedicErrorsInterface>({
    firstNameError: "",
    lastNameError: "",
    specializationError: "",
    estimatedPriceError: "",
    animalsError: "",
  });

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setMedicErrors({
        ...medicErrors,
        firstNameError: "This field is required!",
      });
    } else {
      setMedicErrors({ ...medicErrors, firstNameError: "" });
    }
    setMedicModalData({
      ...medicModalData,
      firstName: e.target.value,
    });
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setMedicErrors({
        ...medicErrors,
        lastNameError: "This field is required!",
      });
    } else {
      setMedicErrors({ ...medicErrors, lastNameError: "" });
    }
    setMedicModalData({
      ...medicModalData,
      lastName: e.target.value,
    });
  };

  const handleSpecializationChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (!e.target.value) {
      setMedicErrors({
        ...medicErrors,
        specializationError: "This field is required!",
      });
    } else {
      setMedicErrors({ ...medicErrors, specializationError: "" });
    }
    setMedicModalData({
      ...medicModalData,
      specializationId: e.target.value,
    });
  };

  const handleEstimatedPriceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.value) {
      setMedicErrors({
        ...medicErrors,
        estimatedPriceError: "This field is required!",
      });
    } else {
      setMedicErrors({ ...medicErrors, estimatedPriceError: "" });
    }
    setMedicModalData({
      ...medicModalData,
      estimatedPrice: parseFloat(e.target.value),
    });
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    checkboxValue: AnimalInterface
  ) => {
    if (e.target.checked) {
      const updatedAnimals = [...medicModalData.animals, checkboxValue];

      setMedicModalData({
        ...medicModalData,
        animals: updatedAnimals,
      });
      setMedicErrors({ ...medicErrors, animalsError: "" });
    } else {
      const updatedAnimals = medicModalData.animals.filter(
        (animal) => animal.id !== checkboxValue.id
      );

      setMedicModalData({
        ...medicModalData,
        animals: updatedAnimals,
      });
    }
  };

  const handleMedicErrors = () => {
    const errors: MedicErrorsInterface = {
      firstNameError: "",
      lastNameError: "",
      specializationError: "",
      estimatedPriceError: "",
      animalsError: "",
    };
    if (medicModalData.firstName === "") {
      errors.firstNameError = "This field is required!";
    }
    if (medicModalData.lastName === "") {
      errors.lastNameError = "This field is required!";
    }
    if (medicModalData.specializationId === "") {
      errors.specializationError = "This field is required!";
    }
    if (!medicModalData.estimatedPrice) {
      errors.estimatedPriceError = "This field is required!";
    }
    if (medicModalData.animals.length === 0) {
      errors.animalsError = "This field is required!";
    }

    return errors;
  };

  const handleSuccessClick = () => {
    const errors = handleMedicErrors();
    if (
      errors.firstNameError === "" &&
      errors.lastNameError === "" &&
      errors.specializationError === "" &&
      errors.estimatedPriceError === "" &&
      errors.animalsError === ""
    ) {
      onSuccess(medicModalData);
    }
    setMedicErrors(errors);
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      closeOnOverlayClick={false}
      size={"lg"}
    >
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent borderRadius={20} margin="auto" gap={4} px={4}>
        <ModalHeader>
          <Text fontSize="3xl" color="primary.600">
            {medic ? "Update a medic" : "Add new medic"}
          </Text>
        </ModalHeader>

        <ModalBody display={"flex"} flexDirection="column" gap={6}>
          <Flex gap={4}>
            <HPInput
              label="First Name"
              borderRadius={20}
              error={medicErrors.firstNameError}
              value={medicModalData.firstName}
              onChange={handleFirstNameChange}
            />
            <HPInput
              label="Last Name"
              borderRadius={20}
              error={medicErrors.lastNameError}
              value={medicModalData.lastName}
              onChange={handleLastNameChange}
            />
          </Flex>
          {!medic && (
            <HPSelect
              options={specializations}
              error={medicErrors.specializationError}
              value={medicModalData.specializationId}
              onChange={handleSpecializationChange}
            />
          )}

          <Flex gap={4}>
            <HPInput
              w="100%"
              type="number"
              label="Estimated Price"
              borderRadius={20}
              error={medicErrors.estimatedPriceError}
              value={medicModalData.estimatedPrice}
              onChange={handleEstimatedPriceChange}
            />
            <Flex w="100%" direction={"column"} px={1}>
              <Text color={"primary.900"} fontWeight={500} fontSize={"18px"}>
                Animals
              </Text>
              <Flex
                h="100%"
                gap={4}
                alignItems={"center"}
                fontWeight={"medium"}
                textColor={"primary.900"}
              >
                <CheckboxGroup>
                  <Checkbox
                    colorScheme="primary"
                    onChange={(e) => {
                      handleCheckboxChange(e, { id: "0", name: "Cat" });
                    }}
                    isChecked={
                      !!medicModalData.animals.filter((a) => a.id === "0")
                        .length
                    }
                  >
                    <Text fontSize={"xl"}>Cat</Text>
                  </Checkbox>
                  <Checkbox
                    colorScheme="primary"
                    onChange={(e) => {
                      handleCheckboxChange(e, { id: "1", name: "Dog" });
                    }}
                    isChecked={
                      !!medicModalData.animals.filter((a) => a.id === "1")
                        .length
                    }
                  >
                    <Text fontSize={"xl"}>Dog</Text>
                  </Checkbox>
                </CheckboxGroup>
              </Flex>
              <Flex>
                {!!medicErrors.animalsError && (
                  <Text color="danger.400" fontSize={16} fontWeight={500}>
                    {medicErrors.animalsError}
                  </Text>
                )}
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <HPButton
            textColor={"primary.300"}
            mr={3}
            onClick={onClose}
            w={"90px"}
            variant="outline"
            _hover={{ bgColor: "primary.100" }}
          >
            Close
          </HPButton>
          <HPButton
            isLoading={isLoading}
            w={"120px"}
            m={0}
            onClick={handleSuccessClick}
          >
            {medic ? "Save" : "Create"}
          </HPButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
