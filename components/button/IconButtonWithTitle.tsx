import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { ButtonProps } from "../../types";
import BodyText from "../text/BodyText";
import Colors from "../../constants/color";

type IconButtonWithTitleProps = ButtonProps & { icon: string };

const IconButtonWithTitle: React.FC<IconButtonWithTitleProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  icon,
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
        <MaterialCommunityIcons
          name={icon}
          size={30}
          color={Colors.red[400]}
        />
        <BodyText text={title} textStyle={[styles.text, textStyle]} />
      </View>
    </Pressable>
  );
};

export default IconButtonWithTitle;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.white,
    height: 70,
    width: 70,
    borderRadius: 8,
    paddingVertical: 8,
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
