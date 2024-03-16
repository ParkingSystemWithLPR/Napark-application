import { useCallback, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import DropdownInput from "@/components/input/DropdownInput";
import AttributeText, {
  AttributeTextProps,
} from "@/components/text/AttributeText";
import SubHeaderText from "@/components/text/SubHeaderText";
import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";

const PaymentSummary: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isButtonEnable, setIsButtonEnable] = useState(false);

  useLayoutEffect(() => {
    setIsButtonEnable(paymentMethod != "");
  }, [paymentMethod]);

  const renderAttribute = useCallback(
    ({ attribute, value }: AttributeTextProps) => {
      return (
        <AttributeText
          attribute={attribute}
          value={value}
          attributeContainerStyle={styles.container}
          attributeTextStyle={styles.attributeTextColor}
          valueContainerStyle={styles.container}
          valueTextStyle={styles.text}
        />
      );
    },
    []
  );

  const renderPrice = useCallback(
    ({ attribute, value }: AttributeTextProps) => {
      return (
        <AttributeText
          attribute={attribute}
          value={value}
          attributeContainerStyle={styles.container}
          attributeTextStyle={[styles.attributeTextColor, styles.bigText]}
          valueContainerStyle={styles.container}
          valueTextStyle={[styles.text, styles.bigText, styles.blueText]}
        />
      );
    },
    []
  );

  const renderTotal = useCallback(
    ({ attribute, value }: AttributeTextProps) => {
      return (
        <AttributeText
          attribute={attribute}
          value={value}
          attributeContainerStyle={styles.container}
          attributeTextStyle={[styles.bigText]}
          valueContainerStyle={styles.container}
          valueTextStyle={[styles.text, styles.bigText, styles.redText]}
        />
      );
    },
    []
  );

  return (
    <BodyContainer>
      <View style={{ gap: 20 }}>
        <SubHeaderText text={"All the Bills"}></SubHeaderText>
        <View
          style={{
            gap: 20,
            backgroundColor: Colors.white,
            borderRadius: 8,
            shadowColor: "black",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 4,
            padding: 10,
          }}
        >
          <View style={{ gap: 5 }}>
            {renderAttribute({
              attribute: "Name",
              value: "Jackson Maine",
            })}
            {renderAttribute({
              attribute: "Address",
              value: "403 East 4th Street, Santa Ana",
            })}
            {renderAttribute({
              attribute: "Phone number",
              value: "+8424599721",
            })}
            {renderAttribute({
              attribute: "Code",
              value: "#2343543",
            })}
            {renderAttribute({
              attribute: "From",
              value: "01/10/2019",
            })}
            {renderAttribute({
              attribute: "To",
              value: "01/1/2019",
            })}
          </View>
          {renderPrice({
            attribute: "Internet fee",
            value: "$50",
          })}
          {renderPrice({
            attribute: "Tax",
            value: "$10",
          })}
          {renderTotal({
            attribute: "TOTAL",
            value: "$60",
          })}
        </View>
        <DropdownInput
          selectedValue={paymentMethod}
          placeholder={"Choose payment method"}
          onSelect={setPaymentMethod}
          items={[
            {
              label: "My credits ( 100$ availiable )",
              value: "My credits ( 100$ availiable )",
            },
          ]}
        />
        {isButtonEnable ? (
          <PrimaryButton
            title={"Pay the bill"}
            onPress={function (): void {}}
          />
        ) : (
          <SecondaryButton
            title={"Pay the bill"}
            onPress={function (): void {}}
          />
        )}
      </View>
    </BodyContainer>
  );
};
export default PaymentSummary;
const styles = StyleSheet.create({
  attributeTextColor: {
    color: Colors.gray[800],
  },
  container: {
    flex: 1,
  },
  text: { alignSelf: "flex-end", textAlign: "right" },
  bigText: { fontSize: 16 },
  blueText: { color: Colors.blue[600] },
  redText: { color: Colors.red[400] },
});
