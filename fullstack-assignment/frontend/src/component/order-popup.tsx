import { ActionIcon, Anchor, CheckIcon, Indicator } from "@mantine/core";
import { RiShoppingCartLine } from "react-icons/ri";
import { useGetOrders } from "../hooks/useGetOrders";
import { Link } from "react-router-dom";
export default function OrderPopup() {
  const { data, isLoading } = useGetOrders();

  if (isLoading) {
    return null;
  }
  return (
    <Anchor component={Link} to="/orders">
      <Indicator
        inline
        label={data?.orders.length}
        size={15}
        disabled={data?.orders.length === 0}
      >
        <ActionIcon>
          <RiShoppingCartLine />
        </ActionIcon>
      </Indicator>
    </Anchor>
  );
}
