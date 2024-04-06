import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Controller, FieldValues, UseFormReturn } from "react-hook-form";
import { ScrollView, View, StyleSheet, Pressable, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import MyTextInput from "../input/TextInput";
import SubHeaderText from "../text/SubHeaderText";

import BodyText from "@/components/text/BodyText";
import Colors from "@/constants/color";
import { InputType } from "@/enum/InputType";
import SecondaryButton from "../button/SecondaryButton";
import { Plan } from "@/types/parking-lot/ParkingLot";
import ParkingZoneInput from "../input/ParkingZoneInput";

export type ConfigPlanProps = {
  form: UseFormReturn<FieldValues, any, undefined>;
};

const IMAGE_SIZE = { width: 350, height: 200 };

const ConfigPlan: React.FC<ConfigPlanProps> = ({ form }) => {
  const { control, setValue, getValues } = form;
  const [plan, setPlan] = useState<Plan[]>();
  
  useEffect(() => {
    setPlan(getValues().plan);
  }, [form]);

  const [images, setImages] = useState<string[]>(
    plan ? plan.map((item) => item.image) : []
  );


  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const newImages: string[] = [];
      result.assets.forEach((img, index) => {
        if (img.base64) {
          newImages.push(img.base64);
          setValue(`plan.${images.length + index}.image`, img.base64.slice(0,10));
        }
      });
      setImages(images.concat(newImages));
    }
  };

  const renderPlanSetting = (image: string, index: number) => {
    return (
      <View>
        <Image
          source={{
            uri: "data:image/jpeg;base64," + image,
          }}
          height={IMAGE_SIZE.height}
          width={IMAGE_SIZE.width}
          style={styles.image}
        />
        <Controller
          name={`plan.${index}.floor`}
          control={control}
          render={({ field: { onChange, value } }) => (
            <MyTextInput
              title="Floor"
              placeholder={"Floor"}
              value={value}
              onChangeText={onChange}
              containerStyle={{ flex: 1 }}
              inputMode={InputType.Numeric}
              editable
            />
          )}
        />
        <Controller
          name={`plan.${index}.zone`}
          control={control}
          render={({ field: { onChange, value } }) => (
            <ParkingZoneInput
              value={value}
              onChange={onChange}
            />
          )}
        />
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <SubHeaderText text={"Plan upload"} />
        <Pressable
          android_ripple={{ color: Colors.gray[600] }}
          style={({ pressed }) => [
            styles.card,
            pressed ? styles.cardPressed : null,
          ]}
          onPress={pickImage}
        >
          <View style={styles.uploadContainer}>
            <MaterialCommunityIcons
              name={"cloud-upload-outline"}
              size={120}
              color={Colors.red[400]}
            />
            <SubHeaderText text="Press here to upload image" />
            <BodyText text="Supported format: .jpg, .png" />
          </View>
        </Pressable>
        <BodyText
          text="Please upload your plan in .jpg format to create your parking slot to config in this application"
          textStyle={{ color: Colors.gray[800] }}
        />
      </View>
      {images.map((image, index) => renderPlanSetting(image, index))}
    </ScrollView>
  );
};

export default ConfigPlan;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    gap: 10,
  },
  uploadContainer: {
    borderWidth: 2,
    borderColor: Colors.red[400],
    borderStyle: "dashed",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  card: {},
  cardPressed: {
    opacity: 0.5,
  },
  image: {
    borderRadius: 12,
    marginRight: 10,
  },
  sameLineInputContainer: {
    paddingTop: 10,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  adjustFormListButton: {
    alignItems: "center",
    flex: 1,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
});
