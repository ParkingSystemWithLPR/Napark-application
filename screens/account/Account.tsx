import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootParamList } from "../../types";

export type AccountProps = {} & NativeStackScreenProps<
  RootParamList,
  "Account"
>;

const Account: React.FC<AccountProps> = () => {
  return (
    <View>
      <SafeAreaView>
        <Text>My Account</Text>
      </SafeAreaView>
    </View>
  );
};

export default Account;
