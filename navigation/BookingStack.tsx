import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookingSummary from "../screens/booking/BookingSummary";
import MyBooking from "../screens/booking/MyBooking";
import { RootParamList } from "../types";

const Stack = createNativeStackNavigator<RootParamList>();

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
