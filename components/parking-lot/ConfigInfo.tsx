import { Controller, FieldValues, UseFormReturn } from "react-hook-form";
import { ScrollView } from "react-native";

import BusinessDayInput from "../input/BusinessDayInput";
import ImageUploader from "../input/ImageUploader";
import TextInput from "../input/TextInput";

import { ParkingLotRequest } from "@/types/parking-lot";

export type ConfigInfoProps = {
  form: UseFormReturn<ParkingLotRequest, any, undefined>;
};

const ConfigInfo: React.FC<ConfigInfoProps> = ({ form }) => {
  const {
    control,
    formState: { errors },
  } = form;

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
    </ScrollView>
  );
};

export default ConfigInfo;
