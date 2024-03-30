import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import BodyText from "../text/BodyText";

import Colors from "@/constants/color";
import { ButtonProps } from "@/types";

const PrimaryButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  outerContainerStyle,
  buttonStyle,
  textStyle,
  disabled,
}) => {
  return (
    <View style={outerContainerStyle}>
      <Pressable
        android_ripple={{ color: Colors.gray[600] }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        disabled={disabled}
        onPress={onPress}
      >
        <View style={[styles.buttonContainer, buttonStyle]}>
          <BodyText text={title} textStyle={[styles.text, textStyle]} />
        </View>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.red[400],
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  button: {},
  buttonPressed: {
    opacity: 0.5,
  },
  text: {
    color: Colors.white,
  },
});
