import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type OrderType = {
  id: number;
  price: number;
  book: {
    name: string;
    imageUrl: string;
    id: number;
  };
};

type ResponseType = {
  orders: OrderType[];
};

export const useGetOrders = () => {
  return useQuery(["orders"], async () => {
    return (await axios.get<ResponseType>("/api/order")).data;
  });
};
