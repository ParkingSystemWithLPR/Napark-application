import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootParamList } from "../../types";

export type OtherProps = {} & NativeStackScreenProps<RootParamList, "Other">;

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
