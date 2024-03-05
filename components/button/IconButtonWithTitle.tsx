import React from "react";
import { ColorValue, Pressable, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Colors from "../../constants/color";
import { ButtonProps } from "../../types";
import BodyText from "../text/BodyText";

type IconButtonWithTitleProps = ButtonProps & {
  icon: string;
  iconColor?: ColorValue;
  iconSize?: number;
};

const IconButtonWithTitle: React.FC<IconButtonWithTitleProps> = ({
  title,
  onPress,
  buttonStyle,
  containerStyle,
  textStyle,
  icon,
  iconColor = Colors.red[400],
  iconSize = 30,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
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
            size={iconSize}
            color={iconColor}
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
    justifyContent: "center",
    alignItems: "center",
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
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "100%",
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
