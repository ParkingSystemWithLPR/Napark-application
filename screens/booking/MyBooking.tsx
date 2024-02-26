import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootParamList } from "../../types";

export type MyBookingProps = NativeStackScreenProps<RootParamList, "MyBooking">;

const MyBooking: React.FC<MyBookingProps> = () => {
  return (
    <View>
      <SafeAreaView>
        <Text>My booking</Text>
      </SafeAreaView>
    </View>
  );
};

export default MyBooking;
