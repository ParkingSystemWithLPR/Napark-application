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
  const [isEnableEditPermission, setEnableEditPermission] =
    useState<boolean>(false);
  const [isEnableManageParkingSpace, setEnableManageParkingSpace] =
    useState<boolean>(false);
  const [isEnableAssignRole, setEnableAssignRole] = useState<boolean>(false);

  const onSubmit = async (data: FieldValues) => {
    try {
      // await mutateAsync(data);
      console.log('data', data);
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
            title="name"
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
            title="description"
            placeholder="Enter your role description"
            value={value}
            onChangeText={(value) => onChange(value)}
          />
        )}
      />
      <SubHeaderText text="Permisions" />
      <View style={styles.permissionSetting}>
        <Controller
          name={"editPermision"}
          control={control}
          render={({ field: { onChange } }) => (
            <View style={styles.switchContainer}>
              <BodyText
                text="Edit permssion"
                textStyle={styles.permissionText}
              />
              <Switch
                onValueChange={(value) => {
                  onChange(value);
                  setEnableEditPermission((previosState) => !previosState);
                }}
                value={isEnableEditPermission}
              />
            </View>
          )}
        />
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
      </View>
      <View style={styles.sameLineInputContainer}>
        <Controller
          name={"reservationPeriod"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              title="Reservation Period"
              placeholder="reservation period"
              value={value}
              onChangeText={(value) => onChange(value)}
              containerStyle={{ flex: 1 }}
            />
          )}
        />
        <Controller
          name={"maximumDuration"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              title="Maximum duration"
              placeholder="maximum duration"
              value={value}
              onChangeText={(value) => onChange(value)}
              containerStyle={{ flex: 1 }}
            />
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
