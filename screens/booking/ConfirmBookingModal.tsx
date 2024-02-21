import {
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { RootParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import BodyText from "../../components/text/BodyText";
import PrimaryButton from "../../components/button/PrimaryButton";
import { useBooking } from "../../store/context/booking";

export type ConfirmBookingModalProps = {} & NativeStackScreenProps<
  RootParamList,
  "ConfirmBookingModal"
>;
const ConfirmBookingModal: React.FC<ConfirmBookingModalProps> = ({
  navigation,
}) => {
  const closeModal = () => {
    navigation.pop();
  };
  const { sendCreateRequest } = useBooking();
  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.modalOverLay} onPress={closeModal}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={closeModal}
                style={{ position: "absolute", top: 0, right: 0 }}
              >
                <Ionicons name="close" style={styles.closeButton}></Ionicons>
              </TouchableOpacity>
              <View style={styles.textBox}>
                <BodyText text={"Confirm booking"} />
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton
                  title={"Confirm"}
                  onPress={() => {
                    sendCreateRequest("abc"); //mock
                    navigation.replace("ProcessingModal");
                  }}
                />
              </View>
            </View>
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
  modalOverLay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    width: 225,
    height: 150,
    paddingHorizontal: 20,
  },
  textBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
    fontSize: 10,
  },
});
