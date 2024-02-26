import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllBookings from "../screens/booking/AllBookings";
import MyBooking from "../screens/booking/MyBooking";
import { RootParamList } from "../types";

const Stack = createNativeStackNavigator<RootParamList>();

const MyBookingStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyBooking"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen name="MyBooking" component={MyBooking} options={{ headerTitle: "Booking history" }} />
      <Stack.Screen name="AllBookings" component={AllBookings} options={{ headerTitle: "", headerBackTitle: "Back" }} />
    </Stack.Navigator>
  );
};

export default MyBookingStack;
