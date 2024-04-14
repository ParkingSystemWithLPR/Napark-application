import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, LogBox, StyleSheet, View } from "react-native";

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

  const [zones, setZones] = useState<ZonePricing[]>(!!data ? [data] : [{}]);

  const onSave = () => {
    for (let i = 0; i < zones.length; i++) {
      const { floor, zone, price, unit } = zones[i];
      if (!floor || !zone || !price || !unit) {
        console.log(zones[i])
        Alert.alert("Please fill all information.");
        return;
      }
    }
    setValue("privilege", zones);
    navigation.goBack();
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
            onSave();
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
