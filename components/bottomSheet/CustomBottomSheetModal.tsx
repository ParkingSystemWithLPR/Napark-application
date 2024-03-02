import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ReactNode, forwardRef, useMemo } from "react";
import { StyleSheet } from "react-native";

import SubHeaderText from "../text/SubHeaderText";
export type Ref = BottomSheetModal;

export type BottomSheetModalProps = {
  title: string;
  children: ReactNode;
};

const CustomBottomSheetModal: React.ForwardRefRenderFunction<
  Ref,
  BottomSheetModalProps
> = ({ title, children }, ref) => {
  const snapPoints = useMemo(() => ["25%", "75%"], []);
  return (
    <BottomSheetModal ref={ref} index={0} snapPoints={snapPoints}>
      <SubHeaderText containerStyle={styles.headerContainer} text={title} />
      {children}
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
