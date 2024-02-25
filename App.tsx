import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import BaseNavigation from "./navigation/BaseNavigation";
import AuthContextProvider from "./store/context/auth";

const App = () => {
  return (
    <>
      <StatusBar style="dark" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthContextProvider>
          <BottomSheetModalProvider>
            <BaseNavigation />
          </BottomSheetModalProvider>
        </AuthContextProvider>
      </GestureHandlerRootView>
    </>
  );
};

export default App;
