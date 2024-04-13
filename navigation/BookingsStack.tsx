import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import IconButton from "@/components/button/IconButton";
import Colors from "@/constants/color";
import BookingDetail from "@/screens/bookings/booking/BookingDetail";
import BookingSummary from "@/screens/bookings/booking/BookingSummary";
import PaymentOptions from "@/screens/bookings/payment/PaymentOptions";
import PaymentSuccessful from "@/screens/bookings/payment/PaymentSuccessful";
import PaymentSummary from "@/screens/bookings/payment/PaymentSummary";
import TopUp from "@/screens/bookings/payment/TopUp";
import { AuthenticatedStackParamList, BookingsStackParamList } from "@/types";

const Stack = createNativeStackNavigator<BookingsStackParamList>();

export type BookingsProps = NativeStackScreenProps<
  AuthenticatedStackParamList,
  "BookingsStack"
>;

const BookingsStack: React.FC<BookingsProps> = ({ navigation }) => {
  const backToPreviousPage = () => {
    return (
      <IconButton
        icon={"chevron-left"}
        size={28}
        color={Colors.white}
        buttonStyle={{ padding: 0 }}
        onPress={() => navigation.goBack()}
      />
    );
  };

  const selectHeaderTitle = (bookingStatus: BookingStatus) => {
    switch (bookingStatus) {
      case BookingStatus.UPCOMING:
        return "Upcoming Booking";
      case BookingStatus.ACTIVE:
        return "Active Booking";
      default:
        return "Complete Booking";
    }
  };
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
          headerLeft: backToPreviousPage,
        }}
      />
      <Stack.Screen
        name="BookingSummary"
        component={BookingSummary}
        options={{
          title: "Booking summary",
        }}
      />
      <Stack.Screen
        name="TopUp"
        component={TopUp}
        options={{
          title: "Top up",
          headerLeft: backToPreviousPage,
        }}
      />
      <Stack.Screen
        name="PaymentOptions"
        component={PaymentOptions}
        options={{
          title: "Payment Options",
        }}
      />
      <Stack.Screen
        name="PaymentSummary"
        component={PaymentSummary}
        options={({ route }) => ({
          title: selectHeaderTitle(route.params.booking.status),
          headerBackTitle: "Back",
          headerLeft: backToPreviousPage,
        })}
      />
      <Stack.Screen
        name="PaymentSuccessful"
        component={PaymentSuccessful}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default BookingsStack;
