import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../constants/color";
import PrimaryButton from "../button/PrimaryButton";
import BodyText from "../text/BodyText";

export type ProcessingModalContentProps = {
  isCreatingBooking: boolean;
  handlecloseModal: () => void;
};
const ProcessingModalContent: React.FC<ProcessingModalContentProps> = ({
  isCreatingBooking,
  handlecloseModal,
}) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.modalContainer}>
        {isCreatingBooking ? (
          <View style={styles.processingTextBox}>
            <BodyText
              text={"Processing request..."}
              textStyle={Platform.OS === "ios" ? styles.iosText : {}}
            />
            <ActivityIndicator />
          </View>
        ) : (
          <>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="check-circle"
                style={styles.closeButton}
              />
              <BodyText
                text={"Successfully Booked"}
                textStyle={Platform.OS === "ios" ? styles.iosText : {}}
              />
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton title={"close"} onPress={handlecloseModal} />
            </View>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
export default ProcessingModalContent;
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.white,
    width: 200,
    height: 200,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  iconContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-end",
    // borderWidth: 1,
  },
  processingTextBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    // borderWidth: 1,
  },
  successfulTextBox: {
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
  },
  closeButton: {
    fontSize: 100,
    color: "green",
  },
  iosText: {
    fontSize: 12,
  },
});
