import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import IconButton from "../components/button/IconButton";
import Colors from "../constants/color";
import BookingSummary from "../screens/booking/BookingSummary";
import { RootParamList } from "../types";

const Stack = createNativeStackNavigator<RootParamList>();

const BookingStack = () => {
  const navigation = useNavigation();

  const backToOtherPage = () => {
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
        name="BookingSummary"
        component={BookingSummary}
        options={{
          title: "Booking summary",
          headerLeft: backToOtherPage,
        }}
      />
    </Stack.Navigator>
  );
};

export default BookingStack;
