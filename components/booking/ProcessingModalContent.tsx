import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import PrimaryButton from "../button/PrimaryButton";
import BodyText from "../text/BodyText";
import LoadingOverlay from "../ui/LoadingOverlay";

import Colors from "@/constants/color";

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
              <BodyText text="Successfully Booked" />
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
    width: 220,
    height: 220,
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
    color: Colors.green[700],
  },
});
