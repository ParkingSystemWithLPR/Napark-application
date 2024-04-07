import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import DropdownInput from "@/components/input/DropdownInput";
import ConfigPricing from "@/components/parking-lot/ConfigPricing";
import BodyContainer from "@/components/ui/BodyContainer";
import { MOCKED_ZONE_DROPDOWN } from "@/mock/mockData";
import { AuthenticatedStackParamList, OtherStackParamList } from "@/types";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Controller, FieldValues } from "react-hook-form";
import { Alert, StyleSheet, View } from "react-native";

export type ConfigZoneProps = CompositeScreenProps<
  NativeStackScreenProps<OtherStackParamList, "ConfigZone">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const ConfigZone: React.FC<ConfigZoneProps> = ({ navigation, route }) => {
  const form = route.params.form;
  const { control, handleSubmit } = form;

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
      <View style={styles.dropdownContainer}>
        <Controller
          name="floor"
          control={control}
          render={({ field: { onChange, value } }) => (
            <DropdownInput
              title="Floor"
              selectedValue={value}
              placeholder="Select floor"
              onSelect={onChange}
              items={[{ label: "1", value: "1" }]}
              containerStyle={{ flex: 1 }}
            />
          )}
        />
        <Controller
          name="slot"
          control={control}
          render={({ field: { onChange, value } }) => (
            <DropdownInput
              title="Zone"
              selectedValue={value}
              placeholder="Select zone"
              onSelect={onChange}
              items={MOCKED_ZONE_DROPDOWN.map((z) => {
                return { label: z, value: z };
              })}
              containerStyle={{ flex: 1 }}
            />
          )}
        />
      </View>
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

export default ConfigZone;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    justifyContent: "space-between",
  },
  dropdownContainer: {
    gap: 10,
    flexDirection: "row",
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
