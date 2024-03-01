import MultiSlider, { LabelProps } from "@ptomasroos/react-native-multi-slider";
import { useState } from "react";
import { LayoutChangeEvent, View, StyleSheet, Platform } from "react-native";

import Colors from "../../constants/color";
import BodyText from "../text/BodyText";
import SubHeaderText from "../text/SubHeaderText";

export type SliderInputProps = {
  min: number;
  max: number;
  step: number;
  value: number[];
  onValuesChange: (value: number[]) => void;
  isRequired?: boolean;
  title?: string;
  valuePrefix?: string;
  customLabel?: React.FC<LabelProps>;
};
const SliderInput: React.FC<SliderInputProps> = ({
  min,
  max,
  step,
  title,
  isRequired,
  value,
  onValuesChange,
  customLabel,
}) => {
  const [isLabelEnable, setIsLabelEnable] = useState(false);
  const [width, setWidth] = useState(0);
  const valueChangeHandler = () => {
    setIsLabelEnable(false);
  };
  const valueChangeStartHandler = () => {
    setIsLabelEnable(true);
  };
  const checkWidth = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setWidth(width);
  };
  return (
    <View onLayout={checkWidth}>
      {title && (
        <View style={styles.titleContainer}>
          <SubHeaderText text={title} />
          {isRequired && (
            <BodyText text="*" textStyle={styles.requiredIndicator} />
          )}
        </View>
      )}
      <MultiSlider
        values={value}
        min={min}
        max={max}
        step={step}
        enableLabel={isLabelEnable}
        allowOverlap={false}
        onValuesChangeFinish={valueChangeHandler}
        onValuesChange={onValuesChange}
        onValuesChangeStart={valueChangeStartHandler}
        sliderLength={width}
        customLabel={customLabel}
        trackStyle={styles.trackStyle}
        selectedStyle={styles.selectedStyle}
        markerStyle={styles.markerStyle}
      />
    </View>
  );
};
export default SliderInput;

const styles = StyleSheet.create({
  outerContainer: {
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray[800],
    borderRadius: 8,
    padding: 8,
    paddingVertical: Platform.OS === "android" ? 5 : null,
  },
  requiredIndicator: {
    color: Colors.red[400],
  },
  trackStyle: { backgroundColor: Colors.gray[800] },
  selectedStyle: {
    backgroundColor: Colors.red[300],
  },
  markerStyle: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray[800],
    padding: 10,
  },
});
