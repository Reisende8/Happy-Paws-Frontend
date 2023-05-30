import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LogIn } from "./logIn";
import { AuthWrapper } from "./auth";
import { AccountType } from "./register/AccountTypeComponent";
import { RegisterClient } from "./register/RegisterClient";
import { RegisterClinic } from "./register/RegisterClinic";

export const App = () => (
  <AuthWrapper>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/account-type" element={<AccountType />} />
          <Route path="/register-client" element={<RegisterClient />} />
          <Route path="/register-clinic" element={<RegisterClinic />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </AuthWrapper>
);
