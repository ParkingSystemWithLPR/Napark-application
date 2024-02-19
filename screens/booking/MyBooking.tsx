import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootBottomTabParamList } from "../../types";

export type MyBookingProps = {} & NativeStackScreenProps<
  RootBottomTabParamList,
  "MyBooking"
>;

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
