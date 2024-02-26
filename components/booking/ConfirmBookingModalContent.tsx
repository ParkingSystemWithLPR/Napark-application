import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Colors from "../../constants/color";
import PrimaryButton from "../button/PrimaryButton";
import BodyText from "../text/BodyText";

export type ConfirmBookingModalContentProps = {
  handlecloseModal: () => void;
  handleSendRequest: () => void;
};

const ConfirmBookingModalContent: React.FC<ConfirmBookingModalContentProps> = ({
  handlecloseModal,
  handleSendRequest,
}) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        <TouchableOpacity onPress={handlecloseModal} style={styles.closeButton}>
          <MaterialCommunityIcons name="close" />
        </TouchableOpacity>
        <View style={styles.textBox}>
          <BodyText text={"Confirm booking"} />
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton title={"Confirm"} onPress={handleSendRequest} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default ConfirmBookingModalContent;
const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: Colors.white,
    width: 225,
    height: 150,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  textBox: {
    flex: 1,
    justifyContent: "flex-end",
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
