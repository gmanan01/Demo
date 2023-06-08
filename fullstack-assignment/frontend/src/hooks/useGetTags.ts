import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type tagType = {
  id: number;
  name: string;
};

type ResponseType = {
  tags: tagType[];
};

export const useGetTag = () => {
  return useQuery(["tag"], async () => {
    return (await axios.get<ResponseType>("/api/tag")).data;
  });
};
