import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import BaseNavigation from "./navigation/BaseNavigation";
import AuthContextProvider from "./store/context/auth";
import ParkingLotContextProvider from "./store/context/parkingLot";
import ProfileContextProvider from "./store/context/profile";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <StatusBar style="dark" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
        <GestureHandlerRootView style={{ flex: 1 }}>
          <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
              <ProfileContextProvider>
                <ParkingLotContextProvider>
                  <BottomSheetModalProvider>
                    <BaseNavigation />
                  </BottomSheetModalProvider>
                </ParkingLotContextProvider>
              </ProfileContextProvider>
            </AuthContextProvider>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </KeyboardAvoidingView>
    </>
  );
};

export default App;
