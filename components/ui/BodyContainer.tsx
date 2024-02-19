import { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
      <SafeAreaView style={[styles.tabContainer, innerContainerStyle]}>
        {children}
      </SafeAreaView>
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
    paddingHorizontal: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: Colors.white,
  },
});
