import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import ConfigAddress from "@/components/parking-lot/ConfigAddress";
import ConfigInfo from "@/components/parking-lot/ConfigInfo";
import ConfigPlan from "@/components/parking-lot/ConfigPlan";
import ConfigPricing from "@/components/parking-lot/ConfigPricing";
import Stepper from "@/components/stepper/Stepper";
import SubHeaderText from "@/components/text/SubHeaderText";
import BodyContainer from "@/components/ui/BodyContainer";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import ModalOverlay from "@/components/ui/ModalOverlay";
import Colors from "@/constants/color";
import { useCreateParkingLotRequest } from "@/store/api/parking-lot/useCreateParkingLotRequest";
import { useAuth } from "@/store/context/auth";
import { OtherStackParamList, AuthenticatedStackParamList } from "@/types";
<<<<<<< HEAD
import { ParkingLotRequest } from "@/types/parking-lot";
=======
import ConfigAddress from "@/components/parking-lot/ConfigAddress";
<<<<<<< HEAD
>>>>>>> 1047393 ([NP-140] feat: add address input)
=======
import { CreateParkingLotRequestInput, useCreateParkingLotRequest } from "@/store/api/parking-lot/useCreateParkingLotRequest";
import { useAuth } from "@/store/context/auth";
import { ParkingLotRequest } from "@/types/parking-lot/ParkingLot";
>>>>>>> 3557a3b ([NO-140] fix: image type)

export type RequestParkingLotProps = CompositeScreenProps<
  NativeStackScreenProps<OtherStackParamList, "RequestParkingLot">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const RequestParkingLot: React.FC<RequestParkingLotProps> = ({
  navigation,
}) => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const { accessToken, authenticate } = useAuth();
  const form = useForm<ParkingLotRequest>();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;
=======
  const { control, handleSubmit, setValue, getValues, formState: { isSubmitting } } = useForm();
>>>>>>> fecd2d1 ([NP-140] feat: improve plan upload and pricing config)
=======
=======
  const { accessToken, authenticate } = useAuth();
>>>>>>> 3557a3b ([NO-140] fix: image type)
  const form = useForm();
  const { handleSubmit, formState: { isSubmitting } } = form;
>>>>>>> d9639db ([NP-140] feat: complete request form && change schema)
  const [step, setStep] = useState<number>(1);
  const [isOpenConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
<<<<<<< HEAD
  const [isSubmitSuccessful, setSubmitSuccessful] = useState<boolean>(false);
=======
>>>>>>> 3557a3b ([NO-140] fix: image type)
  const { mutateAsync: createRequestAsync } = useCreateParkingLotRequest();

  const onSubmit = async (data: ParkingLotRequest) => {
    try {
<<<<<<< HEAD
      await createRequestAsync({ data, auth: { accessToken, authenticate } });
      setTimeout(() => {
        setSubmitSuccessful(true);
      }, 2000);
      navigation.navigate("OtherStack", { screen: "ParkingLotsList" });
=======
      const parkingLotRequest = data as ParkingLotRequest;
      console.log("data", JSON.stringify(data));
      await createRequestAsync({data: parkingLotRequest, auth: {accessToken, authenticate}});
      navigation.navigate("OtherStack", {screen: "ParkingLotsList"})
>>>>>>> 3557a3b ([NO-140] fix: image type)
    } catch (error) {
      Alert.alert(
        "Create request error",
        "Please try again!!: " + (error as Error).message
      );
    }
  };

  const onGoNextStep = () => {
<<<<<<< HEAD
<<<<<<< HEAD
    setStep(step + 1);
  };

  const onOpenConfirmModal = () => {
    setOpenConfirmModal(true);
  };
=======
  
=======
>>>>>>> 3557a3b ([NO-140] fix: image type)
    setStep(step + 1)
  }
>>>>>>> d9639db ([NP-140] feat: complete request form && change schema)

  return (
    <BodyContainer innerContainerStyle={styles.container}>
<<<<<<< HEAD
<<<<<<< HEAD
      <Stepper nowStep={step} setStep={setStep} stepAmount={4} />
      {step == 1 && <ConfigInfo form={form} />}
      {step == 2 && <ConfigAddress form={form} />}
      {step == 3 && <ConfigPlan form={form} />}
      {step == 4 && <ConfigPricing form={form} />}
<<<<<<< HEAD
      {step != 4 ? (
        <PrimaryButton title="Next" onPress={handleSubmit(onGoNextStep)} />
=======
      <Stepper step={step} setStep={setStep} />
=======
      <Stepper nowStep={step} setStep={setStep} stepAmount={4} />
>>>>>>> 1047393 ([NP-140] feat: add address input)
      {step == 1 && <ConfigInfo control={control} />}
      {step == 2 && <ConfigAddress control={control} />}
      {step == 3 && <ConfigPlan plan={getValues().plan} control={control} setValue={setValue}/>}
      {step == 4 && <ConfigPricing control={control} />}
      {step != 4 ? (
        <PrimaryButton title="Next" onPress={() => setStep(step + 1)} />
>>>>>>> fecd2d1 ([NP-140] feat: improve plan upload and pricing config)
=======
      {step != 4 ? (
        <PrimaryButton title="Next" onPress={() => onGoNextStep()} />
>>>>>>> d9639db ([NP-140] feat: complete request form && change schema)
      ) : (
        <PrimaryButton
          title="Send request to admin"
          onPress={handleSubmit(onOpenConfirmModal)}
        />
      )}
      <ModalOverlay
        visible={isOpenConfirmModal}
        closeModal={() => setOpenConfirmModal(false)}
      >
        <View style={styles.centeredContent}>
          <View style={styles.confirmModalContainer}>
            <SubHeaderText text={"Confirm request information"} />
            {isSubmitting && <LoadingOverlay />}
            {isSubmitSuccessful && (
              <MaterialCommunityIcons
                name="check-circle"
                size={40}
                color={Colors.green[600]}
              />
            )}
            <View style={styles.buttonContainer}>
              <SecondaryButton
                title={"Cancle"}
                onPress={() => setOpenConfirmModal(false)}
              />
              <PrimaryButton
                title={"Confirm"}
                disabled={isSubmitting}
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </View>
        </View>
      </ModalOverlay>
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
  centeredContent: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
  },
  confirmModalContainer: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
    padding: 20,
    width: "90%",
    alignItems: "center",
    gap: 40,
    justifyContent: "center",
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
