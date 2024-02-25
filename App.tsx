import { StatusBar } from "expo-status-bar";

import BaseNavigation from "./navigation/BaseNavigation";
import AuthContextProvider from "./store/context/auth";

const App = () => {
  return (
    <>
      <StatusBar style="dark" />
      <AuthContextProvider>
        <BaseNavigation />
      </AuthContextProvider>
    </>
  );
};

export default App;
