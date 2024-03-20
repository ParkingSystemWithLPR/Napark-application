import { Control, Controller, FieldValues } from "react-hook-form";
import { ScrollView } from "react-native";

import ImageUploader from "@/components/input/ImageUploader";
import BodyText from "@/components/text/BodyText";
import Colors from "@/constants/color";

export type ConfigPlanProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FieldValues, any>;
};

const ConfigPlan: React.FC<ConfigPlanProps> = ({ control }) => {
  return (
    <ScrollView>
      <Controller
        name={"planImages"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <ImageUploader
            title={"Plan upload"}
            image={value}
            onChange={onChange}
            containerStyle={{ height: 450 }}
          />
        )}
      />
      <BodyText
        text="Please upload your plan in .jpg format to create your parking slot to config in this application"
        textStyle={{ color: Colors.gray[800] }}
      />
    </ScrollView>
  );
};

export default ConfigPlan;
