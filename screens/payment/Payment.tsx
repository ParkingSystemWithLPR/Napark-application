import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootParamList } from "@/types";

export type PaymentProps = NativeStackScreenProps<RootParamList, "Payment">;

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
