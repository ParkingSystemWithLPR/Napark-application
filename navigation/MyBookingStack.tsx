import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllBookings from "../screens/booking/AllBookings";
import MyBooking from "../screens/booking/MyBooking";
import { RootParamList } from "../types";

const Stack = createNativeStackNavigator<RootParamList>();

const MyBookingStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyBooking"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MyBooking" component={MyBooking} />
      <Stack.Screen name="AllBookings" component={AllBookings} />
    </Stack.Navigator>
  );
};

export default MyBookingStack;
