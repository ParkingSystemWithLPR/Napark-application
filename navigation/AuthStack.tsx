import { Stack } from "./BaseNavigation";
import ForgetPassword from "../screens/authentication/ForgetPassword";
import LogIn from "../screens/authentication/LogIn";
import Register from "../screens/authentication/Register";

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="LogIn"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
