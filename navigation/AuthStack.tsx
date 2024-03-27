import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import ForgetPassword from "@/screens/authentication/ForgetPassword";
import LogIn from "@/screens/authentication/LogIn";
import Register from "@/screens/authentication/Register";
import { AuthStackParamList, RootParamList } from "@/types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export type AuthProps = NativeStackScreenProps<RootParamList, "Auth">;

const AuthStack: React.FC<AuthProps> = () => {
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
