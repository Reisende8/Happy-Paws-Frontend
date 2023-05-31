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
import { RegisterClientErrorInterface, RegisterClientInterface } from "./types";

export const RegisterClient: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [emailModalOpen, setEmailModalOpen] = useState<boolean>(false);
  const [registerClientErrors, setRegisterClientErrors] =
    useState<RegisterClientErrorInterface>({
      firstNameError: "",
      lastNameError: "",
      phoneNumberError: "",
      emailError: "",
      passwordError: "",
      repeatPasswordError: "",
    });
  const [registerClientData, setRegisterClientData] =
    useState<RegisterClientInterface>({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      repeatPassword: "",
    });
  const { registerClient } = useContext(AuthContext);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setRegisterClientErrors({
        ...registerClientErrors,
        firstNameError: "This field is required!",
      });
    } else {
      setRegisterClientErrors({ ...registerClientErrors, firstNameError: "" });
    }
    setRegisterClientData({
      ...registerClientData,
      firstName: e.target.value,
    });
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setRegisterClientErrors({
        ...registerClientErrors,
        lastNameError: "This field is required!",
      });
    } else {
      setRegisterClientErrors({ ...registerClientErrors, lastNameError: "" });
    }
    setRegisterClientData({
      ...registerClientData,
      lastName: e.target.value,
    });
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setRegisterClientErrors({
        ...registerClientErrors,
        phoneNumberError: "This field is required!",
      });
    } else {
      setRegisterClientErrors({
        ...registerClientErrors,
        phoneNumberError: "",
      });
    }
    setRegisterClientData({
      ...registerClientData,
      phoneNumber: e.target.value,
    });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setRegisterClientErrors({
        ...registerClientErrors,
        emailError: "This field is required!",
      });
    } else if (!isValidEmail(e.target.value)) {
      setRegisterClientErrors({
        ...registerClientErrors,
        emailError: "This is not an email!",
      });
    } else {
      setRegisterClientErrors({ ...registerClientErrors, emailError: "" });
    }
    setRegisterClientData({
      ...registerClientData,
      email: e.target.value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setRegisterClientErrors({
        ...registerClientErrors,
        passwordError: "This field is required!",
      });
    } else if (!isValidPassword(e.target.value)) {
      setRegisterClientErrors({
        ...registerClientErrors,
        passwordError:
          "The password must have at least 8 characters, an uppercase letter, a lowercase letter, a number and a special character!",
      });
    } else {
      setRegisterClientErrors({ ...registerClientErrors, passwordError: "" });
    }
    setRegisterClientData({
      ...registerClientData,
      password: e.target.value,
    });
  };

  const handleRepeatPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.value) {
      setRegisterClientErrors({
        ...registerClientErrors,
        repeatPasswordError: "This field is required!",
      });
    } else {
      setRegisterClientErrors({
        ...registerClientErrors,
        repeatPasswordError: "",
      });
    }
    setRegisterClientData({
      ...registerClientData,
      repeatPassword: e.target.value,
    });
  };

  const handleRegisterClientErrors = () => {
    const errors: RegisterClientErrorInterface = {
      firstNameError: "",
      lastNameError: "",
      phoneNumberError: "",
      emailError: "",
      passwordError: "",
      repeatPasswordError: "",
    };
    if (registerClientData.firstName === "") {
      errors.firstNameError = "This field is required!";
    }
    if (registerClientData.lastName === "") {
      errors.lastNameError = "This field is required!";
    }
    if (registerClientData.phoneNumber === "") {
      errors.phoneNumberError = "This field is required!";
    }
    if (registerClientData.email === "") {
      errors.emailError = "This field is required!";
    } else if (!isValidEmail(registerClientData.email)) {
      errors.emailError = "This is not an email!";
    }
    if (registerClientData.password === "") {
      errors.passwordError = "This field is required!";
    } else if (!isValidPassword(registerClientData.password)) {
      errors.passwordError =
        "The password must have at least 8 characters, an uppercase letter, a lowercase letter, a number and a special character!";
    }
    if (registerClientData.repeatPassword === "") {
      errors.repeatPasswordError = "This field is required!";
    } else if (
      registerClientData.password !== registerClientData.repeatPassword
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
      errors.firstNameError === "" &&
      errors.lastNameError === "" &&
      errors.phoneNumberError === "" &&
      errors.emailError === "" &&
      errors.passwordError === "" &&
      errors.repeatPasswordError === ""
    ) {
      await registerClient(registerClientData);
      setEmailModalOpen(true);
    }
    setRegisterClientErrors(errors);
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
          Register as a client
        </Text>
        <Flex w="100%" gap={3}>
          <HPInput
            label={"First Name"}
            error={registerClientErrors.firstNameError}
            value={registerClientData.firstName}
            onChange={handleFirstNameChange}
          />
          <HPInput
            label={"Last Name"}
            error={registerClientErrors.lastNameError}
            value={registerClientData.lastName}
            onChange={handleLastNameChange}
          />
        </Flex>
        <HPInput
          type="number"
          label={"Phone Number"}
          error={registerClientErrors.phoneNumberError}
          value={registerClientData.phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        <HPInput
          type="email"
          label={"Email"}
          error={registerClientErrors.emailError}
          value={registerClientData.email}
          onChange={handleEmailChange}
        />

        <HPInput
          label={"Password"}
          type="password"
          error={registerClientErrors.passwordError}
          value={registerClientData.password}
          onChange={handlePasswordChange}
        />
        <HPInput
          label={"Repeat Password"}
          type="password"
          error={registerClientErrors.repeatPasswordError}
          value={registerClientData.repeatPassword}
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
