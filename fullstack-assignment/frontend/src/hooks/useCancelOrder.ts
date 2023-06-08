import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type RequestType = {
  orderId: number;
};

export const useCancelOrder = () => {
  return useMutation((data: RequestType) => {
    return axios.post("/api/order/cancel-order", data);
  });
};
