import {
  Alert,
  Anchor,
  Button,
  Container,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useLogin } from "../hooks/useLogin";
import { authValidation } from "../validation/auth";
export default function Login() {
  const { getInputProps, onSubmit } = useForm<z.infer<typeof authValidation>>({
    validate: zodResolver(authValidation),
  });
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const submitLogin = onSubmit((data) => {
    loginMutation.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (data) => {
          window.localStorage.setItem("authToken", data.data.token);
          axios.defaults.headers.common.Authorization = `Bearer ${window.localStorage.getItem(
            "authToken"
          )}`;
          navigate("/");
        },
      }
    );
  });

  return (
    <Container size="xs">
      <Title>Login</Title>
      {loginMutation.isError && (
        <Alert>
          {loginMutation.error?.response?.data?.message ??
            "Something Went Wrong"}
        </Alert>
      )}
      <form onSubmit={submitLogin}>
        <Stack>
          <TextInput {...getInputProps("email")} label="Email" />
          <TextInput {...getInputProps("password")} label="Password" />
          <Button
            loading={loginMutation.isLoading}
            disabled={loginMutation.isLoading}
            type="submit"
            fullWidth
          >
            Login
          </Button>
        </Stack>
      </form>
      <Anchor component={Link} to="/auth/register">
        Don't have an account?
      </Anchor>
    </Container>
  );
}
