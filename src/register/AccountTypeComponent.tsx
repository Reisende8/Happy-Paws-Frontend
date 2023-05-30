import { Flex, Text, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { AccountTypeEnum } from "./types";
import { HPButton } from "../common/HPButton";
import { useNavigate } from "react-router-dom";
export const AccountType = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<AccountTypeEnum>("Client");

  const onAccountTypeClick = (type: AccountTypeEnum) => {
    setAccountType(type);
  };

  const handleNextClick = () => {
    if (accountType === "Client") {
      navigate("/register-client");
    } else {
      navigate("/register-clinic");
    }
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
        gap={8}
      >
        <Text
          fontWeight={"bold"}
          fontSize={"4xl"}
          color={"primary.900"}
          textAlign={"center"}
        >
          Choose your account type
        </Text>

        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          w="100%"
          cursor={"pointer"}
          border="2px solid"
          py={2}
          gap={24}
          borderRadius={16}
          bgColor={accountType === "Client" ? "primary.100" : ""}
          borderColor={accountType === "Client" ? "primary.600" : "primary.200"}
          onClick={() => onAccountTypeClick("Client")}
        >
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Image src="icons/ClientIcon.png" h={12} />
          </Flex>

          <Flex
            fontSize={"xl"}
            fontWeight="semibold"
            justifyContent={"center"}
            alignItems={"center"}
            color="primary.900"
          >
            Register as a Client
          </Flex>
          <Flex justifyContent={"center"} alignItems={"center"}>
            {accountType === "Client" ? (
              <Image src="icons/OrangePoint.png" h={5} m={2} />
            ) : (
              <Image src="icons/GreyPoint.png" h={5} m={2} />
            )}
          </Flex>
        </Flex>

        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          w="100%"
          cursor={"pointer"}
          border="2px solid"
          p={2}
          gap={24}
          borderRadius={16}
          bgColor={accountType === "Clinic" ? "primary.100" : ""}
          borderColor={accountType === "Clinic" ? "primary.500" : "primary.200"}
          onClick={() => onAccountTypeClick("Clinic")}
        >
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Image src="icons/ClinicIcon.png" h={12} />
          </Flex>

          <Flex
            fontSize={"xl"}
            fontWeight="semibold"
            justifyContent={"center"}
            alignItems={"center"}
            color="primary.900"
          >
            Register as a Clinic
          </Flex>
          <Flex justifyContent={"center"} alignItems={"center"}>
            {accountType === "Clinic" ? (
              <Image src="icons/OrangePoint.png" h={5} m={2} />
            ) : (
              <Image src="icons/GreyPoint.png" h={5} m={2} />
            )}
          </Flex>
        </Flex>
        <HPButton onClick={handleNextClick}>Next</HPButton>
      </Flex>
    </Flex>
  );
};
