import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type RequestType = {
  bookId: number;
};

export const useCreateOrder = () => {
  return useMutation((data: RequestType) => {
    return axios.post("/api/order/create-order", data);
  });
};
