import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ReactNode, forwardRef, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import SubHeaderText from "../text/SubHeaderText";
export type Ref = BottomSheetModal;

export type BottomSheetModalProps = {
  children: ReactNode;
  title: string;
  startIndex?: number;
  modalContainerStyle?: object;
  onDismiss?: () => void;
};

const CustomBottomSheetModal: React.ForwardRefRenderFunction<
  Ref,
  BottomSheetModalProps
> = (
  { children, title, startIndex = 1, modalContainerStyle, onDismiss },
  ref
) => {
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);
  return (
    <BottomSheetModal
      ref={ref}
      index={startIndex}
      snapPoints={snapPoints}
      onDismiss={onDismiss}
    >
      <View style={(styles.container, modalContainerStyle)}>
        <SubHeaderText containerStyle={styles.headerContainer} text={title} />
        {children}
      </View>
    </BottomSheetModal>
  );
};

export default forwardRef(CustomBottomSheetModal);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
  },
});
