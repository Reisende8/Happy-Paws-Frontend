import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LogIn } from "./logIn";
import { AuthWrapper } from "./auth";
import { AccountType } from "./register/AccountTypeComponent";
import { RegisterClient } from "./register/RegisterClient";
import { RegisterClinic } from "./register/RegisterClinic";
import { NotFoundPage } from "./notFoundPage";
import { HomePage } from "./home";

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <AuthWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/account-type" element={<AccountType />} />
          <Route path="/register-client" element={<RegisterClient />} />
          <Route path="/register-clinic" element={<RegisterClinic />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthWrapper>
    </BrowserRouter>
  </ChakraProvider>
);
