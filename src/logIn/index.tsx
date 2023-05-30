import { Button, Flex, Text, Image } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { LogInErrorInterface, LogInInterface } from "./types";
import { AuthContext } from "../auth";
import { HPInput } from "../common/HPInput";
import { HPButton } from "../common/HPButton";
import { isValidEmail } from "../utils/validators";
export const LogIn: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [logInErrors, setLogInErrors] = useState<LogInErrorInterface>({
    emailError: "",
    passwordError: "",
  });
  const [logInData, setLogInData] = useState<LogInInterface>({
    email: "",
    password: "",
  });
  const { logIn } = useContext(AuthContext);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setLogInErrors({ ...logInErrors, emailError: "This field is required!" });
    } else if (!isValidEmail(e.target.value)) {
      setLogInErrors({
        ...logInErrors,
        emailError: "This is not an email!",
      });
    } else {
      setLogInErrors({ ...logInErrors, emailError: "" });
    }
    setLogInData({
      ...logInData,
      email: e.target.value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setLogInErrors({
        ...logInErrors,
        passwordError: "This field is required!",
      });
    } else {
      setLogInErrors({ ...logInErrors, passwordError: "" });
    }
    setLogInData({
      ...logInData,
      password: e.target.value,
    });
  };

  const handleLogInErrors = () => {
    const errors = {
      emailError: "",
      passwordError: "",
    };
    if (logInData.email === "") {
      errors.emailError = "This field is required!";
    } else if (!isValidEmail(logInData.email)) {
      errors.emailError = "This is not an email!";
    }
    if (logInData.password === "") {
      errors.passwordError = "This field is required!";
    }

    return errors;
  };

  const handleLoginClick = async () => {
    const errors = handleLogInErrors();
    if (errors.emailError === "" && errors.passwordError === "") {
      await logIn(logInData);
    }
    setLogInErrors(errors);
  };

  return (
    <Flex
      direction={"column"}
      height={"100vh"}
      width="100%"
      justifyContent={"center"}
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
        gap={6}
      >
        <Image src="logo.png" h={28} />
        <Text fontWeight={"bold"} fontSize={"4xl"} color={"primary.900"}>
          Log In
        </Text>
        <HPInput
          label={"Email"}
          error={logInErrors.emailError}
          value={logInData.email}
          onChange={handleEmailChange}
        />
        <HPInput
          label={"Password"}
          type="password"
          error={logInErrors.passwordError}
          value={logInData.password}
          onChange={handlePasswordChange}
        />
        <HPButton onClick={handleLoginClick}>Log In</HPButton>
        <Flex
          direction="row"
          alignItems={"center"}
          justifyContent={"center"}
          gap={4}
          mt={6}
        >
          <Flex
            justifyContent={"center"}
            fontSize={"16px"}
            fontWeight={"medium"}
            color="primary.900"
          >
            New to Happy Paws?
          </Flex>
          <Button variant="outline" colorScheme="primary">
            Create your account
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
