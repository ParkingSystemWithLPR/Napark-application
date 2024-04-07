import { Control, Controller, FieldValues, UseFormReturn } from "react-hook-form";
import { ScrollView } from "react-native";

import BusinessDayInput from "../input/BusinessDayInput";
import ImageUploader from "../input/ImageUploader";
import TextInput from "../input/TextInput";

export type ConfigInfoProps = {
  form: UseFormReturn<FieldValues, any, undefined>;
};

const ConfigInfo: React.FC<ConfigInfoProps> = ({ form }) => {
  const { control } = form;
  return (
    <ScrollView>
      <Controller
        name={"name"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            title="Parking space name"
            placeholder="Enter your parking space name"
            value={value}
            onChangeText={(value) => onChange(value)}
            isRequired
          />
        )}
      />
      <Controller
        name={"images"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <ImageUploader
            title="Parking space photo"
            image={value}
            onChange={onChange}
          />
        )}
      />
      <Controller
        name={"business_days"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <BusinessDayInput
            title={"Business Day"}
            onChange={onChange}
            businessDays={value}
          />
        )}
      />
    </ScrollView>
  );
};

export default ConfigInfo;