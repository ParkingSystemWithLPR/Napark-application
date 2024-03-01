import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainPageBottomTab from "./MainPageBottomTab";
import OtherStack from "./OtherStack";
import ResetPassword from "../screens/authentication/ResetPassword";
import { RootParamList } from "../types";

const Stack = createNativeStackNavigator<RootParamList>();

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainScreen" component={MainPageBottomTab} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="OtherStack" component={OtherStack} />
    </Stack.Navigator>
  );
};

export default AuthenticatedStack;
