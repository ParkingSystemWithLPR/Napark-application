import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HttpStatusCode } from "axios";
import { useLayoutEffect } from "react";
import { Alert } from "react-native";

import BookingStack from "./BookingStack";
import MainPageBottomTab from "./MainPageBottomTab";
import OtherStack from "./OtherStack";

import ResetPassword from "@/screens/authentication/ResetPassword";
import { useGetProfile } from "@/store/api/user/useGetProfile";
import { useAuth } from "@/store/context/auth";
import { useProfile } from "@/store/context/profile";
import { RootParamList } from "@/types";

const Stack = createNativeStackNavigator<RootParamList>();

const AuthenticatedStack = () => {
  const { accessToken, authenticate, logout } = useAuth();
  const { setProfile } = useProfile();
  const getProfile = useGetProfile({ auth: { accessToken, authenticate } });
  useLayoutEffect(() => {
    if (getProfile.isSuccess) {
      setProfile(getProfile.data);
    } else if (getProfile.isError) {
      if (getProfile.error.status === HttpStatusCode.Unauthorized) {
        logout();
      } else {
        Alert.alert("Failed to get the profile", getProfile.error.message);
      }
    }
  }, [getProfile.data]);

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
      <Stack.Screen name="BookingStack" component={BookingStack} />
    </Stack.Navigator>
  );
};

export default AuthenticatedStack;
