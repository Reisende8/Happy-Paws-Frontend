import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./auth";
import { RoutesComponent } from "./routes";
import { theme } from "./theme";

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <AuthWrapper>
        <RoutesComponent />
      </AuthWrapper>
    </BrowserRouter>
  </ChakraProvider>
);
