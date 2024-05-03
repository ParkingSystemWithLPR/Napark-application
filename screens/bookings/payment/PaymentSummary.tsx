import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { parseISO } from "date-fns";
import { useCallback, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Platform, Alert } from "react-native";

import PrimaryButton from "@/components/button/PrimaryButton";
import AttributeText, {
  AttributeTextProps,
} from "@/components/text/AttributeText";
import BodyText from "@/components/text/BodyText";
import HyperLinkText from "@/components/text/HyperlinkText";
import SubHeaderText from "@/components/text/SubHeaderText";
import BodyContainer from "@/components/ui/BodyContainer";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import Colors from "@/constants/color";
import { BookingStatus } from "@/enum/BookingStatus";
import { useCancelBooking } from "@/store/api/booking/useCancelBooking";
import { useGetParkingLot } from "@/store/api/parking-lot/useGetParkingLotById";
import { useAuth } from "@/store/context/auth";
import { AuthenticatedStackParamList, BookingsStackParamList } from "@/types";
import { ParkingLot } from "@/types/parking-lot";
import { formatDefaultBookingValue } from "@/utils/bookingRequest";
import {
  formatHumanReadableDateFromDateString,
  formatTime,
} from "@/utils/date";
import { formatToSentenceCase } from "@/utils/text";

export type PaymentSummaryProps = CompositeScreenProps<
  NativeStackScreenProps<BookingsStackParamList, "PaymentSummary">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  navigation,
  route,
}) => {
  const { booking } = route.params;
  const {
    _id,
    license_plate,
    end_time,
    estimated_price,
    parkinglot_name,
    slot_name,
    start_time,
    status,
    actual_total_price,
  } = booking;
  const startTimeFormat = parseISO(start_time);
  const endTimeFormat = parseISO(end_time);
  const { accessToken, authenticate } = useAuth();
  const [parkingLot, setParkingLot] = useState<ParkingLot>();
  const getParkingLot = useGetParkingLot({
    queryParams: { parkingLotId: booking.parkinglot_id },
    auth: { accessToken, authenticate },
  });
  const { mutateAsync: cancelBooking } = useCancelBooking();

  const handleReBooking = () => {
    const newDefaultBooking = formatDefaultBookingValue(booking);
    if (parkingLot) {
      navigation.navigate("BookingDetail", {
        parkingLot: parkingLot,
        defaultValue: newDefaultBooking,
      });
    }
  };

  const handleCancelBooking = async () => {
    await cancelBooking(
      {
        bookingId: _id,
        auth: { accessToken, authenticate },
      },
      {
        onSuccess() {
          navigation.navigate("MainScreen", { screen: "Bookings" });
        },
        onError() {
          Alert.alert("Error", "Failed to cancel booking");
        },
      }
    );
  };

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
  const renderBottomPanal = useCallback(() => {
    switch (status) {
      case (BookingStatus.CANCELLED, BookingStatus.COMPLETED):
        return <PrimaryButton title={"Book Again"} onPress={handleReBooking} />;
      case BookingStatus.UPCOMING:
        return <PrimaryButton title={"Cancel"} onPress={handleCancelBooking} />;
      default:
        return <></>;
    }
  }, []);

  useLayoutEffect(() => {
    if (getParkingLot.data) {
      setParkingLot(getParkingLot.data);
    }
  }, [getParkingLot.data]);

  return (
    <>
      {parkingLot ? (
        <BodyContainer>
          <View style={{ gap: 20 }}>
            <SubHeaderText text={license_plate}></SubHeaderText>
            <View style={styles.content}>
              <View style={styles.attribute}>
                {renderAttribute({
                  attribute: "ParkingLot",
                  value: parkinglot_name,
                })}
                {renderAttribute({
                  attribute: "Slot",
                  value: slot_name,
                })}
                {renderAttribute({
                  attribute: "Start Date",
                  value: formatHumanReadableDateFromDateString(start_time),
                })}
                {renderAttribute({
                  attribute: "Start Time",
                  value: formatTime(startTimeFormat),
                })}
                {renderAttribute({
                  attribute: "End Date",
                  value: formatHumanReadableDateFromDateString(end_time),
                })}
                {renderAttribute({
                  attribute: "End Time",
                  value: formatTime(endTimeFormat),
                })}
                {renderAttribute({
                  attribute: "Status",
                  value: formatToSentenceCase(booking.status),
                })}
              </View>
              {renderTotal({
                attribute: "TOTAL",
                value: `${(status === BookingStatus.UPCOMING
                  ? estimated_price
                  : actual_total_price
                ).toFixed(2)}`,
              })}
            </View>
            <View style={styles.routeContainer}>
              <BodyText text={"Don`t know the route?"} />
              <HyperLinkText
                text={"Get Directions"}
                textStyle={styles.colorLinkText}
                url={`https://www.google.com/maps/dir/?api=1&destination=${parkingLot.coord.latitude},${parkingLot.coord.longitude}`}
              />
            </View>
            {renderBottomPanal()}
          </View>
        </BodyContainer>
      ) : (
        <LoadingOverlay message="Loading..." />
      )}
    </>
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
  content: {
    gap: 20,
    backgroundColor: Colors.white,
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
    padding: 10,
  },
  attribute: { gap: Platform.OS == "ios" ? 15 : 10 },
  text: { alignSelf: "flex-end", textAlign: "right" },
  bigText: { fontSize: 16 },
  redText: { color: Colors.red[400] },
  routeContainer: {
    alignSelf: "center",
    flexDirection: "row",
    columnGap: 5,
  },
  colorLinkText: {
    color: Colors.blue[600],
  },
});
