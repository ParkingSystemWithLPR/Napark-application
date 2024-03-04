import { StyleSheet, View, Text } from "react-native";

import { TextProps } from "@/types";

const BodyText: React.FC<TextProps> = ({
  text,
  containerStyle,
  textStyle,
  ellipsizeMode,
  numberOfLines,
}) => (
  <View style={[containerStyle]}>
    <Text
      style={[styles.text, textStyle]}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
    >
      {text}
    </Text>
  </View>
);

export default BodyText;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
});
