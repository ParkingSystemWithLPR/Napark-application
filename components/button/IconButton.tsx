import { ColorValue, StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export type IconButtonProps = {
  icon: string;
  size: number;
  color: number | ColorValue;
  onPress: () => void;
  buttonStyle?: object;
};

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size,
  color,
  onPress,
  buttonStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.buttonContainer, buttonStyle]}>
        <MaterialCommunityIcons name={icon} size={size} color={color} />
      </View>
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    margin: 8,
  },
});
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { ButtonProps } from "../../types";
import BodyText from "../text/BodyText";
import Colors from "../../constants/color";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type IconButtonProps = ButtonProps & { icon: string };

const IconButton: React.FC<IconButtonProps> = ({
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
        color={Colors.blue[800]}
        // style={styles.icon}
      />
        <BodyText text={title} textStyle={[styles.text, textStyle]} />
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.gray[100],
    height: 70,
    width: 70,
    borderRadius: 8,
    paddingVertical: 8,
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
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
