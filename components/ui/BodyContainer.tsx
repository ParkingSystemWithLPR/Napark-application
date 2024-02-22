import { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import Colors from "../../constants/color";

export type BodyContainerProps = {
  children: ReactNode;
  containerStyle?: ViewStyle;
  innerContainerStyle?: object;
};

const BodyContainer: React.FC<BodyContainerProps> = ({
  children,
  containerStyle,
  innerContainerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.tabContainer, innerContainerStyle]}>{children}</View>
    </View>
  );
};

export default BodyContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.red[400],
  },
  tabContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: Colors.white,
  },
});
