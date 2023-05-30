import React, { PropsWithChildren, createContext } from "react";
import { useAuth } from "./useAuth";
import { UseAuthInterface } from "./types";

export const AuthContext = createContext<UseAuthInterface>(
  {} as UseAuthInterface
);

export const AuthWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
