import React, { useContext } from "react";
import { AuthContext } from "../auth";
import { ClinicInterface } from "../auth/types";

export const HomePage: React.FC = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div>
      Logged in as {user ? user.roleId : "not logged in"}{" "}
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};
