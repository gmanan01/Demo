import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type RequestType = {
  email: string;
  password: string;
};

export const useRegister = () => {
  return useMutation((data: RequestType) => {
    return axios.post("/api/auth/register", data);
  });
};
