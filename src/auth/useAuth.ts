import { useToast } from "@chakra-ui/react";
import { LogInInterface } from "../logIn/types";
import {
  RegisterClientInterface,
  RegisterClinicInterface,
} from "../register/types";
import { ClientInterface, ClinicInterface, UseAuth } from "./types";
import { apiClient, authorize } from "../utils/apiClient";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth: UseAuth = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<ClientInterface | ClinicInterface | null>(
    null
  );
  const [didMount, setDidMount] = useState<boolean>(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: { roleId: number } = jwt_decode(token);
      getUserDetails(decoded.roleId);
    } else {
      setDidMount(true);
    }
  }, []);

  const getUserDetails = async (roleId: number) => {
    await apiClient
      .get(
        roleId === 0
          ? "/api/user/get-client-details"
          : "/api/user/get-clinic-details",
        authorize()
      )
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err);
        return toast({
          title: "ERROR",
          status: "error",
          position: "top-right",
          description: `${err.response.data.message}`,
        });
      })
      .finally(() => setDidMount(true));
  };

  const logIn = async (logInData: LogInInterface) => {
    await apiClient
      .post("/api/user/login", logInData)
      .then(async (res) => {
        localStorage.setItem("token", res.data.token);
        const decoded: { roleId: number } = jwt_decode(res.data.token);
        await getUserDetails(decoded.roleId);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        return toast({
          title: "ERROR",
          status: "error",
          position: "top-right",
          description: `${err.response.data.message}`,
        });
      });
  };

  const registerClient = async (
    registerClientData: RegisterClientInterface
  ) => {
    await apiClient
      .post("/api/user/register-client", registerClientData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
        return toast({
          title: "ERROR",
          status: "error",
          position: "top-right",
          description: `${err.response.data.message}`,
        });
      });
  };
  const registerClinic = async (
    registerClinicData: RegisterClinicInterface
  ) => {
    await apiClient
      .post("/api/user/register-clinic", registerClinicData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
        return toast({
          title: "ERROR",
          status: "error",
          position: "top-right",
          description: `${err.response.data.message}`,
        });
      });
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };
  return { logIn, registerClient, registerClinic, logOut, user, didMount };
};
