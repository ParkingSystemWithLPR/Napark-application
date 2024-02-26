import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AuthContextProvider from "./store/context/auth";
import BaseNavigation from "./navigation/BaseNavigation";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <BaseNavigation />
        </QueryClientProvider>
      </AuthContextProvider>
    </>
  );
};

export default App;
