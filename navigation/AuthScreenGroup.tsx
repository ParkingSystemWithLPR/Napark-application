import ForgetPassword from "../screens/authentication/ForgetPassword";
import LogIn from "../screens/authentication/LogIn";
import Register from "../screens/authentication/Register";

import { Stack } from "./BaseNavigation";

const AuthScreenGroup = () => {
  return (
    <Stack.Group>
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    </Stack.Group>
  );
};

export default AuthScreenGroup;
