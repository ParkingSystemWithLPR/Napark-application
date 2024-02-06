import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Register from "./screens/Register";
import LogIn from "./screens/LogIn";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LogIn">
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
