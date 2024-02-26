import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Colors from "../../constants/color";
import PrimaryButton from "../button/PrimaryButton";
import BodyText from "../text/BodyText";
import LoadingOverlay from "../ui/LoadingOverlay";

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
          <LoadingOverlay message={"Loading..."} />
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
  },
  processingTextBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
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
