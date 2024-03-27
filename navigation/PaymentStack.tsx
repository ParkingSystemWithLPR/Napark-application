import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import IconButton from "@/components/button/IconButton";
import Colors from "@/constants/color";
import PaymentOptions from "@/screens/payment/PaymentOptions";
import PaymentSuccessful from "@/screens/payment/PaymentSuccessful";
import PaymentSummary from "@/screens/payment/PaymentSummary";
import PayTheBill from "@/screens/payment/PayTheBill";
import TopUp from "@/screens/payment/TopUp";
import { AuthenticatedStackParamList, PaymentStackParamList } from "@/types";

const Stack = createNativeStackNavigator<PaymentStackParamList>();

export type PaymentProps = NativeStackScreenProps<
  AuthenticatedStackParamList,
  "PaymentStack"
>;

const PaymentStack: React.FC<PaymentProps> = ({ navigation }) => {
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
        name="PayTheBill"
        component={PayTheBill}
        options={{
          title: "Pay the bill",
          headerLeft: backToPreviousPage,
        }}
      />
      <Stack.Screen
        name="PaymentSummary"
        component={PaymentSummary}
        options={{
          title: "Pay the bill",
          headerBackTitle: "Back",
        }}
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

export default PaymentStack;
