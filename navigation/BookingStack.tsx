import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import IconButton from "@/components/button/IconButton";
import Colors from "@/constants/color";
import BookingDetail from "@/screens/booking/BookingDetail";
import BookingSummary from "@/screens/booking/BookingSummary";
import { AuthenticatedStackParamList, BookingStackParamList } from "@/types";

const Stack = createNativeStackNavigator<BookingStackParamList>();

export type BookingProps = NativeStackScreenProps<
  AuthenticatedStackParamList,
  "BookingStack"
>;

const BookingStack: React.FC<BookingProps> = ({ navigation }) => {
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
    </Stack.Navigator>
  );
};

export default BookingStack;
