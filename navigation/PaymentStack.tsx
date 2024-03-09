import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import IconButton from "@/components/button/IconButton";
import Colors from "@/constants/color";
import AccountAndCard from "@/screens/payment/AccountAndCard";
import Payment from "@/screens/payment/Payment";
import PayTheBill from "@/screens/payment/PayTheBill";
import ScanQR from "@/screens/payment/ScanQR";
import { PaymentStackParamList } from "@/types";

const Stack = createNativeStackNavigator<PaymentStackParamList>();

const PaymentStack = () => {
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
        name="Payment"
        component={Payment}
        options={{
          title: "Payment",
          headerLeft: backToOtherPage,
        }}
      />
      <Stack.Screen
        name="AccountAndCard"
        component={AccountAndCard}
        options={{
          title: "Account and Card",
          headerLeft: backToOtherPage,
        }}
      />
      <Stack.Screen
        name="ScanQR"
        component={ScanQR}
        options={{
          title: "Scan QR",
          headerLeft: backToOtherPage,
        }}
      />
      <Stack.Screen
        name="PayTheBill"
        component={PayTheBill}
        options={{
          title: "Pay the bill",
          headerLeft: backToOtherPage,
        }}
      />
    </Stack.Navigator>
  );
};

export default PaymentStack;
