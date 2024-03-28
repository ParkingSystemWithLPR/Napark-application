import { useState } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { StyleSheet, View } from "react-native";

import IconButton from "../button/IconButton";
import BodyText from "../text/BodyText";
import SubHeaderText from "../text/SubHeaderText";

import DropdownInput from "@/components/input/DropdownInput";
import TextInput from "@/components/input/TextInput";
import MyTextInput from "@/components/input/TextInput";
import Colors from "@/constants/color";

export type StepPricingProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FieldValues, any>;
};

const StepPricing: React.FC<StepPricingProps> = ({ control }) => {
  const [step, setStep] = useState<number[]>([1]);

  const renderStepConfig = (index: number) => {
    return (
      <View style={styles.formContainer} key={index}>
      <SubHeaderText text={`step ${index+1}`}/>
      <View style={styles.sameLineInputContainer}>
        <Controller
          name={`pricing.${index}.time.type`}
          control={control}
          render={({ field: { onChange, value } }) => (
            <DropdownInput
              selectedValue={value ?? "before"}
              placeholder={""}
              onSelect={onChange}
              items={[
                { value: "before", label: "Before" },
                { value: "after", label: "After" },
              ]}
              containerStyle={{ flex: 1 }}
            />
          )}
        />
        <BodyText text={"H"}/>
        <Controller
          name={`pricing.${index}.time.hour`}
          control={control}
          render={({ field: { onChange, value } }) => (
            <MyTextInput
              placeholder={"Hour"}
              value={value}
              onChangeText={onChange}
              containerStyle={{ flex: 1 }}
              editable
            />
          )}
        />
        <BodyText text={"M"}/>
        <Controller
          name={`pricing.${index}.time.minute`}
          control={control}
          render={({ field: { onChange, value } }) => (
            <MyTextInput
              placeholder={"Minute"}
              value={value}
              onChangeText={onChange}
              containerStyle={{ flex: 1 }}
              editable
            />
          )}
        />
      </View>
      <View style={styles.sameLineInputContainer}>
        <Controller
          name={`pricing.${index}.price`}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              title="Price"
              placeholder="Enter parking fee"
              value={value}
              onChangeText={(value) => onChange(value)}
              containerStyle={{ flex: 1 }}
            />
          )}
        />
        <Controller
          name={`pricing.${index}.unit`}
          control={control}
          render={({ field: { onChange, value } }) => (
            <DropdownInput
              selectedValue={value}
              title="Unit"
              placeholder={"Select fee unit"}
              onSelect={(value) => onChange(value)}
              items={[{ value: "thb/hr", label: "bath / hr" }]}
              containerStyle={{ flex: 1 }}
            />
          )}
        />
      </View>
    </View>
    )
  }

  return (
    <View style={styles.formContainer}>
      {step.map((_, index) => renderStepConfig(index))}
      <View style={styles.buttonContainer}>
        <IconButton
          icon={"plus"}
          size={20}
          color={Colors.gray[900]}
          buttonStyle={styles.adjustFormSetButton}
          onPress={() => {
            setStep([...step, step[step.length-1]+1]);
          }}
        />
        <IconButton
          icon={"minus"}
          size={20}
          color={Colors.gray[900]}
          buttonStyle={
            step.length === 1
              ? styles.disabledButton
              : styles.adjustFormSetButton
          }
          onPress={() => {
            setStep([...step.slice(step.length-1)])
          }}
          disabled={step.length === 1}
        />
      </View>
    </View>
  );
};

export default StepPricing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  formContainer: {
    gap: 10,
  },
  sameLineInputContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: -10,
  },
  adjustFormSetButton: {
    alignItems: "center",
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
  },
  disabledButton: {
    alignItems: "center",
    backgroundColor: Colors.gray[500],
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
  }
});
