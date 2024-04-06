import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";
import { OtherStackParamList, AuthenticatedStackParamList } from "@/types";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Alert, StyleSheet, View } from "react-native";
import TextInput from "@/components/input/TextInput";
import SubHeaderText from "@/components/text/SubHeaderText";
import ConfigPricing from "@/components/parking-lot/ConfigPricing";
import PrimaryButton from "@/components/button/PrimaryButton";
import ChangeScreenTab from "@/components/button/ChangeScreenTab";
import RoleCard from "@/components/card/RoleCard";
import { ManagingCategory } from "@/enum/ManagingCategory";
import SecondaryButton from "@/components/button/SecondaryButton";

export type ConfigPrivilegeProps = CompositeScreenProps<
  NativeStackScreenProps<OtherStackParamList, "ConfigPrivilege">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const ConfigPrivilege: React.FC<ConfigPrivilegeProps> = ({ navigation }) => {
  const category = ManagingCategory.PRIVILEGE;
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
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
        <RoleCard
          category={category}
          roleName="A1"
          description="60 baht/hr"
          onPress={() => {}}
        />
        <RoleCard
          category={category}
          roleName="B4"
          description="step pricing"
          onPress={() => {}}
        />
      </View>
      <PrimaryButton title="+ Add new zone" onPress={() => {}} />
      <SubHeaderText text="Assign to" />
      <ChangeScreenTab
        icon={"account-supervisor"}
        screenName={"Privilege"}
        onPress={() => {}}
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
