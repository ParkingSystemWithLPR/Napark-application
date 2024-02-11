import { StyleSheet, View, Text } from "react-native";

import { TextProps } from "../../types";

const HeaderText: React.FC<TextProps> = ({
  text,
  containerStyle,
  textStyle,
}) => (
  <View style={[containerStyle]}>
    <Text style={[styles.text, textStyle]}>{text}</Text>
  </View>
);

export default HeaderText;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 28,
    color: "#F14951",
  },
});
