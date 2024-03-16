import { Control, Controller, FieldValues } from "react-hook-form";
import { ScrollView } from "react-native";

import DateInput from "../input/DateInput";
import ImageUploader from "../input/ImageUploader";
import TextInput from "../input/TextInput";

export type ConfigInfoProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FieldValues, any>;
};

const ConfigInfo: React.FC<ConfigInfoProps> = ({ control }) => {
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
        name={"businessDays"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <DateInput
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