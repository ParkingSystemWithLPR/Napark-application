import { useState } from "react";
import { StyleSheet, Text, Linking, TouchableHighlight } from "react-native";

import Colors from "@/constants/color";
import { HyperlinkTextProps } from "@/types";

const HyperLinkText: React.FC<HyperlinkTextProps> = ({
  text,
  containerStyle,
  textStyle,
  url,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };
  return (
    <TouchableHighlight
      style={[containerStyle]}
      underlayColor="transparent"
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => {
        Linking.openURL(url);
      }}
    >
      <Text style={[styles.text, textStyle, isPressed && styles.highlighted]}>
        {text}
      </Text>
    </TouchableHighlight>
  );
};

export default HyperLinkText;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
  highlighted: {
    color: Colors.red[500],
  },
});
