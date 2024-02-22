import { TouchableOpacity, View, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";

import { RootParamList } from "../../types";
import ProcessingModalContent from "../../components/booking/ProcessingModalContent";
import ConfirmBookingModalContent from "../../components/booking/ConfirmBookingModalContent";

export type ConfirmBookingModalProps = {} & NativeStackScreenProps<
  RootParamList,
  "ConfirmBookingModal"
>;
const ConfirmBookingModal: React.FC<ConfirmBookingModalProps> = ({
  navigation,
  route,
}) => {
  const [isConfirm, setIsConfirm] = useState(false);
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const closeModal = () => {
    navigation.pop();
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
    sendCreateRequest(route.params.request); //mock
    setIsConfirm(true);
  };
  return (
    <View style={styles.screen}>
      <TouchableOpacity
        style={styles.modalOverLay}
        onPress={closeModal}
        disabled={isSendingRequest}
      >
        <View style={styles.modalSection}>
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
      </TouchableOpacity>
    </View>
  );
};
export default ConfirmBookingModal;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
  },
  modalSection: { flex: 1, justifyContent: "center" },
  modalOverLay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
