import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type RequestType = {
  tag?: number;
};

type Book = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  tags: { name: string }[];
  writer: { name: string };
};
type ResponseType = {
  books: Book[];
  totalBooks: number;
  hasMore: boolean;
  nextPage: number;
};

export const useAllBooks = (req: RequestType) => {
  return useInfiniteQuery(
    ["books", req?.tag],
    async ({ pageParam = 0 }) => {
      if (req.tag) {
        const { data } = await axios.get<ResponseType>(
          `/api/book?tagId=${req.tag}&page=${pageParam}`
        );
        return data;
      }

      const { data } = await axios.get<ResponseType>(
        `/api/book?page=${pageParam}`
      );
      return data;
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextPage : undefined,
      getPreviousPageParam: (firstPage) =>
        firstPage.hasMore ? firstPage.nextPage - 2 : undefined,
    }
  );
};
