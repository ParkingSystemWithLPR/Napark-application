import {
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { RootParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import BodyText from "../../components/text/BodyText";
import PrimaryButton from "../../components/button/PrimaryButton";
import { useBooking } from "../../store/context/booking";
import Colors from "../../constants/color";

export type ProcessingModalProps = {} & NativeStackScreenProps<
  RootParamList,
  "ProcessingModal"
>;
const ProcessingModal: React.FC<ProcessingModalProps> = ({ navigation }) => {
  const closeModal = () => {
    navigation.pop();
  };
  const { isCreatingBooking } = useBooking();
  return (
    <View style={styles.screen}>
      <TouchableOpacity
        style={styles.modalOverLay}
        onPress={closeModal}
        disabled={isCreatingBooking}
      >
        <View style={styles.modalSection}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              {isCreatingBooking ? (
                <View style={styles.textBox}>
                  <BodyText text={"Processing request..."} />
                  <ActivityIndicator />
                </View>
              ) : (
                <>
                  <View style={styles.iconContainer}>
                    <Ionicons
                      name="checkmark-circle"
                      style={styles.closeButton}
                    ></Ionicons>
                  </View>
                  <View style={styles.textBox}>
                    <BodyText
                      text={"Space Successfully Booked"}
                      textStyle={{ fontSize: 12 }}
                    />
                  </View>
                  <View style={styles.buttonContainer}>
                    <PrimaryButton
                      title={"close"}
                      onPress={() => {
                        navigation.pop();
                      }}
                    />
                  </View>
                </>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default ProcessingModal;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
  },
  modalSection: { flex: 1, justifyContent: "center" },
  modalContainer: {
    backgroundColor: Colors.white,
    width: 200,
    height: 200,
    paddingHorizontal: 17,
  },
  modalOverLay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: { flex: 2, alignItems: "center" },
  textBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
  },
  closeButton: {
    fontSize: 100,
    color: "green",
  },
});
