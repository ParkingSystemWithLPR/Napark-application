import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Colors from "@/constants/color";
import BookingDetail from "@/screens/booking/BookingDetail";
import BookingSummary from "@/screens/booking/BookingSummary";
import { BookingStackParamList } from "@/types";

const Stack = createNativeStackNavigator<BookingStackParamList>();

const BookingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.red[400].toString(),
        },
        headerTitleStyle: {
          fontSize: 18,
        },
        headerTintColor: Colors.white.toString(),
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="BookingDetail"
        component={BookingDetail}
        options={{
          title: "Booking detail",
        }}
      />
      <Stack.Screen
        name="BookingSummary"
        component={BookingSummary}
        options={{
          title: "Booking summary",
          headerBackTitle: "back",
        }}
      />
    </Stack.Navigator>
  );
};

export default BookingStack;
