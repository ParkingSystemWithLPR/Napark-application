import { useNavigation } from "@react-navigation/native";
import { setStatusBarStyle } from "expo-status-bar";
import { ReactNode, useLayoutEffect } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

import Colors from "@/constants/color";

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
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const unsubscribeBlur = navigation.addListener("blur", () => {
      setStatusBarStyle("dark");
    });
    const unsubscribeFocus = navigation.addListener("focus", () => {
      setStatusBarStyle("light");
    });

    return () => {
      unsubscribeBlur();
      unsubscribeFocus();
    };
  }, [navigation]);

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
    backgroundColor: Colors.gray[50],
  },
});
