import { useCallback } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import PrimaryButton from "../button/PrimaryButton";
import BodyText from "../text/BodyText";
import LoadingOverlay from "../ui/LoadingOverlay";

import Colors from "@/constants/color";
import { CreatingBookingStatus } from "@/enum/BookingValidateStatus";

export type ProcessingModalContentProps = {
  status: CreatingBookingStatus;
  handlecloseModal: () => void;
};
const ProcessingModalContent: React.FC<ProcessingModalContentProps> = ({
  status,
  handlecloseModal,
}) => {
  const renderModalContent = useCallback(() => {
    switch (status) {
      case CreatingBookingStatus.PENDING:
        return <LoadingOverlay message={"Loading..."} />;
      case CreatingBookingStatus.SUCCESS:
        return (
          <>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="check-circle"
                style={styles.check}
              />
              <BodyText text="Successfully Booked" />
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton title={"close"} onPress={handlecloseModal} />
            </View>
          </>
        );
      default:
        return (
          <>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="alpha-x-circle"
                style={styles.cross}
              />
              <BodyText text="Please try again" />
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton title={"close"} onPress={handlecloseModal} />
            </View>
          </>
        );
    }
  }, [status]);
  return (
    <TouchableWithoutFeedback>
      <View style={styles.modalContainer}>{renderModalContent()}</View>
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
  check: {
    fontSize: 100,
    color: Colors.green[700],
  },
  cross: {
    fontSize: 100,
    color: Colors.red[400],
  },
});
