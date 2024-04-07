import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import DropdownInput from "@/components/input/DropdownInput";
import TextInput from "@/components/input/TextInput";
import StepPricing from "@/components/pricingRule/StepPricing";
import BodyContainer from "@/components/ui/BodyContainer";
import { PriceRateUnit } from "@/enum/ParkingLot";
import { MOCKED_ZONE_DROPDOWN } from "@/mock/mockData";
import { AuthenticatedStackParamList, OtherStackParamList } from "@/types";
import { formatEnumtoDropdownItem } from "@/utils/dropdown";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { Alert, LogBox, StyleSheet, View } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export type ConfigZoneProps = CompositeScreenProps<
  NativeStackScreenProps<OtherStackParamList, "ConfigZone">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const ConfigZone: React.FC<ConfigZoneProps> = ({ navigation, route }) => {
  const form = route.params.form;
  const { control, handleSubmit } = form;

  const [pricingRule, setPricingRule] = useState<string>("all");

  const onSubmit = async (data: FieldValues) => {
    try {
      // await mutateAsync(data);
      console.log("data", data);
    } catch (error) {
      Alert.alert(
        "Create request error",
        "Please try again!!: " + (error as Error).message
      );
    }
  };

  return (
    <BodyContainer innerContainerStyle={styles.container}>
      <View style={styles.dropdownContainer}>
        <Controller
          name="floor"
          control={control}
          render={({ field: { onChange, value } }) => (
            <DropdownInput
              title="Floor"
              selectedValue={value}
              placeholder="Select floor"
              onSelect={onChange}
              items={[{ label: "1", value: "1" }]}
              containerStyle={{ flex: 1 }}
            />
          )}
        />
        <Controller
          name="slot"
          control={control}
          render={({ field: { onChange, value } }) => (
            <DropdownInput
              title="Zone"
              selectedValue={value}
              placeholder="Select zone"
              onSelect={onChange}
              items={MOCKED_ZONE_DROPDOWN.map((z) => {
                return { label: z, value: z };
              })}
              containerStyle={{ flex: 1 }}
            />
          )}
        />
      </View>
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
            name="pricing.price"
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
            name="pricing.unit"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DropdownInput
                selectedValue={value}
                title="Unit"
                placeholder={"Select fee unit"}
                onSelect={(value) => onChange(value)}
                items={formatEnumtoDropdownItem(PriceRateUnit)}
                containerStyle={{ flex: 1 }}
              />
            )}
          />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <SecondaryButton
          title="Cancle"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <PrimaryButton title={"Save"} onPress={handleSubmit(onSubmit)} />
      </View>
    </BodyContainer>
  );
};

export default ConfigZone;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  dropdownContainer: {
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingTop: 20,
  },
  sameLineInputContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
});
