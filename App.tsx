import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import { RootStackParamList } from "./types";
import Register from "./screens/Register";
import LogIn from "./screens/LogIn";
import Splash from "./screens/Splash";

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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
