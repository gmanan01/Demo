import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useCreateOrder } from "../hooks/useCreateOrder";
import { useQueryClient } from "@tanstack/react-query";
import { useLoggedInUser } from "../hooks/useLoggedInUser";

type BookCardProps = {
  name: string;
  author: string;
  price: number;
  image: string;
  id: number;
  tags: string[];
};
export default function BookCard(props: BookCardProps) {
  const createOrder = useCreateOrder();
  const queryClient = useQueryClient();
  const { data: userData } = useLoggedInUser();

  return (
    <Card w={250} withBorder>
      <Card.Section>
        <Image
          height={350}
          width={250}
          fit="cover"
          src={props.image}
          alt={props.name}
        />
      </Card.Section>
      <Stack spacing={2} mt="md">
        <Group>
          {props.tags.map((e) => (
            <Badge size="xs" key={e}>
              {e}
            </Badge>
          ))}
        </Group>
        <Title order={5} lineClamp={1}>
          {props.name}
        </Title>
        <Text color="dimmed" size="xs" lineClamp={1}>
          {props.author}
        </Text>
        <Text lineClamp={1}>{props.price}Rs.</Text>
        <Button
          loading={createOrder.isLoading}
          disabled={createOrder.isLoading}
          onClick={() => {
            if (userData && userData?.user.balance < props.price) {
              alert("You don't have enough balance");
              return;
            }

            createOrder.mutate(
              {
                bookId: props.id,
              },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries(["profile"]);
                  queryClient.invalidateQueries(["orders"]);
                },
              }
            );
          }}
          fullWidth
          variant="light"
        >
          Order Now
        </Button>
      </Stack>
    </Card>
  );
}
