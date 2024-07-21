import { StatusBar } from "expo-status-bar";
import { Pokedex } from "./src/app/Pokedex/index";
import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <Pokedex />
    </QueryClientProvider>
  );
}
