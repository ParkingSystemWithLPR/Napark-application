import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, LogBox, StyleSheet, View } from "react-native";

import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import ParkingZonePrivilegeInput from "@/components/input/ParkingZonePrivilegeInput";
import BodyContainer from "@/components/ui/BodyContainer";
import { ActionMode } from "@/enum/ActionMode";
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
  const { form, mode, hasEditPermission, data, zoneIndex, onEditPrivilege } =
    route.params;
  const { setValue, getValues } = form;

  const [zones, setZones] = useState<ZonePricing[]>(!!data ? [data] : [{}]);

  const onSave = () => {
    if (mode === ActionMode.EDIT) {
      const { floor, zone, price, unit } = zones[0];
      if (
        zoneIndex !== undefined &&
        floor &&
        zone &&
        price &&
        unit &&
        onEditPrivilege
      ) {
        onEditPrivilege(zoneIndex, zones[0]);
      } else {
        Alert.alert("Please fill all information");
        return;
      }
    } else if (mode === ActionMode.DRAFT) {
      if (zoneIndex) {
        const newPrivilege = getValues("privilege");
        newPrivilege[zoneIndex] = zones[0];
        setValue("privilege", newPrivilege);
      }
    } else {
      for (let i = 0; i < zones.length; i++) {
        const { floor, zone, price, unit } = zones[i];
        if (!floor || !zone || !price || !unit) {
          Alert.alert("Please fill all information.");
          return;
        }
      }
      const oldPrivilege: ZonePricing[] = getValues("privilege") || [];
      setValue("privilege", [...oldPrivilege, ...zones]);
    }
    navigation.goBack();
  };

  return (
    <BodyContainer innerContainerStyle={styles.container}>
      <ParkingZonePrivilegeInput
        mode={mode}
        zones={zones}
        setZones={setZones}
        hasEditPermission={hasEditPermission}
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
