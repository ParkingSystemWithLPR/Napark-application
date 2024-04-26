import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import BusinessDayInput from "@/components/input/BusinessDayInput";
import ImageUploader from "@/components/input/ImageUploader";
import MyTextInput from "@/components/input/TextInput";
import SubHeaderText from "@/components/text/SubHeaderText";
import BodyContainer from "@/components/ui/BodyContainer";
import ModalOverlay from "@/components/ui/ModalOverlay";
import Colors from "@/constants/color";
import { useUpdateParkingLot } from "@/store/api/parking-lot/useUpdateParkingLot";
import { useAuth } from "@/store/context/auth";
import { useParkingLot } from "@/store/context/parkingLot";
import { OtherStackParamList, AuthenticatedStackParamList } from "@/types";
import { ParkingLot } from "@/types/parking-lot";
import { convertImagesToImageProps } from "@/utils/image";
import BodyText from "@/components/text/BodyText";
import { InputType } from "@/enum/InputType";
import DropdownInput from "@/components/input/DropdownInput";
import { formatEnumtoDropdownItem } from "@/utils/dropdown";
import { PriceRateUnit } from "@/enum/ParkingLot";

export type EditParkingInfoProps = CompositeScreenProps<
  NativeStackScreenProps<OtherStackParamList, "EditParkingInfo">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const EditParkingInfo: React.FC<EditParkingInfoProps> = ({ navigation }) => {
  const { parkingLot, setParkingLot } = useParkingLot();
  const { accessToken, authenticate } = useAuth();
  const form = useForm<ParkingLot>({ defaultValues: parkingLot });
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isSubmitting, errors },
  } = form;
  const { mutateAsync: updateParkingLot } = useUpdateParkingLot();
  const [isOpenConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [minimumBookingDuration, setMinimumBookingDuration] = useState<{
    hour: string;
    minute: string;
  }>({
    hour: parkingLot.minimum_booking_duration.split("h")[0],
    minute: parkingLot.minimum_booking_duration.split("h")[1].slice(0, -1),
  });

  const onSubmit = async (data: ParkingLot) => {
    try {
      await updateParkingLot(
        {
          parkingLotId: parkingLot._id,
          data,
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

  const onOpenConfirmModal = () => {
    setOpenConfirmModal(true);
  };

  return (
    <BodyContainer innerContainerStyle={styles.container}>
      <ScrollView>
        <Controller
          name={"name"}
          control={control}
          rules={{ required: "Please enter your parking space name" }}
          render={({ field: { onChange, value } }) => (
            <MyTextInput
              title="Parking space name"
              placeholder="Enter your parking space name"
              value={value ?? ""}
              onChangeText={(value) => onChange(value)}
              errorText={errors.name?.message as string}
              isRequired
            />
          )}
        />
        <Controller
          name={"business_days"}
          control={control}
          rules={{ required: "Please select at least 1 business day" }}
          render={({ field: { onChange, value } }) => (
            <BusinessDayInput
              title={"Business Day"}
              onChange={onChange}
              businessDays={value ?? []}
              errorText={errors.business_days?.message as string}
              isRequired
            />
          )}
        />
        <Controller
          name={"minimum_booking_duration"}
          control={control}
          rules={{ required: "Please enter minimum booking duration" }}
          render={({ field: { onChange } }) => (
            <>
              <View style={styles.titleContainer}>
                <SubHeaderText text="Minimum booking duration" />
                <BodyText text="*" textStyle={styles.requiredIndicator} />
              </View>
              <View style={styles.sameLineInputContainer}>
                <MyTextInput
                  placeholder="Hour"
                  value={minimumBookingDuration.hour}
                  onChangeText={(value) => {
                    setMinimumBookingDuration({
                      ...minimumBookingDuration,
                      hour: value,
                    });
                    onChange(value + "h" + minimumBookingDuration.minute + "m");
                  }}
                  containerStyle={{ flex: 1 }}
                  inputMode={InputType.Numeric}
                />
                <BodyText text="Hour" textStyle={styles.text} />
                <MyTextInput
                  placeholder="Minute"
                  value={minimumBookingDuration.minute}
                  containerStyle={{ flex: 1 }}
                  onChangeText={(value) => {
                    setMinimumBookingDuration({
                      ...minimumBookingDuration,
                      minute: value,
                    });
                    onChange(minimumBookingDuration.hour + "h" + value + "m");
                  }}
                  inputMode={InputType.Numeric}
                />
                <BodyText text="Minute" textStyle={styles.text} />
              </View>
              {errors.minimum_booking_duration && (
                <BodyText
                  text={errors.minimum_booking_duration.message as string}
                  textStyle={styles.errorText}
                />
              )}
            </>
          )}
        />
        <View style={styles.sameLineInputContainer}>
          <Controller
            name={"penalty.price"}
            control={control}
            rules={{
              required: "Please enter penalty price",
            }}
            render={({ field: { onChange, value } }) => (
              <MyTextInput
                title="Penalty fee"
                placeholder="Enter penalty fee"
                value={value ? value.toString() : ""}
                onChangeText={(value) => onChange(parseInt(value))}
                errorText={errors.penalty && errors.penalty.price?.message}
                containerStyle={{ flex: 1 }}
                isRequired
              />
            )}
          />
          <Controller
            name={"penalty.price_unit"}
            control={control}
            rules={{
              required: "Please select price unit",
            }}
            render={({ field: { onChange, value } }) => (
              <DropdownInput
                selectedValue={value ?? ""}
                title="Unit"
                placeholder={"Select rate unit"}
                onSelect={(value) => onChange(value)}
                items={formatEnumtoDropdownItem(PriceRateUnit)}
                containerStyle={{ flex: 1, marginBottom: 10 }}
                errorText={errors.penalty && errors.penalty.price_unit?.message}
                isRequired
              />
            )}
          />
        </View>
        <Controller
          name={"images"}
          control={control}
          rules={{ required: "Please upload images of your parking space" }}
          render={({ field: { onChange, value } }) => (
            <ImageUploader
              title="Parking space photo"
              image={value ? convertImagesToImageProps(value) : []}
              onChange={onChange}
              errorText={errors.images?.message as string}
              isRequired
            />
          )}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <SecondaryButton title="Cancel" onPress={() => navigation.goBack()} />
        <PrimaryButton
          title={"Save"}
          onPress={handleSubmit(onOpenConfirmModal)}
        />
      </View>
      <ModalOverlay
        visible={isOpenConfirmModal}
        closeModal={() => setOpenConfirmModal(false)}
      >
        <View style={styles.centeredContent}>
          <View style={styles.confirmModalContainer}>
            <SubHeaderText text={"Confirm request information"} />
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

export default EditParkingInfo;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    gap: 10,
    paddingBottom: 40,
  },
  sameLineInputContainer: {
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  text: {
    marginBottom: 10,
  },
  errorText: {
    color: Colors.red[400],
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  requiredIndicator: {
    color: Colors.red[400],
  },
});
