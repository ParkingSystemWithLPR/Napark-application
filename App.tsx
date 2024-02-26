import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import BaseNavigation from "./navigation/BaseNavigation";
import AuthContextProvider from "./store/context/auth";

const App = () => {
  const queryClient = new QueryClient();

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
