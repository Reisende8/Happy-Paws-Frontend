import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ActivateAccount } from "../activateAccount";
import { AuthContext } from "../auth";
import { HomePage } from "../home";
import { LogIn } from "../logIn";
import { NotFoundPage } from "../notFoundPage";
import { AccountType } from "../register/AccountTypeComponent";
import { RegisterClient } from "../register/RegisterClient";
import { RegisterClinic } from "../register/RegisterClinic";
import { Box } from "@chakra-ui/react";

export const RoutesComponent: React.FC = () => {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {!user && (
        <>
          <Route path="/login" element={<LogIn />} />
          <Route path="/account-type" element={<AccountType />} />
          <Route path="/register-client" element={<RegisterClient />} />
          <Route path="/register-clinic" element={<RegisterClinic />} />
          <Route path="/activate-account" element={<ActivateAccount />} />
        </>
      )}
      {user?.roleId === 0 && (
        <>
          <Route path="/appointments" element={<>Appointments</>} />
          <Route path="/client-profile" element={<>Client Profile</>} />
        </>
      )}
      {user?.roleId === 1 && (
        <>
          <Route path="/medics" element={<>Medics</>} />
          <Route path="/clinic-profile" element={<>Clinic Profile</>} />
        </>
      )}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
