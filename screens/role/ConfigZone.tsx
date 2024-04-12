import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import DropdownInput from "@/components/input/DropdownInput";
import ParkingZonePrivilegeInput from "@/components/input/ParkingZonePrivilegeInput";
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
  const { form, mode, index } = route.params;
  const { control } = form;

  return (
    <BodyContainer innerContainerStyle={styles.container}>
      <Controller
        name="privilege"
        control={control}
        render={({ field: { onChange, value } }) => (
          <ParkingZonePrivilegeInput
            value={value}
            onChange={onChange}
            mode={mode}
            zoneIndex={index}
            form={form}
          />
        )}
      />
      <View style={styles.buttonContainer}>
        <SecondaryButton
          title="Cancle"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <PrimaryButton title={"Save"} onPress={() => navigation.goBack()} />
      </View>
    </BodyContainer>
  );
};

export default ConfigZone;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingTop: 20,
    paddingBottom: 50,
  },
});
