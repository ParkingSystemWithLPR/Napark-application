import { TouchableOpacity, View, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";

import { RootParamList } from "../../types";
import { useBooking } from "../../store/context/booking";
import ProcessingModalContent from "../../components/booking/ProcessingModalContent";
import ConfirmBookingModalContent from "../../components/booking/ConfirmBookingModalContent";

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
    if (isConfirm) {
      navigation.replace("MyBooking");
    }
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
          {!isConfirm ? (
            <ConfirmBookingModalContent
              handlecloseModal={closeModal}
              handleSendRequest={handleConfirm}
            />
          ) : (
            <ProcessingModalContent
              isCreatingBooking={isCreatingBooking}
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
