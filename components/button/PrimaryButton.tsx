import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { ButtonProps } from "../../types";
import BodyText from "../text/BodyText";
import Colors from "../../constants/color";

const PrimaryButton: React.FC<ButtonProps> = ({
  title,
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
    >
      <View style={[styles.buttonContainer, buttonStyle]}>
        <BodyText text={title} textStyle={[styles.text, textStyle]} />
      </View>
    </Pressable>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.red[400],
    borderRadius: 8,
    paddingVertical: 8,
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
