import { LabelProps } from "@ptomasroos/react-native-multi-slider";
import React from "react";
import { View, StyleSheet, Animated } from "react-native";

import Colors from "../../constants/color";
import BodyText from "../text/BodyText";

//just copy from https://github.com/ptomasroos/react-native-multi-slider/blob/master/examples/Basic/CustomLabel.js i dont know how it work but it works :D

const AnimatedView = Animated.createAnimatedComponent(View);

const width = 75;
const height = 40;
type LabelBaseProps = {
  position: number;
  value: string | number;
  pressed: boolean;
};

const LabelBase: React.FC<LabelBaseProps> = ({ position, value, pressed }) => {
  const scaleValue = React.useRef(new Animated.Value(0.1)); // Behaves oddly if set to 0
  const cachedPressed = React.useRef(pressed);

  React.useEffect(() => {
    Animated.timing(scaleValue.current, {
      toValue: pressed ? 1 : 0.1,
      duration: 200,
      delay: pressed ? 0 : 2000,
      useNativeDriver: false,
    }).start();
    cachedPressed.current = pressed;
  }, [pressed]);

  return (
    Number.isFinite(position) &&
    Number.isFinite(value) && (
      <AnimatedView
        style={[
          styles.sliderLabel,
          {
            left: position - width / 2,
            transform: [
              { translateY: width },
              { scale: scaleValue.current },
              { translateY: -width },
            ],
          },
        ]}
      >
        <BodyText
          containerStyle={styles.sliderLabelTextContainer}
          text={value + " hours"}
          textStyle={styles.LabelText}
        />
      </AnimatedView>
    )
  );
};

export default function CustomLabel(props: LabelProps) {
  const { oneMarkerValue, oneMarkerLeftPosition, oneMarkerPressed } = props;

  return (
    <View style={styles.parentView}>
      <LabelBase
        position={oneMarkerLeftPosition}
        value={oneMarkerValue}
        pressed={oneMarkerPressed}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  parentView: {
    position: "relative",
  },
  sliderLabel: {
    position: "absolute",
    justifyContent: "center",
    bottom: "100%",
    width: width,
    height: height,
  },
  sliderLabelTextContainer: {
    backgroundColor: Colors.white,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    borderRadius: 5,
  },
  LabelText: {
    color: Colors.gray[900],
  },
});
