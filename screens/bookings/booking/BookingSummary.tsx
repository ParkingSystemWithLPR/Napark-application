import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import ProcessingModalContent from "@/components/booking/ProcessingModalContent";
import PrimaryButton from "@/components/button/PrimaryButton";
import BodyText from "@/components/text/BodyText";
import HyperLinkText from "@/components/text/HyperlinkText";
import BodyContainer from "@/components/ui/BodyContainer";
import ModalOverlay from "@/components/ui/ModalOverlay";
import Colors from "@/constants/color";
import { AuthenticatedStackParamList, BookingsStackParamList } from "@/types";
import { formatHumanReadableDateFromDateString } from "@/utils/date";
import {
  formatCreateBookingRequest,
  validateTimeInputs,
} from "@/utils/bookingRequest";
import {
  CreatingBookingStatus,
  ValidateStatus,
} from "@/enum/BookingValidateStatus";
import { useCreateBooking } from "@/store/api/booking/useCreateBooking";
import { useAuth } from "@/store/context/auth";

export type Attribute = {
  attribute: string;
  value: string | null;
};
export type BookingSummaryProps = CompositeScreenProps<
  NativeStackScreenProps<BookingsStackParamList, "BookingSummary">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const BookingSummary: React.FC<BookingSummaryProps> = ({
  navigation,
  route,
}) => {
  const { bookingDetailState, parkingLot } = route.params;
  const { accessToken, authenticate } = useAuth();
  const {
    slotName,
    checkInDate,
    checkInTime,
    checkOutDate,
    checkOutTime,
    specification,
    price,
    unit,
  } = bookingDetailState;
  const { mutateAsync: createBooking } = useCreateBooking();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [status, setStatus] = useState<CreatingBookingStatus>(
    CreatingBookingStatus.PENDING
  );
  const createBookingRequest = formatCreateBookingRequest(
    bookingDetailState,
    parkingLot
  );
  console.log("createBookingRequest", createBookingRequest);
  const timeValidator = () => {
    const status = validateTimeInputs(bookingDetailState);
    switch (status) {
      case ValidateStatus.SUCCESS:
        return true;
      case ValidateStatus.TIMEOUT:
        Alert.alert("CheckIn or CheckOut timeout");
        navigation.navigate("MainScreen", { screen: "Landing" });
        return false;
      default:
        return false;
    }
  };

  const sendCreateRequest = async () => {
    await createBooking(
      {
        auth: { accessToken, authenticate },
        body: createBookingRequest,
      },
      {
        onSuccess() {
          setStatus(CreatingBookingStatus.SUCCESS);
        },
        onError() {
          setStatus(CreatingBookingStatus.FAIL);
        },
      }
    );
  };

  const openModal = async () => {
    setIsOpenModal(true);
    setStatus(CreatingBookingStatus.PENDING);
    const isTimeValid = timeValidator();
    if (isTimeValid) await sendCreateRequest();
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setTimeout(() => {
      navigation.replace("MainScreen", { screen: "Bookings" });
    }, 0);
  };

  const renderAttribute = useCallback(({ attribute, value }: Attribute) => {
    return (
      <View style={styles.attributeContainer}>
        <BodyText
          text={`${attribute}:`}
          containerStyle={styles.attributeField}
          textStyle={styles.attributeTextColor}
        />
        <BodyText text={value ?? ""} containerStyle={styles.valueField} />
      </View>
    );
  }, []);

  return (
    <BodyContainer innerContainerStyle={styles.screen}>
      <View style={styles.locationSection}>
        <View style={styles.locationContainer}>
          <MaterialIcons name="location-pin" size={25} style={styles.pin} />
          <BodyText
            text={parkingLot.name}
            ellipsizeMode="tail"
            numberOfLines={1}
            containerStyle={styles.locationTextContainer}
          />
        </View>
      </View>
      <View style={styles.bookingDetailSection}>
        <View style={styles.bookingDetailContainer}>
          <BodyText
            text="Booking Details"
            containerStyle={styles.headerStyle}
          />
          {renderAttribute({
            attribute: "Space",
            value: slotName,
          })}
          {renderAttribute({
            attribute: "Check-in Date",
            value:
              checkInDate && formatHumanReadableDateFromDateString(checkInDate),
          })}
          {renderAttribute({
            attribute: "Check-in Time",
            value: checkInTime ?? "",
          })}
          {renderAttribute({
            attribute: "Check-out Date (Est)",
            value:
              checkOutDate &&
              formatHumanReadableDateFromDateString(checkOutDate),
          })}
          {renderAttribute({
            attribute: "Check-out Time (Est)",
            value: checkOutTime ?? "",
          })}
          {renderAttribute({
            attribute: "Specifications",
            value: specification,
          })}
          {renderAttribute({
            attribute: "Cost per Unit",
            value: `${price}  ${unit}`,
          })}
        </View>
        <View style={styles.routeContainer}>
          <BodyText text={"Don`t know the route?"} />
          <HyperLinkText
            text={"Get Directions"}
            textStyle={styles.colorLinkText}
            url={"https://www.youtube.com/watch?v=srcPwOKtH5E"}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton title={"Confirm Booking"} onPress={openModal} />
      </View>
      <ModalOverlay visible={isOpenModal} closeModal={closeModal}>
        <View style={styles.modalBackground}>
          <ProcessingModalContent
            status={status}
            handlecloseModal={closeModal}
          />
        </View>
      </ModalOverlay>
    </BodyContainer>
  );
};
export default BookingSummary;
const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 20,
    gap: 15,
  },
  locationSection: {
    flex: 1,
    justifyContent: "center",
  },
  locationContainer: {
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  locationTextContainer: { flex: 1, marginHorizontal: 5 },
  pin: {
    marginHorizontal: 5,
  },
  bookingDetailSection: {
    flex: 5,
    gap: 15,
  },
  bookingDetailContainer: {
    flex: 2,
    backgroundColor: Colors.white,
    borderRadius: 5,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  },
  headerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  attributeContainer: {
    flex: 1,
    flexDirection: "row",
  },
  attributeField: {
    flex: 4,
    marginLeft: 10,
  },
  attributeTextColor: {
    color: Colors.gray[800],
  },
  valueField: {
    flex: 2,
  },
  routeContainer: {
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    columnGap: 5,
  },
  colorLinkText: {
    color: Colors.lightBlue[800],
  },
  buttonContainer: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
