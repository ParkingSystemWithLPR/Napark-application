import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
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
import { useParkingLot } from "@/store/context/parkingLot";
import { OtherStackParamList, AuthenticatedStackParamList } from "@/types";

export type ConfigPrivilegeProps = CompositeScreenProps<
  NativeStackScreenProps<OtherStackParamList, "ConfigPrivilege">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const ConfigPrivilege: React.FC<ConfigPrivilegeProps> = ({
  navigation,
  route,
}) => {
  const { mode, index } = route.params;
  const { parkingLot, setParkingLot } = useParkingLot();
  const { mutateAsync: editParkingLotAsync } = useEditParkingLot();
  const { accessToken, authenticate } = useAuth();
  const parking_privileges = parkingLot.parking_privileges;
  const category = ManagingCategory.PRIVILEGE;
  const form = useForm();
  const { control, handleSubmit } = form;

  const onSubmit = async (data: FieldValues) => {
    try {
      const privilege = {
        title: data.name,
        user_ids: [],
        slot_prices: [],
      };
      if (mode === ActionMode.CREATE) {
        parking_privileges.push(privilege);
      } else {
        parking_privileges[index] = privilege;
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
        defaultValue={parking_privileges[index]?.title}
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
        {parking_privileges.map((_, index) => (
          <RoleCard
            category={category}
            roleName="A1"
            description="60 baht/hr"
            key={index}
            onPress={() =>
              navigation.navigate("ConfigZone", {
                form: form,
                mode: ActionMode.EDIT,
                index: index,
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
            index: parking_privileges.length,
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
