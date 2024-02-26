import { ActivityIndicator, StyleSheet, View } from "react-native";

import SubHeaderText from "../text/SubHeaderText";

export type LoadingOverlayProps = {
  message: string;
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message }) => {
  return (
    <View style={styles.screen}>
      <SubHeaderText text={message} />
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
});
