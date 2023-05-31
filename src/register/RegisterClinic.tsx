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
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { AuthContext } from "../auth";
import { HPButton } from "../common/HPButton";
import { HPInput } from "../common/HPInput";
import { isValidEmail, isValidPassword } from "../utils/validators";
import { RegisterClinicErrorInterface, RegisterClinicInterface } from "./types";

export const RegisterClinic: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [emailModalOpen, setEmailModalOpen] = useState<boolean>(false);
  const [registerClinicErrors, setRegisterClinicErrors] =
    useState<RegisterClinicErrorInterface>({
      nameError: "",
      addressError: "",
      phoneNumberError: "",
      emailError: "",
      passwordError: "",
      repeatPasswordError: "",
    });
  const [registerClinicData, setRegisterClinicData] =
    useState<RegisterClinicInterface>({
      name: "",
      address: "",
      phoneNumber: "",
      email: "",
      password: "",
      repeatPassword: "",
    });
  const { registerClinic } = useContext(AuthContext);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setRegisterClinicErrors({
        ...registerClinicErrors,
        nameError: "This field is required!",
      });
    } else {
      setRegisterClinicErrors({ ...registerClinicErrors, nameError: "" });
    }
    setRegisterClinicData({
      ...registerClinicData,
      name: e.target.value,
    });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setRegisterClinicErrors({
        ...registerClinicErrors,
        addressError: "This field is required!",
      });
    } else {
      setRegisterClinicErrors({ ...registerClinicErrors, addressError: "" });
    }
    setRegisterClinicData({
      ...registerClinicData,
      address: e.target.value,
    });
  };

  const handleLPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setRegisterClinicErrors({
        ...registerClinicErrors,
        phoneNumberError: "This field is required!",
      });
    } else {
      setRegisterClinicErrors({
        ...registerClinicErrors,
        phoneNumberError: "",
      });
    }
    setRegisterClinicData({
      ...registerClinicData,
      phoneNumber: e.target.value,
    });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setRegisterClinicErrors({
        ...registerClinicErrors,
        emailError: "This field is required!",
      });
    } else if (!isValidEmail(e.target.value)) {
      setRegisterClinicErrors({
        ...registerClinicErrors,
        emailError: "This is not an email!",
      });
    } else {
      setRegisterClinicErrors({ ...registerClinicErrors, emailError: "" });
    }
    setRegisterClinicData({
      ...registerClinicData,
      email: e.target.value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setRegisterClinicErrors({
        ...registerClinicErrors,
        passwordError: "This field is required!",
      });
    } else if (!isValidPassword(e.target.value)) {
      setRegisterClinicErrors({
        ...registerClinicErrors,
        passwordError:
          "The password must have at least 8 characters, an uppercase letter, a lowercase letter, a number and a special character!",
      });
    } else {
      setRegisterClinicErrors({ ...registerClinicErrors, passwordError: "" });
    }
    setRegisterClinicData({
      ...registerClinicData,
      password: e.target.value,
    });
  };

  const handleRepeatPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.value) {
      setRegisterClinicErrors({
        ...registerClinicErrors,
        repeatPasswordError: "This field is required!",
      });
    } else {
      setRegisterClinicErrors({
        ...registerClinicErrors,
        repeatPasswordError: "",
      });
    }
    setRegisterClinicData({
      ...registerClinicData,
      repeatPassword: e.target.value,
    });
  };

  const handleRegisterClientErrors = () => {
    const errors: RegisterClinicErrorInterface = {
      nameError: "",
      addressError: "",
      phoneNumberError: "",
      emailError: "",
      passwordError: "",
      repeatPasswordError: "",
    };
    if (registerClinicData.name === "") {
      errors.nameError = "This field is required!";
    }
    if (registerClinicData.address === "") {
      errors.addressError = "This field is required!";
    }
    if (registerClinicData.phoneNumber === "") {
      errors.phoneNumberError = "This field is required!";
    }
    if (registerClinicData.email === "") {
      errors.emailError = "This field is required!";
    } else if (!isValidEmail(registerClinicData.email)) {
      errors.emailError = "This is not an email!";
    }
    if (registerClinicData.password === "") {
      errors.passwordError = "This field is required!";
    } else if (!isValidPassword(registerClinicData.password)) {
      errors.passwordError =
        "The password must have at least 8 characters, an uppercase letter, a lowercase letter, a number and a special character!";
    }
    if (registerClinicData.repeatPassword === "") {
      errors.repeatPasswordError = "This field is required!";
    } else if (
      registerClinicData.password !== registerClinicData.repeatPassword
    ) {
      errors.repeatPasswordError =
        "The password and repeat password are different!";
    }

    return errors;
  };

  const handleRegisterClick = async () => {
    setLoading(true);
    const errors = handleRegisterClientErrors();
    if (
      errors.nameError === "" &&
      errors.addressError === "" &&
      errors.phoneNumberError === "" &&
      errors.emailError === "" &&
      errors.passwordError === "" &&
      errors.repeatPasswordError === ""
    ) {
      await registerClinic(registerClinicData);
      setEmailModalOpen(true);
    }
    setRegisterClinicErrors(errors);
    setLoading(false);
  };

  const onEmailModalClose = () => {
    setEmailModalOpen(false);
  };

  return (
    <Flex
      direction={"column"}
      height={"100vh"}
      width="100%"
      alignItems={"center"}
    >
      <Flex
        width="100%"
        justifyContent={"center"}
        py={1}
        backgroundColor={"primary.500"}
      >
        <Text fontWeight={700} fontSize={"xl"} textColor={"primary.900"}>
          Happy Paws
        </Text>
      </Flex>

      <Flex
        height="100%"
        width="50%"
        minW={"700px"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        px={32}
        gap={2}
      >
        <Text fontWeight={"bold"} fontSize={"4xl"} color={"primary.900"} mb={4}>
          Register as a clinic
        </Text>
        <Flex w="100%" gap={3}>
          <HPInput
            label={"Name"}
            error={registerClinicErrors.nameError}
            value={registerClinicData.name}
            onChange={handleNameChange}
          />
          <HPInput
            type="number"
            label={"Phone Number"}
            error={registerClinicErrors.phoneNumberError}
            value={registerClinicData.phoneNumber}
            onChange={handleLPhoneNumberChange}
          />
        </Flex>
        <HPInput
          label={"Address"}
          error={registerClinicErrors.addressError}
          value={registerClinicData.address}
          onChange={handleAddressChange}
        />
        <HPInput
          type="email"
          label={"Email"}
          error={registerClinicErrors.emailError}
          value={registerClinicData.email}
          onChange={handleEmailChange}
        />

        <HPInput
          label={"Password"}
          type="password"
          error={registerClinicErrors.passwordError}
          value={registerClinicData.password}
          onChange={handlePasswordChange}
        />
        <HPInput
          label={"Repeat Password"}
          type="password"
          error={registerClinicErrors.repeatPasswordError}
          value={registerClinicData.repeatPassword}
          onChange={handleRepeatPasswordChange}
        />
        <HPButton onClick={handleRegisterClick} isLoading={loading}>
          Register
        </HPButton>
        <Modal
          closeOnOverlayClick={false}
          isOpen={emailModalOpen}
          onClose={onEmailModalClose}
          size={"2xl"}
        >
          <ModalOverlay backdropFilter="blur(4px) " />
          <ModalContent
            justifyContent={"center"}
            alignItems={"center"}
            margin="auto"
            gap={4}
          >
            <ModalHeader>
              <Text fontSize="3xl" color="primary.700">
                Email Confirmation
              </Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody textAlign={"center"}>
              <Text fontSize={"xl"} color="primary.600">
                We have sent you an email to activate your account. Follow the
                link provided to complete your registration. Please make sure to
                also check spam!
              </Text>
            </ModalBody>
            <ModalFooter w="100%">
              <HPButton onClick={onEmailModalClose}>OK</HPButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Flex>
  );
};
