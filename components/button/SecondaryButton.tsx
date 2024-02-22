import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { ButtonProps } from "../../types";
import BodyText from "../text/BodyText";
import Colors from "../../constants/color";

const SecondaryButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
}) => {
  return (
    <Pressable
      android_ripple={{ color: Colors.gray[600] }}
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.buttonPressed : null,
      ]}
      onPress={onPress}
    >
      <View style={[styles.buttonContainer, buttonStyle]}>
        <BodyText text={title} textStyle={[styles.text, textStyle]} />
      </View>
    </Pressable>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.gray[700],
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {},
  buttonPressed: {
    opacity: 0.5,
  },
  text: {
    color: Colors.white,
  },
});
