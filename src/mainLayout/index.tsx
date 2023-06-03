import React, { ReactNode, useContext } from "react";
import { AuthContext } from "../auth";
import { Flex } from "@chakra-ui/react";
import { Navbar } from "../navbar";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user } = useContext(AuthContext);

  return (
    <Flex direction={"column"}>
      {user && <Navbar />}

      <Flex
        justifyContent={user ? "center" : ""}
        alignItems={user ? "center" : ""}
        h={user ? "calc(100vh - 64px)" : ""}
        overflowX={"auto"}
        p={user ? 8 : ""}
      >
        {children}
      </Flex>
    </Flex>
  );
};
