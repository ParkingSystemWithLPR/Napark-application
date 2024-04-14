import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
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
import useEditParkingLot from "@/store/api/parking-lot/useEditParkingLot";
import { useAuth } from "@/store/context/auth";
import { PrivilegeZone, useParkingLot } from "@/store/context/parkingLot";
import { OtherStackParamList, AuthenticatedStackParamList } from "@/types";

export type ConfigPrivilegeProps = CompositeScreenProps<
  NativeStackScreenProps<OtherStackParamList, "ConfigPrivilege">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const ConfigPrivilege: React.FC<ConfigPrivilegeProps> = ({
  navigation,
  route,
}) => {
  const { mode, index: privilegeIndex } = route.params;
  const { parkingLot, setParkingLot, getPrivilegeArea } = useParkingLot();
  const { mutateAsync: editParkingLotAsync } = useEditParkingLot();
  const { accessToken, authenticate } = useAuth();

  const privilegeZones = getPrivilegeArea(privilegeIndex);

  // const privilegeArea = getPrivilegeArea(privilegeIndex); // get all discount list in this privilege
  // const privilegeArea = [{ floor: 1, zone: "A", price: 10, unit: "baht/hr" }];
  const parking_privileges = parkingLot.parking_privileges; // get all privileges
  const category = ManagingCategory.PRIVILEGE;
  const form = useForm();
  const { control, handleSubmit } = form;

  const onSubmit = async (data: FieldValues) => {
    try {
      console.log("data", data);
      const privilege = {
        title: data.name,
        user_ids: [],
        slot_prices: [],
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
          />
        )}
      />
      <Controller
        name={"description"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            title="Description"
            placeholder="Enter your privilege description"
            value={value}
            onChangeText={(value) => onChange(value)}
          />
        )}
      />
      <SubHeaderText text="Privilege" />
      <View style={styles.roleCardContainer}>
        {privilegeZones.map((a, index) => (
          <RoleCard
            category={category}
            roleName={`${a.floor} ${a.zone}`}
            description=""
            key={index}
            onPress={() =>
              navigation.navigate("ConfigZone", {
                form: form,
                mode: ActionMode.EDIT,
                zoneIndex: index,
                data: a,
              })
            }
          />
        ))}
      </View>
      <PrimaryButton
        title="+ Add new zone"
        onPress={() =>
          navigation.navigate("ConfigZone", {
            form: form,
            mode: ActionMode.CREATE,
          })
        }
      />
      <SubHeaderText text="Assign to" />
      <ChangeScreenTab
        icon={"account-supervisor"}
        screenName={"Role"}
        onPress={() => navigation.navigate("RoleMember")}
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
