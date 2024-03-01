import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  DefaultOptions,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import BaseNavigation from "./navigation/BaseNavigation";
import AuthContextProvider from "./store/context/auth";

const useSetUpQueryClient = () => {
  const queryClient = new QueryClient();
  const defaultOptions: DefaultOptions<AxiosError<unknown>> = {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      refetchInterval: 0,
    },
    mutations: {
      // NOTE: temporary fix multi error modal
      // onError: (error) => {
      //   // handleError({ error, errorModal });
      // },
    },
  };
  queryClient.setDefaultOptions(defaultOptions);
  return queryClient;
};

const App = () => {
  const queryClient = useSetUpQueryClient();

  return (
    <>
      <StatusBar style="dark" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthContextProvider>
          <QueryClientProvider client={queryClient}>
            <BottomSheetModalProvider>
              <BaseNavigation />
            </BottomSheetModalProvider>
          </QueryClientProvider>
        </AuthContextProvider>
      </GestureHandlerRootView>
    </>
  );
};

export default App;
