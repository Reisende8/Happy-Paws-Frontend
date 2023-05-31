import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../home";
import { LogIn } from "../logIn";
import { RegisterClient } from "../register/RegisterClient";
import { AccountType } from "../register/AccountTypeComponent";
import { RegisterClinic } from "../register/RegisterClinic";
import { NotFoundPage } from "../notFoundPage";
import { AuthContext } from "../auth";
import { ActivateAccount } from "../activateAccount";

export const RoutesComponent: React.FC = () => {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/activate-account" element={<ActivateAccount />} />
      {!user && (
        <>
          <Route path="/login" element={<LogIn />} />
          <Route path="/account-type" element={<AccountType />} />
          <Route path="/register-client" element={<RegisterClient />} />
          <Route path="/register-clinic" element={<RegisterClinic />} />
        </>
      )}
      {user?.roleId === 0 && (
        <>
          <Route path="/appointments" element={<>Appointments</>} />
        </>
      )}
      {user?.roleId === 1 && (
        <>
          <Route path="/medics" element={<>Medics</>} />
        </>
      )}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
