import {
  Group,
  Header,
  Title,
  Text,
  Container,
  Button,
  ActionIcon,
  Anchor,
} from "@mantine/core";
import { useLoggedInUser } from "../hooks/useLoggedInUser";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import OrderPopup from "./order-popup";
import { IoLogOutOutline } from "react-icons/io5";
export default function Navbar() {
  const { data, isLoading, isError } = useLoggedInUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      window.localStorage.removeItem("authToken");
      navigate("/auth/login");
    }
  }, [isError]);

  const logout = () => {
    window.localStorage.removeItem("authToken");
    axios.defaults.headers.common.Authorization = "";
    navigate("/auth/login");
  };

  return (
    <Header
      height={{
        md: 50,
        lg: 40,
      }}
      mb="md"
    >
      <Container>
        <Group position="apart">
          <Anchor component={Link} to="/">
            <Title>Book Store</Title>
          </Anchor>
          <Group>
            <Text>Balance: {data?.user.balance}</Text>
            <OrderPopup />

            <ActionIcon size="xs" variant="light" onClick={logout}>
              <IoLogOutOutline />
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </Header>
  );
}
