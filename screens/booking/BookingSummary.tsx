import { Platform, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import { RootParamList } from "../../types";
import PrimaryButton from "../../components/button/PrimaryButton";
import BodyText from "../../components/text/BodyText";
import HyperLinkText from "../../components/text/HyperlinkText";
import Colors from "../../constants/color";
<<<<<<< HEAD
import { useState } from "react";
import ModalOverlay from "../../components/ui/ModalOverlay";
import ConfirmBookingModalContent from "../../components/booking/ConfirmBookingModalContent";
import ProcessingModalContent from "../../components/booking/ProcessingModalContent";
=======
>>>>>>> 396b49f14a897d0e8ec89da04bae167a5d37aafe

export type BookingSummaryProps = {} & NativeStackScreenProps<
  RootParamList,
  "BookingSummary"
>;

const BookingSummary: React.FC<BookingSummaryProps> = ({ navigation }) => {
<<<<<<< HEAD
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const openModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
    if (isConfirm) {
      navigation.replace("MyBooking");
    }
  };
  function sendCreateRequest(request: string) {
    setIsSendingRequest(true);
    setTimeout(() => {
      setIsSendingRequest(false);
    }, 2000);
  }
  const handleConfirm = () => {
    sendCreateRequest("abc");
    setIsConfirm(true);
=======
  const openModal = () => {
    navigation.navigate("ConfirmBookingModal", { request: "abc" });
>>>>>>> 396b49f14a897d0e8ec89da04bae167a5d37aafe
  };
  type BookingAttribute = {
    attribute: string;
    value: string;
  };
  const RenderAttribute: React.FC<BookingAttribute> = ({
    attribute,
    value,
  }) => {
    return (
      <View style={styles.attributeContainer}>
        <BodyText
          text={attribute + ":"}
          containerStyle={styles.attributeField}
          textStyle={styles.attributeTextColor}
        />
        <BodyText text={value} containerStyle={styles.valueField} />
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.locationSection}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-sharp" style={styles.pin}></Ionicons>
          <BodyText
            text="Engineer building 3, Chulalongkorn"
            containerStyle={styles.locationBox}
            textStyle={Platform.OS === "ios" ? styles.iosText : {}}
          />
        </View>
      </View>
      <View style={styles.bookingDetailSection}>
        <View style={styles.bookingDetailContainer}>
          <BodyText
            text="Booking Details"
            containerStyle={styles.headerStyle}
          />
          <RenderAttribute attribute="Space" value="6a" />
          <RenderAttribute attribute="Check-in Time" value="11:00 am" />
          <RenderAttribute attribute="Check-out Time (Est)" value="05:00 pm" />
          <RenderAttribute attribute="Specifications" value="None" />
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
        <PrimaryButton title={"Book"} onPress={openModal} />
      </View>
<<<<<<< HEAD
      <ModalOverlay visible={isOpenModal} closeModal={closeModal}>
        <View style={styles.modalBackground}>
          {!isConfirm ? (
            <ConfirmBookingModalContent
              handlecloseModal={closeModal}
              handleSendRequest={handleConfirm}
            />
          ) : (
            <ProcessingModalContent
              isCreatingBooking={isSendingRequest}
              handlecloseModal={closeModal}
            />
          )}
        </View>
      </ModalOverlay>
=======
>>>>>>> 396b49f14a897d0e8ec89da04bae167a5d37aafe
    </View>
  );
};
export default BookingSummary;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 40,
    gap: 15,
  },
  locationSection: {
    flex: 1,
    justifyContent: "center",
  },
  locationContainer: {
    height: "70%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 5,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  pin: {
    fontSize: 25,
    marginRight: 5,
  },
  locationBox: {
    flex: 1,
    justifyContent: "center",
  },
  bookingDetailSection: {
    flex: 5,
    gap: 15,
  },
  bookingDetailContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 5,
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
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
  iosText: {
    fontSize: 12,
  },
<<<<<<< HEAD
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
=======
>>>>>>> 396b49f14a897d0e8ec89da04bae167a5d37aafe
});
