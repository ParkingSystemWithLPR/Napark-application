import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Alert, StyleSheet, Switch, View } from "react-native";

import ChangeScreenTab from "@/components/button/ChangeScreenTab";
import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import TextInput from "@/components/input/TextInput";
import BodyText from "@/components/text/BodyText";
import SubHeaderText from "@/components/text/SubHeaderText";
import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";
import { ActionMode } from "@/enum/ActionMode";
import useEditParkingLot from "@/store/api/parking-lot/useEditParkingLot";
import { useGetProfile } from "@/store/api/user/useGetProfile";
import { useAuth } from "@/store/context/auth";
import { useParkingLot } from "@/store/context/parkingLot";
import { AuthenticatedStackParamList, OtherStackParamList } from "@/types";

export type ConfigRoleProps = CompositeScreenProps<
  NativeStackScreenProps<OtherStackParamList, "ConfigRole">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const ConfigRole: React.FC<ConfigRoleProps> = ({ navigation, route }) => {
  const { mode, index } = route.params;
  const { parkingLot, setParkingLot } = useParkingLot();
  const management_roles = parkingLot.management_roles;
  const { accessToken, authenticate } = useAuth();
  const { mutateAsync: editParkingLotAsync } = useEditParkingLot();
  const form = useForm();
  const { control, handleSubmit, getValues } = form;
  const [isEnableEditRole, setEnableEditRole] = useState<boolean>(false);
  const [isEnableManageParkingSpace, setEnableManageParkingSpace] =
    useState<boolean>(false);
  const [isEnableAssignRole, setEnableAssignRole] = useState<boolean>(false);
  const [isEnableAssignPrivilege, setEnableAssignPrivilege] =
    useState<boolean>(false);
  const [isEnableEditPrivilege, setEnableEditPrivilege] =
    useState<boolean>(false);
  // const getProfile = useGetProfile({ auth: { accessToken, authenticate } });
  // const { _, hasEditPermission, hasAssignPermission, _, _ } =
  //   getProfile.management_role;
  const hasEditPermission = false;
  const hasAssignPermission = true;

  const onSubmit = async (data: FieldValues) => {
    try {
      const role = {
        title: data.name,
        user_ids: data.user_ids ?? management_roles[index]?.user_ids,
        permissions: {
          manage_parking_space: data.manageParkingSpace,
          edit_management_role: data.editRole,
          assign_management_role_members: data.assignRole,
          edit_parking_privilege: data.editPrivilege,
          assign_parking_privilege_members: data.assignPrivilege,
        },
      };
      console.log(role);
      if (mode === ActionMode.CREATE) {
        management_roles.push(role);
      } else {
        management_roles[index] = role;
      }
      await editParkingLotAsync(
        {
          queryParams: {
            parkingLotId: parkingLot._id,
            editParams: { management_roles: management_roles },
          },
          auth: { accessToken: accessToken, authenticate: authenticate },
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
        defaultValue={management_roles[index]?.title}
        render={({ field: { onChange, value } }) => (
          <TextInput
            title="Name"
            placeholder="Enter your role name"
            value={value}
            onChangeText={(value) => onChange(value)}
            editable={hasEditPermission}
          />
        )}
      />
      <Controller
        name={"description"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            title="Description"
            placeholder="Enter your role description"
            value={value}
            onChangeText={(value) => onChange(value)}
            editable={hasEditPermission}
          />
        )}
      />
      <SubHeaderText text="Permission" />
      <View style={styles.permissionSetting}>
        <Controller
          name={"manageParkingSpace"}
          control={control}
          render={({ field: { onChange } }) => (
            <View style={styles.switchContainer}>
              <BodyText
                text="Manage parking space"
                textStyle={styles.permissionText}
              />
              <Switch
                disabled={!hasEditPermission}
                onValueChange={(value) => {
                  onChange(value);
                  setEnableManageParkingSpace(
                    (previousState) => !previousState
                  );
                }}
                value={isEnableManageParkingSpace}
              />
            </View>
          )}
        />
        <Controller
          name={"editRole"}
          control={control}
          render={({ field: { onChange } }) => (
            <View style={styles.switchContainer}>
              <BodyText
                text="Edit managing role"
                textStyle={styles.permissionText}
              />

              <Switch
                disabled={!hasEditPermission}
                onValueChange={(value) => {
                  onChange(value);
                  setEnableEditRole((previousState) => !previousState);
                }}
                value={isEnableEditRole}
              />
            </View>
          )}
        />
        <Controller
          name={"assignRole"}
          control={control}
          render={({ field: { onChange } }) => (
            <View style={styles.switchContainer}>
              <BodyText
                text="Assign managing role member"
                textStyle={styles.permissionText}
              />
              <Switch
                disabled={!hasEditPermission}
                onValueChange={(value) => {
                  onChange(value);
                  setEnableAssignRole((previousState) => !previousState);
                }}
                value={isEnableAssignRole}
              />
            </View>
          )}
        />
        <Controller
          name={"editPrivilege"}
          control={control}
          render={({ field: { onChange } }) => (
            <View style={styles.switchContainer}>
              <BodyText
                text="Edit parking privilege"
                textStyle={styles.permissionText}
              />
              <Switch
                disabled={!hasEditPermission}
                onValueChange={(value) => {
                  onChange(value);
                  setEnableEditPrivilege((previousState) => !previousState);
                }}
                value={isEnableEditPrivilege}
              />
            </View>
          )}
        />
        <Controller
          name={"assignPrivilege"}
          control={control}
          render={({ field: { onChange } }) => (
            <View style={styles.switchContainer}>
              <BodyText
                text="Assign parking privilege"
                textStyle={styles.permissionText}
              />
              <Switch
                disabled={!hasEditPermission}
                onValueChange={(value) => {
                  onChange(value);
                  setEnableAssignPrivilege((previousState) => !previousState);
                }}
                value={isEnableAssignPrivilege}
              />
            </View>
          )}
        />
      </View>
      <SubHeaderText text="Assign to" />
      <ChangeScreenTab
        icon={"human-male-female-child"}
        screenName={"Members"}
        onPress={() => {
          navigation.navigate("RoleMember", {
            form: form,
            userList: management_roles[index]?.user_ids ?? [],
            hasAssignPermission: hasAssignPermission,
          });
        }}
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

export default ConfigRole;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  permissionSetting: {
    paddingLeft: 10,
    paddingVertical: 10,
    gap: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
  permissionText: {
    color: Colors.gray[900],
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingTop: 20,
  },
});
