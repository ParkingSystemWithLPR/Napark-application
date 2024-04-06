import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback } from "react";
import { SafeAreaView, View, Image, StyleSheet } from "react-native";

import { Attribute } from "../bookings/booking/BookingSummary";

import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import BodyText from "@/components/text/BodyText";
import HeaderText from "@/components/text/HeaderText";
import {
  AuthenticatedStackParamList,
  ParkingFlowStackParamList,
} from "@/types";
import {
  formatHumanReadableDateFromDateString,
  formatTime,
} from "@/utils/date";

export type ParkingConfirmationProps = CompositeScreenProps<
  NativeStackScreenProps<ParkingFlowStackParamList, "ParkingConfirmation">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const ParkingConfirmation: React.FC<ParkingConfirmationProps> = ({ route }) => {
  const { bookingRequest } = route.params;
  const checkInDate = new Date();
  const renderAttribute = useCallback(({ attribute, value }: Attribute) => {
    return (
      <View style={styles.attribute}>
        <BodyText text={attribute} />
        <BodyText text={value ?? ""} />
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.outerContainer}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={{ alignSelf: "center" }}
        />
        <HeaderText
          text={"Parking success"}
          containerStyle={{ alignSelf: "center" }}
        />
        <View style={styles.attributeContainer}>
          {renderAttribute({
            attribute: "ParkingDate",
            value: formatHumanReadableDateFromDateString(
              checkInDate.toString()
            ),
          })}
          {renderAttribute({
            attribute: "ParkingTime",
            value: formatTime(checkInDate),
          })}
          {renderAttribute({
            attribute: "CheckOutDate",
            value:
              bookingRequest.checkOutDate &&
              formatHumanReadableDateFromDateString(
                bookingRequest.checkOutDate
              ),
          })}
          {renderAttribute({
            attribute: "CheckOutTime",
            value: bookingRequest.checkOutTime,
          })}
        </View>
        <View style={styles.buttonsContainer}>
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

const styles = StyleSheet.create({
  screen: { flex: 1 },
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 20,
    paddingHorizontal: 20,
  },
  attributeContainer: { gap: 10 },
  attribute: { flexDirection: "row", justifyContent: "space-between" },
  buttonsContainer: { flexDirection: "row", justifyContent: "center", gap: 10 },
});
