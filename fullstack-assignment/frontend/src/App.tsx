import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import Router from "./router";
const queryClient = new QueryClient();
axios.defaults.baseURL = "http://localhost:3000";

export default function App() {
  axios.defaults.headers.common.Authorization = `Bearer ${window.localStorage.getItem(
    "authToken"
  )}`;
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </MantineProvider>
  );
}
