import { View, StyleSheet, ActivityIndicator } from "react-native";
import Colors from "../../constants/color";
import PrimaryButton from "../button/PrimaryButton";
import BodyText from "../text/BodyText";
import Ionicons from "react-native-vector-icons/Ionicons";

export type ProcessingModalContentProps = {
  isCreatingBooking: boolean;
  closeModal: () => void;
};
const ProcessingModalContent: React.FC<ProcessingModalContentProps> = ({
  isCreatingBooking,
  closeModal,
}) => {
  return (
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
            <PrimaryButton title={"close"} onPress={closeModal} />
          </View>
        </>
      )}
    </View>
  );
};
export default ProcessingModalContent;
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.white,
    width: 200,
    height: 200,
    paddingHorizontal: 17,
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
