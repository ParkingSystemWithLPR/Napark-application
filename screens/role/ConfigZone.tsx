import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { LogBox, StyleSheet, View } from "react-native";

import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import ParkingZonePrivilegeInput from "@/components/input/ParkingZonePrivilegeInput";
import BodyContainer from "@/components/ui/BodyContainer";
import { AuthenticatedStackParamList, OtherStackParamList } from "@/types";
import { ZonePricing } from "@/types/parking-lot";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export type ConfigZoneProps = CompositeScreenProps<
  NativeStackScreenProps<OtherStackParamList, "ConfigZone">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const ConfigZone: React.FC<ConfigZoneProps> = ({ navigation, route }) => {
  const { form, mode, zoneIndex, data } = route.params;
  const { control, handleSubmit, setValue } = form;

  const [zones, setZones] = useState<ZonePricing[]>(
    !!data ? [data] : [{ floor: 0, zone: "A", price: 0, unit: "baht/hour" }]
  );

  const updateForm = () => {
    setValue("privilege", zones);
  };

  return (
    <BodyContainer innerContainerStyle={styles.container}>
      <ParkingZonePrivilegeInput
        mode={mode}
        form={form}
        zones={zones}
        setZones={setZones}
      />
      <View style={styles.buttonContainer}>
        <SecondaryButton
          title="Cancle"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <PrimaryButton
          title={"Save"}
          onPress={() => {
            updateForm();
            navigation.goBack();
          }}
        />
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
