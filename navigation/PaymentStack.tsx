import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import IconButton from "@/components/button/IconButton";
import Colors from "@/constants/color";
import PaymentOptions from "@/screens/payment/PaymentOptions";
import PayTheBill from "@/screens/payment/PayTheBill";
import TopUp from "@/screens/payment/TopUp";
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
        name="TopUp"
        component={TopUp}
        options={{
          title: "Top up",
          headerLeft: backToOtherPage,
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
