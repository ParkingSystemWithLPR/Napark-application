import React, { useRef } from "react";
import { TouchableOpacity, View, StyleSheet, Animated } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import BodyText from "../text/BodyText";
import Colors from "../../constants/color";

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
  const animatedWidth = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    const toValue = isChecked ? 0 : 30;
    Animated.timing(animatedWidth, {
      toValue: toValue,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        onPress={() => {
          startAnimation();
          onPress();
        }}
        style={[
          styles.checkbox,
          isChecked && styles.checkboxSelected,
          checkboxStyle,
        ]}
      >
        <Animated.View style={{ width: animatedWidth }}>
          <Icon name="checkmark" size={20} style={{ color: "white" }} />
        </Animated.View>
      </TouchableOpacity>
      <BodyText text={text} textStyle={textStyle} />
    </View>
  );
};

export default CheckboxInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    backgroundColor: Colors.white,
    borderColor: Colors.red[400],
    borderWidth: 1,
    borderRadius: 4,
    height: 20,
    width: 20,
  },
  checkboxSelected: {
    backgroundColor: Colors.red[400],
  },
});
