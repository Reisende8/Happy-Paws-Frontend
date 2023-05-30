import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

interface HPButtonProps extends ButtonProps {}

export const HPButton: React.FC<HPButtonProps> = (props) => {
  return (
    <Button
      fontSize={"xl"}
      my={4}
      w="100%"
      mx={8}
      colorScheme={"primary"}
      textColor={"primary.100"}
      {...props}
    >
      {props.children}
    </Button>
  );
};
