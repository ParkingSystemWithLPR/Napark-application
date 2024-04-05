import { StyleSheet } from "react-native";

import ChangeScreenTab from "@/components/button/ChangeScreenTab";
import SubHeaderText from "@/components/text/SubHeaderText";
import BodyContainer from "@/components/ui/BodyContainer";

interface PaymentOptionsProps {}

const PaymentOptions: React.FC<PaymentOptionsProps> = () => {
  return (
    <BodyContainer>
      <SubHeaderText
        text="Choose payment option"
        containerStyle={styles.subHeaderText}
      />
      <ChangeScreenTab icon="qrcode" screenName="QR Code" onPress={() => {}} />
    </BodyContainer>
  );
};

export default PaymentOptions;

const styles = StyleSheet.create({
  subHeaderText: {
    paddingBottom: 20,
  },
});
