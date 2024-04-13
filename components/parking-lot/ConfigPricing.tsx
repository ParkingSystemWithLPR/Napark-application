import { useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { StyleSheet, View, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import SubHeaderText from "../text/SubHeaderText";

import DropdownInput from "@/components/input/DropdownInput";
import TextInput from "@/components/input/TextInput";
import Colors from "@/constants/color";
import { PriceRateUnit } from "@/enum/ParkingLot";
import { ParkingLotRequest, Plan, Zone } from "@/types/parking-lot";
import { formatEnumtoDropdownItem } from "@/utils/dropdown";

export type ConfigPricingProps = {
  form: UseFormReturn<ParkingLotRequest, any, undefined>;
};

const IMAGE_SIZE = { width: 350, height: 200 };

const ConfigPricing: React.FC<ConfigPricingProps> = ({ form }) => {
  const {
    control,
    getValues,
    formState: { errors },
  } = form;
  const [pricingRule, setPricingRule] = useState<string>("all");
  const plan = getValues().plan;

  return (
    <ScrollView style={styles.container}>
      {plan.map((value: Plan, index: number) => (
        <View style={styles.formContainer} key={`floor-${value.floor}`}>
          <SubHeaderText text={`Floor ${value.floor}`} />
          <Image
            source={{
              uri: "data:image/jpeg;base64," + value.image.content,
            }}
            height={IMAGE_SIZE.height}
            width={IMAGE_SIZE.width}
            style={styles.image}
          />
          {value.zones.map((zone: Zone, zIndex: number) => (
            <View key={`${index}${zIndex}`}>
              <SubHeaderText
                text={"Zone " + zone.name}
                textStyle={{ marginBottom: 10 }}
              />
              <View style={styles.settingContainer}>
                <DropdownInput
                  selectedValue={pricingRule}
                  title="Pricing rule"
                  placeholder={""}
                  onSelect={(value) => setPricingRule(value)}
                  items={[
                    { value: "all", label: "Apply same price to all slot" },
                    // { value: "step", label: "Apply pricing step" },
                  ]}
                />
                {/* {pricingRule === "step" && <StepPricing control={control} />} */}
                {pricingRule === "all" && (
                  <View style={styles.sameLineInputContainer}>
                    <Controller
                      name={`plan.${index}.zones.${zIndex}.price`}
                      control={control}
                      rules={{
                        required: `Please enter zone ${zone.name} price`,
                      }}
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          title="Price"
                          placeholder="Enter parking fee"
                          value={value ? value.toString() : ""}
                          onChangeText={(value) => onChange(parseInt(value))}
                          errorText={
                            errors.plan &&
                            errors.plan[index]?.zones?.[zIndex]?.price?.message
                          }
                          containerStyle={{ flex: 1 }}
                          isRequired
                        />
                      )}
                    />
                    <Controller
                      name={`plan.${index}.zones.${zIndex}.price_unit`}
                      control={control}
                      rules={{
                        required: `Please select ${zone.name} price unit`,
                      }}
                      render={({ field: { onChange, value } }) => (
                        <DropdownInput
                          selectedValue={value ?? ""}
                          title="Unit"
                          placeholder={"Select fee unit"}
                          onSelect={(value) => onChange(value)}
                          items={formatEnumtoDropdownItem(PriceRateUnit)}
                          containerStyle={{ flex: 1 }}
                          errorText={
                            errors.plan &&
                            errors.plan[index]?.zones?.[zIndex]?.price_unit
                              ?.message
                          }
                          isRequired
                        />
                      )}
                    />
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      ))}
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
  image: {
    borderRadius: 12,
    marginRight: 10,
  },
  sameLineInputContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  settingContainer: {
    gap: 10,
    borderRadius: 8,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
});
