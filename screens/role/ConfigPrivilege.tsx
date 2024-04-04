import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";
import { OtherStackParamList, AuthenticatedStackParamList } from "@/types";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import TextInput from "@/components/input/TextInput";
import SubHeaderText from "@/components/text/SubHeaderText";

export type ConfigPrivilegeProps = CompositeScreenProps<
  NativeStackScreenProps<OtherStackParamList, "ConfigPrivilege">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const ConfigPrivilege: React.FC<ConfigPrivilegeProps> = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const [isEnableEditPrivilege, setEnableEditPrivilege] =
    useState<boolean>(false);

  return (
    <BodyContainer innerContainerStyle={styles.container}>
      <Controller
        name={"name"}
        control={control}
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
    </BodyContainer>
  );
};

export default ConfigPrivilege;

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
