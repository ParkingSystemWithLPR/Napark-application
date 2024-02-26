import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { forwardRef, useMemo } from "react";
import { StyleSheet } from "react-native";

import SubHeaderText from "../text/SubHeaderText";
export type Ref = BottomSheetModal;

export type BottomSheetModalProps = {
  title: string;
};

const CustomBottomSheetModal: React.ForwardRefRenderFunction<
  Ref,
  BottomSheetModalProps
> = ({ title }, ref) => {
  const snapPoints = useMemo(() => ["25%", "75%"], []);
  return (
    <BottomSheetModal ref={ref} index={0} snapPoints={snapPoints}>
      <SubHeaderText containerStyle={styles.headerContainer} text={title} />
    </BottomSheetModal>
  );
};

export default forwardRef(CustomBottomSheetModal);

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
  },
});
