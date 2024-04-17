import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import BaseNavigation from "./navigation/BaseNavigation";
import AuthContextProvider from "./store/context/auth";
import ProfileContextProvider from "./store/context/profile";
import ParkingLotContextProvider from "./store/context/parkingLot";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <StatusBar style="dark" />
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
    </>
  );
};

export default App;
