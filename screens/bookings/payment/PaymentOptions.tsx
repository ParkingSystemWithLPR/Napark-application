import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

import ChangeScreenTab from "@/components/button/ChangeScreenTab";
import SubHeaderText from "@/components/text/SubHeaderText";
import BodyContainer from "@/components/ui/BodyContainer";
import { AuthenticatedStackParamList, BookingsStackParamList } from "@/types";

export type PaymentOptionsProps = CompositeScreenProps<
  NativeStackScreenProps<BookingsStackParamList, "PaymentOptions">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  navigation,
  route,
}) => {
  return (
    <BodyContainer>
      <SubHeaderText
        text="Choose payment option"
        containerStyle={styles.subHeaderText}
      />
      <ChangeScreenTab
        icon="qrcode"
        screenName="QR Code"
        onPress={() =>
          navigation.navigate("BookingsStack", {
            screen: "PaymentQRcode",
            params: {
              amount: route.params.amount,
            },
          })
        }
      />
    </BodyContainer>
  );
};

export default PaymentOptions;

const styles = StyleSheet.create({
  subHeaderText: {
    paddingBottom: 20,
  },
});
