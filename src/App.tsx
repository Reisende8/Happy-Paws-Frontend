import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LogIn } from "./logIn";
import { AuthWrapper } from "./auth";

export const App = () => (
  <AuthWrapper>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </AuthWrapper>
);
