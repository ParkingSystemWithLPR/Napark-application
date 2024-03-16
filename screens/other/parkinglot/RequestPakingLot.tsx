import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Alert, StyleSheet } from "react-native";

import PrimaryButton from "@/components/button/PrimaryButton";
import ConfigInfo from "@/components/parking-lot/ConfigInfo";
import ConfigPlan from "@/components/parking-lot/ConfigPlan";
import ConfigPricing from "@/components/parking-lot/ConfigPricing";
import Stepper from "@/components/stepper/Stepper";
import BodyContainer from "@/components/ui/BodyContainer";
import { OtherStackParamList, AuthenticatedStackParamList } from "@/types";

export type RequestParkingLotProps = CompositeScreenProps<
  NativeStackScreenProps<OtherStackParamList, "RequestParkingLot">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const RequestParkingLot: React.FC<RequestParkingLotProps> = ({
  navigation,
}) => {
  const { control, handleSubmit } = useForm();
  const [step, setStep] = useState<number>(1);

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
      <Stepper step={step} setStep={setStep} />
      {step == 1 && <ConfigInfo control={control} />}
      {step == 2 && <ConfigPlan control={control} />}
      {step == 3 && <ConfigPricing control={control} />}
      {step != 3 ? (
        <PrimaryButton title="Next" onPress={() => setStep(step + 1)} />
      ) : (
        <PrimaryButton
          title="Send request to admin"
          onPress={handleSubmit(onSubmit)}
        />
      )}
    </BodyContainer>
  );
};

export default RequestParkingLot;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    gap: 10,
    paddingBottom: 70,
  },
  formContainer: {},
  sameLineInputContainer: {
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
