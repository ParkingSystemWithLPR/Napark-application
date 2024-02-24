import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChangePassword from "../screens/authentication/ChangePassword";
import ResetPassword from "../screens/authentication/ResetPassword";
import SplashScreen from "../screens/SplashScreen";
import { useAuth } from "../store/context/auth";
import { RootParamList } from "../types";
import AuthStack from "./AuthStack";
import AuthenticatedStack from "./AuthenticatedStack";

export const Stack = createNativeStackNavigator<RootParamList>();
export const BottomTab = createBottomTabNavigator<RootParamList>();

const BaseNavigation = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        {isAuthenticated ? (
          <Stack.Screen name="Authenticated" component={AuthenticatedStack} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default BaseNavigation;
