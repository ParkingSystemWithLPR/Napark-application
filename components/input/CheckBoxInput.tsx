import Checkbox from "expo-checkbox";
import React from "react";
import { View, StyleSheet } from "react-native";

import Colors from "../../constants/color";
import BodyText from "../text/BodyText";

export type CheckboxInputProps = {
  text: string;
  onPress: () => void;
  isChecked: boolean;
  containerStyle?: object;
  textStyle?: object;
  checkboxStyle?: object;
};

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  text,
  onPress,
  isChecked,
  containerStyle,
  textStyle,
  checkboxStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Checkbox
        style={[styles.checkbox, checkboxStyle]}
        value={isChecked}
        onValueChange={onPress}
        color={isChecked ? Colors.red[400] : undefined}
      />
      <BodyText text={text} textStyle={textStyle} />
    </View>
  );
};

export default CheckboxInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    backgroundColor: Colors.white,
    borderColor: Colors.red[400],
    borderWidth: 1,
    borderRadius: 4,
    height: 20,
    width: 20,
    margin: 8,
  },
});
