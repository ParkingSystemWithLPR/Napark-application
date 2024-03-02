import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthenticatedStack from "./AuthenticatedStack";
import AuthStack from "./AuthStack";

import SplashScreen from "@/screens/SplashScreen";
import { useAuth } from "@/store/context/auth";
import { RootParamList } from "@/types";

const Stack = createNativeStackNavigator<RootParamList>();

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default BaseNavigation;
