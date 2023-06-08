import {
  Center,
  Container,
  Loader,
  Paper,
  Stack,
  Image,
  Text,
  Title,
  Card,
  Button,
  SimpleGrid,
} from "@mantine/core";
import { useGetOrders } from "../hooks/useGetOrders";
import { useCancelOrder } from "../hooks/useCancelOrder";
import { useQueryClient } from "@tanstack/react-query";

export default function Orders() {
  const { data, isLoading } = useGetOrders();

  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  return (
    <Container size="xl">
      <Title order={3} mb="lg">
        Your Orders
      </Title>
      {data?.orders.length === 0 && (
        <Center>
          <Text>Please Order Something</Text>
        </Center>
      )}
      <SimpleGrid
        breakpoints={[
          { minWidth: "85rem", cols: 4, spacing: "md" },
          { minWidth: "62rem", cols: 3, spacing: "md" },
          { minWidth: "36rem", cols: 2, spacing: "sm" },
          { maxWidth: "36rem", cols: 1, spacing: "sm" },
        ]}
      >
        {data?.orders.map((e) => (
          <CancelBookCard
            imageUrl={e.book.imageUrl}
            name={e.book.name}
            orderId={e.id}
            price={e.price}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}

type BookCardProps = {
  name: string;
  imageUrl: string;
  orderId: number;
  price: number;
};
const CancelBookCard = (props: BookCardProps) => {
  const cancelOrder = useCancelOrder();
  const queryClient = useQueryClient();
  return (
    <Card w={250} withBorder>
      <Card.Section>
        <Image
          height={350}
          width={250}
          fit="cover"
          src={props.imageUrl}
          alt={props.name}
        />
      </Card.Section>
      <Stack spacing={2}>
        <Title order={3} lineClamp={1}>
          {props.name}
        </Title>

        <Text lineClamp={1}>{props.price}Rs.</Text>
        <Button
          loading={cancelOrder.isLoading}
          disabled={cancelOrder.isLoading}
          onClick={() => {
            cancelOrder.mutate(
              {
                orderId: props.orderId,
              },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries(["orders"]);
                  queryClient.refetchQueries(["profile"]);
                },
              }
            );
          }}
          fullWidth
          color="red"
          size="xs"
          variant="light"
        >
          Cancel Order
        </Button>
      </Stack>
    </Card>
  );
};
