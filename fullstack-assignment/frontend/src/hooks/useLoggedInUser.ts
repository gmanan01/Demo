import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type ResponseType = {
  user: {
    email: string;
    balance: number;
  };
};

export const useLoggedInUser = () => {
  return useQuery(["profile"], async () => {
    return (await axios.get<ResponseType>("/api/profile")).data;
  });
};
