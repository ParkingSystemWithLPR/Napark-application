import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";

import IconButtonWithTitle from "@/components/button/IconButtonWithTitle";
import HeaderText from "@/components/text/HeaderText";
import SubHeaderText from "@/components/text/SubHeaderText";
import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";
import {
  MainPageBottomTabParamList,
  AuthenticatedStackParamList,
} from "@/types";

export type PaymentProps = CompositeScreenProps<
  NativeStackScreenProps<MainPageBottomTabParamList, "Payment">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const mockBalance = 555.99;

const Payment: React.FC<PaymentProps> = ({ navigation }) => {
  return (
    <BodyContainer>
      <View style={styles.card}>
        <SubHeaderText
          text="Credit Balance"
          textStyle={styles.creditBalanceText}
        />
        <HeaderText
          text={`฿ ${mockBalance}`}
          textStyle={{ color: Colors.black }}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <IconButtonWithTitle
          title="Top up"
          onPress={() => {
            navigation.navigate("PaymentStack", {
              screen: "TopUp",
              params: { balance: mockBalance },
            });
          }}
          containerStyle={styles.buttonContainer}
          textStyle={styles.textContainer}
          icon="cash"
          iconColor={Colors.green[700]}
          iconSize={40}
        />
        <IconButtonWithTitle
          title="Pay the bill"
          onPress={() => {
            navigation.navigate("PaymentStack", { screen: "PayTheBill" });
          }}
          containerStyle={styles.buttonContainer}
          textStyle={styles.textContainer}
          icon="receipt"
          iconColor={Colors.lightBlue[300]}
          iconSize={40}
        />
      </View>
    </BodyContainer>
  );
};

export default Payment;

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 30,
  },
  buttonContainer: {
    paddingHorizontal: 8,
    width: 110,
    height: 110,
  },
  textContainer: {
    color: Colors.gray[800],
    textAlign: "center",
    fontSize: 16,
  },
  card: {
    alignItems: "center",
    gap: 10,
    paddingVertical: 50,
    shadowColor: Colors.black,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    borderRadius: 16,
    backgroundColor: Colors.white,
  },
  creditBalanceText: {
    fontSize: 20,
    color: Colors.red[400],
  },
});
