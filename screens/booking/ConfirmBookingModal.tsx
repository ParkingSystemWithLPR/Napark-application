import {
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../../types";
import { useBooking } from "../../store/context/booking";
import ConfirmBookingModalContent from "../../components/booking/ConfirmBookingModalContent";
import ProcessingModalContent from "../../components/booking/ProcessingModalContent";

export type ConfirmBookingModalProps = {} & NativeStackScreenProps<
  RootParamList,
  "ConfirmBookingModal"
>;
const ConfirmBookingModal: React.FC<ConfirmBookingModalProps> = ({
  navigation,
}) => {
  const [isConfirm, setIsConfirm] = useState(false);
  const { isCreatingBooking, sendCreateRequest } = useBooking();
  const closeModal = () => {
    navigation.pop();
  };
  const handleConfirm = () => {
    sendCreateRequest("abc"); //mock
    setIsConfirm(true);
  };
  return (
    <View style={styles.screen}>
      <TouchableOpacity
        style={styles.modalOverLay}
        onPress={closeModal}
        disabled={isCreatingBooking}
      >
        <View style={styles.modalSection}>
          <TouchableWithoutFeedback>
            {!isConfirm ? (
              <ConfirmBookingModalContent
                handlecloseModal={closeModal}
                handleSendRequest={handleConfirm}
              />
            ) : (
              <ProcessingModalContent
                isSendingRequest={isCreatingBooking}
                closeModal={closeModal}
              />
            )}
          </TouchableWithoutFeedback>
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
