import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";

import AccountTabContent from "@/components/payment/AccountTabContent";
import TabsContainer from "@/components/ui/TabsContainer";
import { MainPageBottomTabParamList, PaymentStackParamList } from "@/types";

export type AccountAndCardProps = CompositeScreenProps<
  NativeStackScreenProps<MainPageBottomTabParamList, "Payment">,
  NativeStackScreenProps<PaymentStackParamList>
>;

const AccountTab = () => <AccountTabContent />;
const CardTab = () => (
  <View>
    <Text>Card Tab</Text>
  </View>
);

const AccountAndCard: React.FC<AccountAndCardProps> = () => {
  return (
    <TabsContainer
      leftTabName="Account"
      leftTabContent={AccountTab}
      rightTabName="Card"
      rightTabContent={CardTab}
    />
  );
};

export default AccountAndCard;
