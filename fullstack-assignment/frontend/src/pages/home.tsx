import {
  ActionIcon,
  Center,
  Container,
  Group,
  Loader,
  Select,
  SimpleGrid,
  Stack,
} from "@mantine/core";
import BookCard from "../component/book-card";
import { useAllBooks } from "../hooks/useAllBooks";
import { useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { useGetTag } from "../hooks/useGetTags";
import { RxCross1 } from "react-icons/rx";
const imageUrl =
  "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg";
export default function Home() {
  const [selectedTag, setSelectedTag] = useState<undefined | number>(undefined);

  const {
    isLoading,
    fetchNextPage,
    hasNextPage,
    data,
    isFetchingNextPage,
    isSuccess,
  } = useAllBooks({
    tag: selectedTag,
  });

  const { data: allTagsData } = useGetTag();

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

    if (
      scrollPercentage >= 80 &&
      !isLoading &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  const handleScrollDebounced = debounce(handleScroll, 200);

  useEffect(() => {
    if (data?.pageParams.length === 1) {
      window.addEventListener("scroll", handleScrollDebounced);
      return () => {
        window.removeEventListener("scroll", handleScrollDebounced);
      };
    }
  }, [isLoading]);

  return (
    <Stack m="sm">
      <Group>
        <Select
          clearable
          data={
            allTagsData?.tags.map((e) => ({
              value: e.id.toString(),
              label: e.name,
            })) ?? []
          }
          placeholder="Select Tag"
          value={selectedTag?.toString()}
          onChange={(e) => {
            setSelectedTag(Number(e));
          }}
        />
      </Group>
      <SimpleGrid
        breakpoints={[
          { minWidth: "85rem", cols: 5, spacing: "md" },
          { minWidth: "62rem", cols: 4, spacing: "md" },
          { minWidth: "36rem", cols: 2, spacing: "sm" },
          { maxWidth: "36rem", cols: 1, spacing: "sm" },
        ]}
      >
        {data?.pages
          .flatMap((page) => page)
          .flatMap((data) => data.books)
          .map((e) => (
            <BookCard
              tags={e.tags.map((e) => e.name)}
              key={e.id}
              author={e.writer.name}
              image={e.imageUrl}
              id={e.id}
              name={e.name}
              price={e.price}
            />
          ))}
        {isFetchingNextPage && <Loader />}
      </SimpleGrid>
    </Stack>
  );
}
