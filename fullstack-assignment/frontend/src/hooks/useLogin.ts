import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type RequestType = {
  email: string;
  password: string;
};
type ResponseType = {
  token: string;
};

export const useLogin = () => {
  return useMutation((data: RequestType) => {
    return axios.post<ResponseType>("/api/auth/login", data);
  });
};
