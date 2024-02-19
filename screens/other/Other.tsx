import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootBottomTabParamList } from "../../types";

export type OtherProps = {} & NativeStackScreenProps<
  RootBottomTabParamList,
  "Other"
>;

const Other: React.FC<OtherProps> = () => {
  return (
    <View>
      <SafeAreaView>
        <Text>Other</Text>
      </SafeAreaView>
    </View>
  );
};

export default Other;
