import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";

import TextInput, { InputType } from "./TextInput";
import BodyText from "../text/BodyText";

export type RangeInputProps = {
  values: number[];
  onChange: (values: number[]) => void;
  title?: string;
  min?: number;
  max?: number;
  step?: number;
  snapped?: boolean;
  allowOverlap?: boolean;
};

const RangeInput: React.FC<RangeInputProps> = ({
  values,
  onChange,
  title,
  min = 0,
  max = 100,
  step = 10,
  snapped = false,
  allowOverlap = false,
}) => {
  const handleValuesChange = useCallback((newValues: number[]) => {
    if (newValues[1] > newValues[0]) {
      onChange(newValues);
    } else {
      onChange([newValues[1], newValues[0]]);
    }
  }, []);

  return (
    <View style={styles.container}>
      {title && (
        <View style={styles.titleContainer}>
          <BodyText text={title} />
        </View>
      )}
      <MultiSlider
        values={values}
        onValuesChange={handleValuesChange}
        min={min}
        max={max}
        step={step}
        snapped={snapped}
        allowOverlap={allowOverlap}
      />
      <View style={styles.inputGroupContainer}>
        <TextInput
          value={values[0].toString()}
          prefix="฿"
          placeholder="min"
          onChangeText={(value) =>
            handleValuesChange([Math.max(min, +value), values[1]])
          }
          containerStyle={styles.inputContainer}
          inputMode={InputType.Numeric}
        />
        <TextInput
          value={values[1].toString()}
          prefix="฿"
          placeholder="max"
          onChangeText={(value) =>
            handleValuesChange([values[0], Math.min(max, +value)])
          }
          containerStyle={styles.inputContainer}
          inputMode={InputType.Numeric}
        />
      </View>
    </View>
  );
};

export default RangeInput;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  titleContainer: {
    width: "100%",
  },
  inputGroupContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    width: "25%",
  },
});
