import { ReactNode } from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import Colors from "../../constants/color";

export type ModalOverlayProps = {
  visible: boolean;
  closeModal: () => void;
  children: ReactNode;
};

const ModalOverlay: React.FC<ModalOverlayProps> = ({
  visible,
  closeModal,
  children,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      {children}
    </Modal>
  );
};

export default ModalOverlay;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.black,
    opacity: 0.25,
  },
});
