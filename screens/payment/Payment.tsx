import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootBottomTabParamList } from "../../types";

export type PaymentProps = {} & NativeStackScreenProps<
  RootBottomTabParamList,
  "Payment"
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
