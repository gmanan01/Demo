import {
  Anchor,
  Button,
  Container,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { authValidation } from "../validation/auth";
import { z } from "zod";
import { useRegister } from "../hooks/useRegister";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const { getInputProps, onSubmit } = useForm<z.infer<typeof authValidation>>({
    validate: zodResolver(authValidation),
  });
  const navigate = useNavigate();
  const registerMutation = useRegister();
  const submitRegister = onSubmit((data) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        navigate("/auth/login");
      },
    });
  });

  return (
    <Container size="xs">
      <Title>Register</Title>
      <form onSubmit={submitRegister}>
        <Stack>
          <TextInput {...getInputProps("email")} label="Email" />
          <TextInput {...getInputProps("password")} label="Password" />
          <Button
            loading={registerMutation.isLoading}
            disabled={registerMutation.isLoading}
            type="submit"
            fullWidth
          >
            Login
          </Button>
        </Stack>
      </form>
      <Anchor component={Link} to="/auth/login">
        Already have an account?
      </Anchor>
    </Container>
  );
}
