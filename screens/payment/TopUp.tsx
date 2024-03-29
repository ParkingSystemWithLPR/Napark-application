import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";

import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import TextInput from "@/components/input/TextInput";
import HeaderText from "@/components/text/HeaderText";
import SubHeaderText from "@/components/text/SubHeaderText";
import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";
import { InputType } from "@/enum/InputType";
import { AuthenticatedStackParamList, PaymentStackParamList } from "@/types";

type DoubleButtonProps = {
  leftAmount: number;
  rightAmount: number;
  onButtonClicked: (amount: number) => void;
  activeButton: number | undefined;
};

export type TopUpProps = CompositeScreenProps<
  NativeStackScreenProps<PaymentStackParamList, "TopUp">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const DoubleButton: React.FC<DoubleButtonProps> = ({
  leftAmount,
  rightAmount,
  onButtonClicked,
  activeButton,
}) => {
  const leftText = leftAmount === 0 ? "Custom" : `฿ ${leftAmount}`;
  const rightText = rightAmount === 0 ? "Custom" : `฿ ${rightAmount}`;
  return (
    <View style={styles.doubleButtonContainer}>
      <SecondaryButton
        title={leftText}
        onPress={() => onButtonClicked(leftAmount)}
        outerContainerStyle={styles.doubleButton}
        buttonStyle={{
          backgroundColor:
            activeButton === leftAmount ? Colors.red[400] : Colors.gray[800],
        }}
      />
      <SecondaryButton
        title={rightText}
        onPress={() => onButtonClicked(rightAmount)}
        outerContainerStyle={styles.doubleButton}
        buttonStyle={{
          backgroundColor:
            activeButton === rightAmount ? Colors.red[400] : Colors.gray[800],
        }}
      />
    </View>
  );
};

const TopUp: React.FC<TopUpProps> = ({ navigation, route }) => {
  const [amount, setAmount] = useState<number>(0);
  const [isManualChooseAmount, setIsManualChooseAmount] =
    useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<number>();
  const [isShowErrorText, setIsShowErrorText] = useState<boolean>(false);
  const [isNextButtonDisable, setIsNextButtonDisable] = useState<boolean>(true);
  const MINIMUM_AMOUNT = 50;

  const onPressButton = (amount: number) => {
    setActiveButton(amount);
    setAmount(amount);
    setIsNextButtonDisable(false);
    if (amount === 0) {
      setIsManualChooseAmount(true);
      setIsShowErrorText(false);
    } else {
      setIsManualChooseAmount(false);
    }
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
      <SubHeaderText text="Current Balance" />
      <View style={styles.currentBalance}>
        <HeaderText text={`฿ ${route.params.balance}`} />
      </View>
      {isManualChooseAmount && (
        <TextInput
          title={`Please enter amount (${MINIMUM_AMOUNT} baht minimum)`}
          errorText={
            isShowErrorText
              ? `Please top up at least ${MINIMUM_AMOUNT} baht.`
              : ""
          }
          placeholder="0"
          value={amount.toString()}
          onChangeText={(amount) => setAmount(+amount)}
          inputMode={InputType.Numeric}
        />
      )}
      <DoubleButton
        leftAmount={100}
        rightAmount={250}
        onButtonClicked={onPressButton}
        activeButton={activeButton}
      />
      <DoubleButton
        leftAmount={500}
        rightAmount={750}
        onButtonClicked={onPressButton}
        activeButton={activeButton}
      />
      <DoubleButton
        leftAmount={1000}
        rightAmount={0}
        onButtonClicked={onPressButton}
        activeButton={activeButton}
      />
      <PrimaryButton
        title="Next"
        onPress={() => onNextPage()}
        disabled={isNextButtonDisable}
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
    padding: 8,
    paddingVertical: Platform.OS === "android" ? 13 : 16,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginTop: 4,
    marginBottom: 20,
  },
  doubleButtonContainer: {
    flexDirection: "row",
    gap: 30,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 30,
  },
  doubleButton: {
    flex: 1,
  },
});
