import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import BodyText from "../text/BodyText";

import Colors from "@/constants/color";
import { ButtonProps } from "@/types";

const SecondaryButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  outerContainerStyle,
  buttonStyle,
  textStyle,
}) => {
  return (
    <View style={outerContainerStyle}>
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
    </View>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.gray[700],
    borderRadius: 8,
    borderColor: Colors.gray[400],
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.gray[200],
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
