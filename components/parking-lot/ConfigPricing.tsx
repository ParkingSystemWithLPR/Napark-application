import { useState } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { Image, StyleSheet, View } from "react-native";

import DropdownInput from "@/components/input/DropdownInput";
import TextInput from "@/components/input/TextInput";

export type ConfigPricingProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FieldValues, any>;
};

const ConfigPricing: React.FC<ConfigPricingProps> = ({ control }) => {
  const [pricingRule, setPricingRule] = useState<string>("all");
  return (
    <View style={{ flex: 1 }}>
      <Image/>
      <DropdownInput
        selectedValue={pricingRule}
        title="Pricing rule"
        placeholder={""}
        onSelect={(value) => setPricingRule(value)}
        items={[{ value: "all", label: "Apply same price to all slot" }]}
      />
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
              onSelect={() => onChange(value)}
              items={[{ value: "thb/hr", label: "bath / hr" }]}
              containerStyle={{ flex: 1 }}
            />
          )}
        />
      </View>
    </View>
  );
};

export default ConfigPricing;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    paddingBottom: 100,
  },
  sameLineInputContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
});
