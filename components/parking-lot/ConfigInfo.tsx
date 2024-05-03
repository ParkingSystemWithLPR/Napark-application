import { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { ScrollView, View, StyleSheet } from "react-native";

import BusinessDayInput from "../input/BusinessDayInput";
import ImageUploader from "../input/ImageUploader";
import TextInput from "../input/TextInput";
import SubHeaderText from "../text/SubHeaderText";
import DropdownInput from "../input/DropdownInput";

import { ParkingLotRequest } from "@/types/parking-lot";
import { formatEnumtoDropdownItem } from "@/utils/dropdown";
import { PriceRateUnit } from "@/enum/ParkingLot";
import BodyText from "../text/BodyText";
import { InputType } from "@/enum/InputType";
import Colors from "@/constants/color";

export type ConfigInfoProps = {
  form: UseFormReturn<ParkingLotRequest, any, undefined>;
};

const ConfigInfo: React.FC<ConfigInfoProps> = ({ form }) => {
  const {
    control,
    setValue,
    setError,
    formState: { errors },
  } = form;

  const [minimumBookingDuration, setMinimumBookingDuration] = useState<{
    hour: string;
    minute: string;
  }>({ hour: "0", minute: "15" });

  useEffect(() => {
    setValue("minimum_booking_duration", "0h15m");
  }, []);

  useEffect(() => {
    if (!minimumBookingDuration.hour || !minimumBookingDuration.minute) {
      setError("minimum_booking_duration", {
        type: "required",
        message: "Please enter valid minimum booking duration",
      });
    }
  }, [minimumBookingDuration]);

  return (
    <ScrollView>
      <Controller
        name={"name"}
        control={control}
        rules={{ required: "Please enter your parking space name" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            title="Parking space name"
            placeholder="Enter your parking space name"
            value={value}
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
            businessDays={value}
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
              <TextInput
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
              <TextInput
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
            <TextInput
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
            image={value ?? []}
            onChange={onChange}
            errorText={errors.images?.message as string}
            isRequired
          />
        )}
      />
    </ScrollView>
  );
};

export default ConfigInfo;

const styles = StyleSheet.create({
  sameLineInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
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
