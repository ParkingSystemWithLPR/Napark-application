import { StatusBar } from "expo-status-bar";

import AuthContextProvider from "./store/context/auth";
import BaseNavigation from "./navigation/BaseNavigation";


const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <BaseNavigation />
      </AuthContextProvider>
    </>
  );
};

export default App;
