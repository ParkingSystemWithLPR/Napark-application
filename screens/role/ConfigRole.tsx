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
import { OtherStackParamList } from "@/types";

export type ConfigRoleProps = NativeStackScreenProps<
  OtherStackParamList,
  "ConfigRole"
>;

const ConfigRole: React.FC<ConfigRoleProps> = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const [isEnableEditRole, setEnableEditRole] = useState<boolean>(false);
  const [isEnableManageParkingSpace, setEnableManageParkingSpace] =
    useState<boolean>(false);
  const [isEnableAssignRole, setEnableAssignRole] = useState<boolean>(false);
  const [isEnableAssignPrivilege, setEnableAssignPrivilege] =
    useState<boolean>(false);
  const [isEnableEditPrivilege, setEnableEditPrivilege] =
    useState<boolean>(false);

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
      <Controller
        name={"name"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            title="Name"
            placeholder="Enter your role name"
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
            placeholder="Enter your role description"
            value={value}
            onChangeText={(value) => onChange(value)}
          />
        )}
      />
      <SubHeaderText text="Permisions" />
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
                onValueChange={(value) => {
                  onChange(value);
                  setEnableManageParkingSpace((previosState) => !previosState);
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
              <BodyText text="Edit role" textStyle={styles.permissionText} />
              <Switch
                onValueChange={(value) => {
                  onChange(value);
                  setEnableEditRole((previosState) => !previosState);
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
                text="Assign role member"
                textStyle={styles.permissionText}
              />
              <Switch
                onValueChange={(value) => {
                  onChange(value);
                  setEnableAssignRole((previosState) => !previosState);
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
                text="Edit privilege"
                textStyle={styles.permissionText}
              />
              <Switch
                onValueChange={(value) => {
                  onChange(value);
                  setEnableEditPrivilege((previosState) => !previosState);
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
                text="Assign privilege"
                textStyle={styles.permissionText}
              />
              <Switch
                onValueChange={(value) => {
                  onChange(value);
                  setEnableAssignPrivilege((previosState) => !previosState);
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
          navigation.navigate("RoleMember");
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
  sameLineInputContainer: {
    gap: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingTop: 20,
  },
});
