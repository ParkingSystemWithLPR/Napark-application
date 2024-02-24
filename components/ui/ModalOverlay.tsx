import { ReactNode } from "react";
import { Modal, StyleSheet, TouchableWithoutFeedback } from "react-native";

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
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableWithoutFeedback
        onPress={closeModal}
        style={styles.modalOverlay}
      >
        {children}
      </TouchableWithoutFeedback>
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
