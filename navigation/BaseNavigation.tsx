import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCallback } from "react";

import AuthenticatedStack from "./AuthenticatedStack";
import AuthStack from "./AuthStack";

import SplashScreen from "@/screens/SplashScreen";
import { useAuth } from "@/store/context/auth";
import { RootParamList } from "@/types";

const Stack = createNativeStackNavigator<RootParamList>();

const BaseNavigation = () => {
  const { isAuthenticated } = useAuth();

  const getAppStack = useCallback(() => {
    console.log(isAuthenticated);
    return isAuthenticated ? (
      <Stack.Screen name="Authenticated" component={AuthenticatedStack} />
    ) : (
      <Stack.Screen name="Auth" component={AuthStack} />
    );
  }, [isAuthenticated]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        {getAppStack()}
        <Stack.Screen name="Splash" component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default BaseNavigation;
