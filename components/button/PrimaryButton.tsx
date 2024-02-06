import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { ButtonProps } from "../../types";

const PrimaryButton: React.FC<ButtonProps> = ({ title, style }) => {
  return (
    <Pressable
      android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.buttonPressed : null,
      ]}
    >
      <View style={[styles.buttonContainer, style]}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#F14951",
    borderRadius: 8,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {},
  buttonPressed: {
    opacity: 0.5,
  },
  text: {
    color: "white",
  },
});
