import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  MainPageBottomTabParamList,
  AuthenticatedStackParamList,
} from "@/types";

export type PaymentProps = CompositeScreenProps<
  NativeStackScreenProps<MainPageBottomTabParamList, "Payment">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const Payment: React.FC<PaymentProps> = () => {
  return (
    <View>
      <SafeAreaView>
        <Text>My Payment</Text>
      </SafeAreaView>
    </View>
  );
};

export default Payment;
