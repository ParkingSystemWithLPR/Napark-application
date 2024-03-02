import { StyleSheet, View, Text } from "react-native";

import { TextProps } from "@/types";

const SubHeaderText: React.FC<TextProps> = ({
  text,
  containerStyle,
  textStyle,
}) => (
  <View style={[containerStyle]}>
    <Text style={[styles.text, textStyle]}>{text}</Text>
  </View>
);

export default SubHeaderText;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
});
