import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import ProcessingModalContent from "@/components/booking/ProcessingModalContent";
import PrimaryButton from "@/components/button/PrimaryButton";
import BodyText from "@/components/text/BodyText";
import HyperLinkText from "@/components/text/HyperlinkText";
import BodyContainer from "@/components/ui/BodyContainer";
import ModalOverlay from "@/components/ui/ModalOverlay";
import Colors from "@/constants/color";
import { AuthenticatedStackParamList, BookingStackParamList } from "@/types";
import { formatHumanReadableDateFromDateString } from "@/utils/date";

export type Attribute = {
  attribute: string;
  value: string | null;
};
export type BookingSummaryProps = CompositeScreenProps<
  NativeStackScreenProps<BookingStackParamList, "BookingSummary">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const BookingSummary: React.FC<BookingSummaryProps> = ({
  navigation,
  route,
}) => {
  const bookingRequest = route.params.bookingRequest;
  const parkingLot = route.params.parkingLot;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  const sendCreateRequest = () => {
    setIsSendingRequest(true);
    setTimeout(() => {
      setIsSendingRequest(false);
    }, 2000);
  };

  const openModal = () => {
    setIsOpenModal(true);
    sendCreateRequest();
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setTimeout(() => {
      navigation.replace("MainScreen", { screen: "MyBooking" });
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
          {renderAttribute({ attribute: "Space", value: bookingRequest.slot })}
          {renderAttribute({
            attribute: "Check-in Date",
            value:
              bookingRequest.checkInDate &&
              formatHumanReadableDateFromDateString(bookingRequest.checkInDate),
          })}
          {renderAttribute({
            attribute: "Check-in Time",
            value: bookingRequest.checkInTime ?? "",
          })}
          {renderAttribute({
            attribute: "Check-out Date (Est)",
            value:
              bookingRequest.checkOutDate &&
              formatHumanReadableDateFromDateString(
                bookingRequest.checkOutDate
              ),
          })}
          {renderAttribute({
            attribute: "Check-out Time (Est)",
            value: bookingRequest.checkOutTime ?? "",
          })}
          {renderAttribute({
            attribute: "Specifications",
            value: bookingRequest.specification,
          })}
          {renderAttribute({
            attribute: "Cost per Unit",
            value: `${bookingRequest.price}  ${bookingRequest.unit}`,
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
            isCreatingBooking={isSendingRequest}
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
