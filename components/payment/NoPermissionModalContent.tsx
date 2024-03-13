import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Linking,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import BodyText from "@/components/text/BodyText";

type NoPermissionModalContentProp = {
  handlecloseModal: () => void;
};

const NoPermissionModalContent: React.FC<NoPermissionModalContentProp> = ({
  handlecloseModal,
}) => {
  const handleGotoSetting = () => {
    Linking.openSettings();
  };
  return (
    <TouchableWithoutFeedback>
      <View style={styles.modalContainer}>
        <BodyText text="Camera access needed. Go to settings, tap permissions and tap allow" />
        <View style={styles.buttonContainer}>
          <SecondaryButton title={"DISMISS"} onPress={handlecloseModal} />
          <PrimaryButton title={"GO TO SETTINGS"} onPress={handleGotoSetting} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default NoPermissionModalContent;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.white,
    width: "90%",
    height: 120,
    paddingHorizontal: 15,
    borderRadius: 10,
    gap: 10,
    padding: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },
});
