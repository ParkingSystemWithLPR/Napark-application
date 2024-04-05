import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import SecondaryButton from "@/components/button/SecondaryButton";
import PrimaryButton from "@/components/button/PrimaryButton";
import TextInput from "@/components/input/TextInput";
import BodyText from "@/components/text/BodyText";
import SubHeaderText from "@/components/text/SubHeaderText";
import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";
import { InputType } from "@/enum/InputType";
import { AuthenticatedStackParamList, BookingsStackParamList } from "@/types";

type DoubleButtonProps = {
  leftAmount: number;
  rightAmount: number;
  onPress: (amount: number) => void;
  currentAmount: number;
};

export type TopUpProps = CompositeScreenProps<
  NativeStackScreenProps<BookingsStackParamList, "TopUp">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const DoubleButton: React.FC<DoubleButtonProps> = ({
  leftAmount,
  rightAmount,
  onPress,
  currentAmount,
}) => {
  return (
    <View style={styles.doubleButtonContainer}>
      <SecondaryButton
        title={`฿ ${leftAmount}`}
        onPress={() => onPress(leftAmount)}
        outerContainerStyle={styles.doubleButton}
        buttonStyle={{
          backgroundColor:
            currentAmount === leftAmount ? Colors.red[400] : Colors.gray[700],
        }}
      />
      <SecondaryButton
        title={`฿ ${rightAmount}`}
        onPress={() => onPress(rightAmount)}
        outerContainerStyle={styles.doubleButton}
        buttonStyle={{
          backgroundColor:
            currentAmount === rightAmount ? Colors.red[400] : Colors.gray[700],
        }}
      />
    </View>
  );
};

const TopUp: React.FC<TopUpProps> = ({ navigation, route }) => {
  const { balance } = route.params;
  const [amount, setAmount] = useState<number>(100);
  const [isShowErrorText, setIsShowErrorText] = useState<boolean>(false);
  const MINIMUM_AMOUNT = 50;

  useEffect(() => {
    if (isShowErrorText) setIsShowErrorText(false);
  }, [amount]);

  const onPressButton = (amount: number) => {
    setAmount(amount);
  };

  const onNextPage = () => {
    if (+amount < MINIMUM_AMOUNT) {
      setIsShowErrorText(true);
    } else {
      navigation.navigate("PaymentStack", {
        screen: "PaymentOptions",
        params: { amount: amount },
      });
    }
  };

  return (
    <BodyContainer>
      <View style={styles.currentBalance}>
        <SubHeaderText text="Current Balance:" />
        <SubHeaderText text={`฿ ${balance}`} />
      </View>
      <TextInput
        title={`Amount`}
        errorText={
          isShowErrorText
            ? `Please top up at least ${MINIMUM_AMOUNT} baht.`
            : ""
        }
        placeholder="0"
        value={amount.toString()}
        onChangeText={(amount) => setAmount(+amount)}
        inputMode={InputType.Numeric}
        prefix="฿"
      />
      <BodyText
        text={`Minimum amount: ฿ ${MINIMUM_AMOUNT}`}
        textStyle={{ color: Colors.gray[700] }}
      />
      <DoubleButton
        leftAmount={50}
        rightAmount={100}
        onPress={onPressButton}
        currentAmount={amount}
      />
      <DoubleButton
        leftAmount={200}
        rightAmount={250}
        onPress={onPressButton}
        currentAmount={amount}
      />
      <DoubleButton
        leftAmount={500}
        rightAmount={1000}
        onPress={onPressButton}
        currentAmount={amount}
      />
      <PrimaryButton
        title="Next"
        onPress={() => onNextPage()}
        buttonStyle={{ marginTop: 10 }}
      />
    </BodyContainer>
  );
};

export default TopUp;

const styles = StyleSheet.create({
  currentBalance: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 8,
    gap: 10,
    marginTop: 4,
    marginBottom: 20,
  },
  doubleButtonContainer: {
    flexDirection: "row",
    gap: 20,
    marginVertical: 10,
  },
  doubleButton: {
    flex: 1,
  },
});
