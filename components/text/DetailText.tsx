import { StyleSheet, View, Text } from "react-native";

import { TextProps } from "../../types";

const DetailText: React.FC<TextProps> = ({
  text,
  containerStyle,
  textStyle,
}) => (
  <View style={[containerStyle]}>
    <Text style={[styles.text, textStyle]}>{text}</Text>
  </View>
);

export default DetailText;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
});
