import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback } from "react";
import { SafeAreaView, View, Image } from "react-native";

import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import BodyText from "@/components/text/BodyText";
import HeaderText from "@/components/text/HeaderText";
import {
  AuthenticatedStackParamList,
  ParkingFlowStackParamList,
} from "@/types";

export type ParkingConfirmationProps = CompositeScreenProps<
  NativeStackScreenProps<ParkingFlowStackParamList, "ParkingConfirmation">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

type Attribute = {
  attribute: string;
  value: string;
};
const ParkingConfirmation: React.FC<ParkingConfirmationProps> = () => {
  const renderAttribute = useCallback(({ attribute, value }: Attribute) => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <BodyText text={attribute} />
        <BodyText text={value} />
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={{ flex: 1, justifyContent: "center", gap: 10 }}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={{ alignSelf: "center" }}
        />
        <HeaderText
          text={"Parking success"}
          containerStyle={{ alignSelf: "center" }}
        />
        <View style={{ gap: 5 }}>
          {renderAttribute({
            attribute: "ParkingDate",
            value: "8 March 2024",
          })}
          {renderAttribute({ attribute: "ParkingTime", value: "11:00" })}
          {renderAttribute({
            attribute: "CheckOutDate",
            value: "9 March 2024",
          })}
          {renderAttribute({
            attribute: "CheckOutTime",
            value: "11:00",
          })}
        </View>
        <View
          style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}
        >
          <PrimaryButton
            title={"Yes, That was me"}
            onPress={function (): void {}}
          />
          <SecondaryButton
            title={"No, Help me"}
            onPress={function (): void {}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ParkingConfirmation;
