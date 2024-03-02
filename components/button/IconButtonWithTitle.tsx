import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import BodyText from "../text/BodyText";

import Colors from "@/constants/color";
import { ButtonProps } from "@/types";

type IconButtonWithTitleProps = ButtonProps & { icon: string };

const IconButtonWithTitle: React.FC<IconButtonWithTitleProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  icon,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: Colors.gray[600] }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}
      >
        <View style={[styles.buttonContainer, buttonStyle]}>
          <MaterialCommunityIcons
            name={icon}
            size={30}
            color={Colors.red[400]}
          />
          <BodyText text={title} textStyle={[styles.text, textStyle]} />
        </View>
      </Pressable>
    </View>
  );
};

export default IconButtonWithTitle;

const styles = StyleSheet.create({
  container: {
    shadowColor: Colors.black,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    borderRadius: 8,
    backgroundColor: Colors.white,
    height: 70,
    width: 70,
    paddingVertical: 8,
    gap: 5,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {},
  buttonPressed: {
    opacity: 0.5,
  },
  text: {
    color: Colors.black,
    fontSize: 16,
  },
});
