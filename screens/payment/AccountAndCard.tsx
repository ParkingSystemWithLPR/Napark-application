import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import AccountTabContent from "@/components/payment/AccountTabContent";
import CardTabContent from "@/components/payment/CardTabContent";
import TabsContainer from "@/components/ui/TabsContainer";
import { MainPageBottomTabParamList, PaymentStackParamList } from "@/types";

export type AccountAndCardProps = CompositeScreenProps<
  NativeStackScreenProps<MainPageBottomTabParamList, "Payment">,
  NativeStackScreenProps<PaymentStackParamList>
>;

const AccountTab = () => <AccountTabContent />;
const CardTab = () => <CardTabContent />;

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
