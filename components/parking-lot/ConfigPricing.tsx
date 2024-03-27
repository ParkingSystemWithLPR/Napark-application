import { useState } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import StepPricing from "../pricingRule/StepPricing";

import DropdownInput from "@/components/input/DropdownInput";
import TextInput from "@/components/input/TextInput";

export type ConfigPricingProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FieldValues, any>;
};

const ConfigPricing: React.FC<ConfigPricingProps> = ({ control }) => {
  const [pricingRule, setPricingRule] = useState<string>("all");

  return (
    <ScrollView style={styles.container}>
      <DropdownInput
        selectedValue={pricingRule}
        title="Pricing rule"
        placeholder={""}
        onSelect={(value) => setPricingRule(value)}
        items={[
          { value: "all", label: "Apply same price to all slot" },
          { value: "step", label: "Apply pricing step" },
        ]}
      />
      {pricingRule === "step" && <StepPricing control={control}/>}
      {pricingRule === "all" && (
        <View style={styles.sameLineInputContainer}>
          <Controller
            name={"price"}
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
            name={"unit"}
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
      )}
    </ScrollView>
  );
};

export default ConfigPricing;

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
  },
});
