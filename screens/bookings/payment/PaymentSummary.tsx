import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";

import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import DropdownInput from "@/components/input/DropdownInput";
import AttributeText, {
  AttributeTextProps,
} from "@/components/text/AttributeText";
import SubHeaderText from "@/components/text/SubHeaderText";
import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";
import { PaymentMethod } from "@/enum/PaymentMethod";
import { AuthenticatedStackParamList, BookingsStackParamList } from "@/types";
import { BookingStatus, PaymentStatus } from "@/enum/BookingStatus";
import { formatDefaultBookingValue } from "@/utils/bookingRequest";
import { useGetParkingLot } from "@/store/api/parking-lot/useGetParkingLotById";
import { useAuth } from "@/store/context/auth";
import { ParkingLot } from "@/types/parking-lot";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { parseISO } from "date-fns";
import {
  formatHumanReadableDateFromDateString,
  formatTime,
} from "@/utils/date";
import { useProfile } from "@/store/context/profile";
import { formatToSentenceCase } from "@/utils/text";

export type PaymentSummaryProps = NativeStackScreenProps<
  BookingsStackParamList,
  "PaymentSummary"
>;

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  navigation,
  route,
}) => {
  const { booking } = route.params;
  const { profile } = useProfile();
  const {
    license_plate,
    end_time,
    estimated_price,
    parkinglot_name,
    slot_name,
    start_time,
    status,
    payment_status,
    actual_price,
  } = booking;
  const startTimeFormat = parseISO(start_time);
  const endTimeFormat = parseISO(end_time);
  const { accessToken, authenticate } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isButtonEnable, setIsButtonEnable] = useState(false);
  const [parkingLot, setParkingLot] = useState<ParkingLot>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const getParkingLot = useGetParkingLot({
    queryParams: { parkingLotId: booking.parkinglot_id },
    auth: { accessToken, authenticate },
  });

  const creditPaymentHandler = () => {
    if (profile.credit < booking.estimated_price) {
      navigation.navigate("TopUp", { balance: profile.credit });
    } else {
      navigation.navigate("PaymentSuccessful");
    }
  }; // if credit is not enough navigate to top up else deduct credit

  const QRPaymentHandler = () => {
    navigation.navigate("PaymentSuccessful"); //will change to QR page later
  }; // navigate to QR page

  const handlePayment = () => {
    switch (paymentMethod) {
      case PaymentMethod.CREDIT:
        creditPaymentHandler();
        break;
      case PaymentMethod.QR:
        QRPaymentHandler();
        break;
    }
  };

  const handleReBooking = () => {
    const newDefaultBooking = formatDefaultBookingValue(booking);
    if (parkingLot) {
      navigation.navigate("BookingDetail", {
        parkingLot: parkingLot,
        defaultValue: newDefaultBooking,
      });
    }
  };

  const handleNotFillInfo = () => {
    alert("Please choose payment method");
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
  const renderBottomPanal = useCallback(() => {
    switch (status) {
      case (BookingStatus.CANCELLED, BookingStatus.COMPLETED):
        return <PrimaryButton title={"Book Again"} onPress={handleReBooking} />;
      case BookingStatus.ACTIVE:
        switch (payment_status) {
          case PaymentStatus.UNPAID:
            return (
              <>
                <DropdownInput
                  selectedValue={paymentMethod}
                  placeholder={"Choose payment method"}
                  onSelect={setPaymentMethod}
                  items={[
                    {
                      label: PaymentMethod.CREDIT.toString(),
                      value: PaymentMethod.CREDIT.toString(),
                    },
                    {
                      label: PaymentMethod.QR.toString(),
                      value: PaymentMethod.QR.toString(),
                    },
                  ]}
                />
                {isButtonEnable ? (
                  <PrimaryButton
                    title={"Pay the bill"}
                    onPress={handlePayment}
                  />
                ) : (
                  <SecondaryButton
                    title={"Pay the bill"}
                    onPress={handleNotFillInfo}
                  />
                )}
              </>
            );
          default:
            return <></>;
        }
      default:
        return <></>;
    }
  }, [paymentMethod, isButtonEnable]);

  useLayoutEffect(() => {
    setIsButtonEnable(paymentMethod !== undefined);
  }, [paymentMethod]);

  useLayoutEffect(() => {
    if (getParkingLot.data) {
      setParkingLot(getParkingLot.data);
      setLoading(false);
    }
  }, [getParkingLot.data]);

  if (isLoading) {
    return <LoadingOverlay message="Loading..." />;
  }
  return (
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
              value:
                booking.status === BookingStatus.ACTIVE
                  ? formatToSentenceCase(booking.payment_status)
                  : formatToSentenceCase(booking.status),
            })}
          </View>
          {renderTotal({
            attribute: "TOTAL",
            value: `${(status === BookingStatus.UPCOMING
              ? estimated_price
              : actual_price
            ).toFixed(2)}`,
          })}
        </View>
        {renderBottomPanal()}
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
  blueText: { color: Colors.blue[600] },
  redText: { color: Colors.red[400] },
});
