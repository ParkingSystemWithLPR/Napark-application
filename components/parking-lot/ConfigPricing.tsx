import { useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import StepPricing from "../pricingRule/StepPricing";

import DropdownInput from "@/components/input/DropdownInput";
import TextInput from "@/components/input/TextInput";
import { Plan, Zone } from "@/types/parking-lot/ParkingLot";
import BodyText from "../text/BodyText";
import SubHeaderText from "../text/SubHeaderText";

export type ConfigPricingProps = {
  form: UseFormReturn<FieldValues, any, undefined>;
};

const ConfigPricing: React.FC<ConfigPricingProps> = ({ form }) => {
  const { control, getValues } = form;
  const [pricingRule, setPricingRule] = useState<string>("all");
  const plan = getValues().plan;

  return (
    <ScrollView style={styles.container}>
      {plan.map((value: Plan, index: number) => {
        return value.zone.map((zone: Zone, zIndex: number) => (
          <>
            <SubHeaderText text={"floor " + value.floor + " zone " + zone.name}/>
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
            {pricingRule === "step" && <StepPricing control={control} />}
            {pricingRule === "all" && (
              <View style={styles.sameLineInputContainer}>
                <Controller
                  name={`plan.${index}.zone.${zIndex}.price`}
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
                  name={`plan.${index}.zone.${zIndex}.price_unit`}
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
          </>
        ));
      })}
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
