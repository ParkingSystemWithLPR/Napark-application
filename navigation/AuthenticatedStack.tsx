import { Stack } from "./BaseNavigation";
import MainPageBottomTab from "./MainPageBottomTab";

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainScreen" component={MainPageBottomTab} />
    </Stack.Navigator>
  );
};

export default AuthenticatedStack;
