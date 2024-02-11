import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import { RootStackParamList } from "./types";
import Splash from "./screens/Splash";
import Register from "./screens/authentication/Register";
import LogIn from "./screens/authentication/LogIn";
import ForgetPassword from "./screens/authentication/ForgetPassword";
import ChangePassword from "./screens/authentication/ChangePassword";
import ResetPassword from "./screens/authentication/ResetPassword";

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            options={{ headerShown: false }}
            component={Splash}
          />
          <Stack.Screen
            name="LogIn"
            options={{ headerShown: false }}
            component={LogIn}
          />
          <Stack.Screen
            name="Register"
            options={{ headerShown: false }}
            component={Register}
          />
          <Stack.Screen
            name="ForgetPassword"
            options={{ headerShown: false }}
            component={ForgetPassword}
          />
          <Stack.Screen
            name="ChangePassword"
            options={{ headerShown: false }}
            component={ChangePassword}
          />
          <Stack.Screen
            name="ResetPassword"
            options={{ headerShown: false }}
            component={ResetPassword}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
