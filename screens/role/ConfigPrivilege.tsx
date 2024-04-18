import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Alert, StyleSheet, View } from "react-native";

import ChangeScreenTab from "@/components/button/ChangeScreenTab";
import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import RoleCard from "@/components/card/RoleCard";
import TextInput from "@/components/input/TextInput";
import SubHeaderText from "@/components/text/SubHeaderText";
import BodyContainer from "@/components/ui/BodyContainer";
import { ActionMode } from "@/enum/ActionMode";
import { ManagingCategory } from "@/enum/ManagingCategory";
import { PriceRateUnit } from "@/enum/ParkingLot";
import useEditParkingLot from "@/store/api/parking-lot/useEditParkingLot";
import { usePrivilege } from "@/store/api/parking-lot/useGetPrivilegeById";
import { useGetProfile } from "@/store/api/user/useGetProfile";
import { useAuth } from "@/store/context/auth";
import { useParkingLot } from "@/store/context/parkingLot";
import { OtherStackParamList, AuthenticatedStackParamList } from "@/types";
import { SlotPriceProfile } from "@/types/booking";
import { ParkingPrivilegeProfile, ZonePricing } from "@/types/parking-lot";

export type ConfigPrivilegeProps = CompositeScreenProps<
  NativeStackScreenProps<OtherStackParamList, "ConfigPrivilege">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const ConfigPrivilege: React.FC<ConfigPrivilegeProps> = ({
  navigation,
  route,
}) => {
  const category = ManagingCategory.PRIVILEGE;
  const form = useForm();
  const { control, handleSubmit, getValues } = form;
  const { mode, index: privilegeIndex } = route.params;
  const { parkingLot, setParkingLot, getPrivilegeArea } = useParkingLot();
  const { mutateAsync: editParkingLotAsync } = useEditParkingLot();
  const { accessToken, authenticate } = useAuth();
  const parking_privileges = parkingLot.parking_privileges;
  const privileges = usePrivilege({
    queryParams: { parkingLotId: parkingLot._id },
    auth: { accessToken, authenticate },
  });
  const [privilegeZones, setPrivilegeZones] = useState<SlotPriceProfile[]>([]);
  const draftPrivileges: ZonePricing[] = getValues("privilege") ?? [];
  const [editedPrivilegeZones, setEditedPrivilegeZones] =
    useState<ZonePricing[]>(privilegeZones);

  // const getProfile = useGetProfile({ auth: { accessToken, authenticate } });
  // const { _, _, _, hasEditPermission, hasAssignPermission } =
  //   getProfile.parking_privilege;
  const hasEditPermission = true;
  const hasAssignPermission = true;

  useEffect(() => {
    if (privileges.isSuccess) {
      setPrivilegeZones(privileges.data[privilegeIndex]?.slot_prices ?? []);
    }
  }, [privileges.data]);

  useEffect(() => {
    const newEditedPrivilegeZones = [];
    const zonesSet = new Set();
    if (privilegeZones.length !== 0) {
      for (let i = 0; i < privilegeZones.length; i++) {
        if (
          !zonesSet.has(`${privilegeZones[i].floor} ${privilegeZones[i].zone}`)
        ) {
          zonesSet.add(`${privilegeZones[i].floor} ${privilegeZones[i].zone}`);
          newEditedPrivilegeZones.push({
            floor: privilegeZones[i].floor,
            zone: privilegeZones[i].zone,
            price: privilegeZones[i].price_rate,
            unit: privilegeZones[i].price_rate_unit,
          });
        }
      }
    }
    setEditedPrivilegeZones(newEditedPrivilegeZones);
  }, [privilegeZones]);

  const onEditPrivilege = (idx: number, zone: ZonePricing) => {
    const newEditedPrivilegeZones = editedPrivilegeZones;
    newEditedPrivilegeZones[idx] = zone;
    setEditedPrivilegeZones(newEditedPrivilegeZones);
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      const slot_prices: SlotPriceProfile[] = [];
      const totalPrivileges = [...editedPrivilegeZones, ...draftPrivileges];
      const mappedPrivileges = totalPrivileges.map(
        (x) => `${x.floor} ${x.zone}`
      );
      const totalPrivilegesSet = new Set(mappedPrivileges);
      if (totalPrivilegesSet.size !== totalPrivileges.length) {
        throw Error("Please make sure that the zones are not duplicated.");
      }
      totalPrivileges.map((p) => {
        parkingLot.slots.map((s) => {
          if (s.floor === p.floor && s.zone === p.zone) {
            slot_prices.push({
              slot_id: s._id,
              slot_name: s.name,
              floor: s.floor,
              zone: s.zone,
              price_rate: p.price ?? 0,
              price_rate_unit: p.unit ?? PriceRateUnit.BAHT_PER_HOUR,
            });
          }
        });
      });
      const privilege = {
        title: data.name,
        user_ids:
          data.user_ids ?? parking_privileges[privilegeIndex]?.user_ids ?? [],
        slot_prices: slot_prices,
      };
      if (mode === ActionMode.CREATE) {
        parking_privileges.push(privilege);
      } else {
        parking_privileges[privilegeIndex] = privilege;
      }
      await editParkingLotAsync(
        {
          queryParams: {
            parkingLotId: parkingLot._id,
            editParams: { parking_privileges: parking_privileges },
          },
          auth: { accessToken, authenticate },
        },
        {
          onSuccess(data) {
            setParkingLot(data);
          },
        }
      );
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        "Create request error",
        "Please try again!!: " + (error as Error).message
      );
    }
  };

  return (
    <BodyContainer innerContainerStyle={styles.container}>
      <Controller
        name={"name"}
        control={control}
        defaultValue={parking_privileges[privilegeIndex]?.title}
        render={({ field: { onChange, value } }) => (
          <TextInput
            title="Name"
            placeholder="Enter your privilege name"
            value={value}
            onChangeText={(value) => onChange(value)}
            editable={hasEditPermission}
          />
        )}
      />
      <Controller
        name={"description"}
        control={control}
        // defaultValue={parking_privileges[privilegeIndex]?.description}
        render={({ field: { onChange, value } }) => (
          <TextInput
            title="Description"
            placeholder="Enter your privilege description"
            value={value}
            onChangeText={(value) => onChange(value)}
            editable={hasEditPermission}
          />
        )}
      />
      <SubHeaderText text="Privilege" />
      <View style={styles.roleCardContainer}>
        {editedPrivilegeZones.map((a, index) => (
          <RoleCard
            category={category}
            roleName={`Floor ${a.floor} Zone ${a.zone}`}
            description={`${a.price} ${a.unit}`}
            key={index}
            onPress={() =>
              navigation.navigate("ConfigZone", {
                form: form,
                mode: ActionMode.EDIT,
                hasEditPermission: hasEditPermission,
                zoneIndex: index,
                data: a,
                onEditPrivilege: onEditPrivilege,
              })
            }
            disabled={!hasEditPermission}
          />
        ))}
        {draftPrivileges?.map((a, index) => (
          <RoleCard
            category={category}
            roleName={`Floor: ${a.floor} Zone: ${a.zone}`}
            description=""
            key={index}
            onPress={() =>
              navigation.navigate("ConfigZone", {
                form: form,
                mode: ActionMode.DRAFT,
                hasEditPermission: hasEditPermission,
                zoneIndex: index,
                data: a,
              })
            }
            disabled={!hasEditPermission}
          />
        ))}
      </View>
      <PrimaryButton
        title="+ Add new zone"
        onPress={() =>
          navigation.navigate("ConfigZone", {
            form: form,
            mode: ActionMode.CREATE,
            hasEditPermission: hasEditPermission,
          })
        }
        disabled={!hasEditPermission}
      />
      <SubHeaderText text="Assign to" />
      <ChangeScreenTab
        icon={"account-supervisor"}
        screenName={"Role"}
        onPress={() =>
          navigation.navigate("RoleMember", {
            form: form,
            userList: parking_privileges[privilegeIndex]?.user_ids ?? [],
            hasAssignPermission: hasAssignPermission,
          })
        }
      />
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

export default ConfigPrivilege;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  roleCardContainer: {
    paddingTop: 10,
    gap: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingTop: 20,
  },
});
