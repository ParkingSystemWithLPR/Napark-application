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

interface TopUpProps {}
type DoubleButtonProps = {
  leftAmount: number;
  rightAmount: number;
  onButtonClicked: (amount: number) => void;
  activeButton: number | undefined;
};

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
            activeButton === leftAmount ? Colors.red[400] : Colors.gray[700],
        }}
      />
      <SecondaryButton
        title={rightText}
        onPress={() => onButtonClicked(rightAmount)}
        outerContainerStyle={styles.doubleButton}
        buttonStyle={{
          backgroundColor:
            activeButton === rightAmount ? Colors.red[400] : Colors.gray[700],
        }}
      />
    </View>
  );
};

const TopUp: React.FC<TopUpProps> = () => {
  const [amount, setAmount] = useState<string>("");
  const [isManualChooseAmount, setIsManualChooseAmount] =
    useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<number>();

  const onPressButton = (amount: number) => {
    setActiveButton(amount);
    setAmount(amount.toString().replace(/^0+/, ""));
    setIsManualChooseAmount(amount === 0 ? true : false);
  };

  return (
    <BodyContainer>
      <SubHeaderText text="Current Balance" />
      <View style={styles.currentBalance}>
        <HeaderText text="฿ 555.99" />
      </View>
      {isManualChooseAmount && (
        <TextInput
          title="Please enter amount (baht)"
          placeholder="0"
          value={amount}
          onChangeText={(amount) => setAmount(amount)}
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
      <PrimaryButton title="Next" onPress={() => {}} />
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
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: Platform.OS === "android" ? 4 : 2,
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
