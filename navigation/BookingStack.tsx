import BookingSummary from "../screens/booking/BookingSummary";
import MyBooking from "../screens/booking/MyBooking";

import { Stack } from "./BaseNavigation";

const BookingStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyBooking"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen name="MyBooking" component={MyBooking} />
      <Stack.Screen name="BookingSummary" component={BookingSummary} />
    </Stack.Navigator>
  );
};

export default BookingStack;
