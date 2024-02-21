import { View, StyleSheet, TouchableOpacity } from "react-native";
import PrimaryButton from "../button/PrimaryButton";
import BodyText from "../text/BodyText";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../../constants/color";

export type ConfirmBookingModalContentProps = {
  handlecloseModal: () => void;
  handleSendRequest: () => void;
};

const ConfirmBookingModalContent: React.FC<ConfirmBookingModalContentProps> = ({
  handlecloseModal,
  handleSendRequest,
}) => {
  return (
    <View style={styles.modalContent}>
      <TouchableOpacity onPress={handlecloseModal} style={styles.closeButton}>
        <Ionicons name="close"></Ionicons>
      </TouchableOpacity>
      <View style={styles.textBox}>
        <BodyText text={"Confirm booking"} />
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton title={"Confirm"} onPress={handleSendRequest} />
      </View>
    </View>
  );
};
export default ConfirmBookingModalContent;
const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: Colors.white,
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
