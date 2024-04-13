import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Controller, FieldValues, UseFormReturn } from "react-hook-form";
import { ScrollView, View, StyleSheet, Pressable, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import ParkingZoneInput from "../input/ParkingZoneInput";
import MyTextInput from "../input/TextInput";
import SubHeaderText from "../text/SubHeaderText";

import BodyText from "@/components/text/BodyText";
import Colors from "@/constants/color";
import { InputType } from "@/enum/InputType";
import { ImageProps } from "@/types";
import { ParkingLotRequest, Plan } from "@/types/parking-lot";

export type ConfigPlanProps = {
  form: UseFormReturn<ParkingLotRequest, any, undefined>;
};

const IMAGE_SIZE = { width: 350, height: 200 };

const ConfigPlan: React.FC<ConfigPlanProps> = ({ form }) => {
  const {
    control,
    setValue,
    getValues,
    register,
    formState: { errors },
  } = form;

  const [images, setImages] = useState<ImageProps[]>(
    getValues().plan ? getValues().plan.map((item) => item.image) : []
  );

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      aspect: [4, 3],
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const newImages: ImageProps[] = [];
      result.assets.forEach((img, index) => {
        if (img.base64 && img.fileName) {
          newImages.push({
            content: img.base64,
            filename: img.fileName,
          });
          setValue(`plan.${images.length + index}.image`, {
            content: img.base64,
            filename: img.fileName,
          });
        }
      });
      setImages(images.concat(newImages));
    }
  };

  const renderPlanSetting = (index: number) => {
    return (
      <View key={`plan_${index}`}>
        <Controller
          name={`plan.${index}.image`}
          control={control}
          render={({ field: { value } }) => (
            <Image
              source={{
                uri: "data:image/jpeg;base64," + value.content,
              }}
              height={IMAGE_SIZE.height}
              width={IMAGE_SIZE.width}
              style={styles.image}
            />
          )}
        />
        <Controller
          name={`plan.${index}.floor`}
          control={control}
          rules={{ required: "Please enter floor number for this plan" }}
          render={({ field: { onChange, value } }) => (
            <MyTextInput
              title="Floor"
              placeholder={"Floor"}
              value={value ? value.toString() : ""}
              onChangeText={(value) => onChange(parseInt(value))}
              containerStyle={{ flex: 1 }}
              inputMode={InputType.Numeric}
              errorText={
                errors.plan && errors.plan[index]
                  ? (errors.plan[index]?.floor?.message as string)
                  : ""
              }
              isRequired
              editable
            />
          )}
        />
        <Controller
          name={`plan.${index}.zones`}
          control={control}
          render={({ field: { onChange, value } }) => (
            <ParkingZoneInput
              value={value}
              onChange={onChange}
              floor={index}
              register={register}
              errors={errors}
            />
          )}
        />
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <SubHeaderText text={"Plan upload"} />
          <BodyText text="*" textStyle={styles.requiredIndicator} />
        </View>
        <Controller
          name={"plan"}
          control={control}
          rules={{ required: "Please upload at least 1 plan image" }}
          render={() => (
            <>
              <Pressable
                android_ripple={{ color: Colors.gray[600] }}
                style={({ pressed }) => [pressed ? styles.cardPressed : null]}
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
              {errors.plan && (
                <BodyText
                  text={errors.plan.message as string}
                  textStyle={styles.errorText}
                />
              )}
            </>
          )}
        />
      </View>
      {images.map((_, index) => renderPlanSetting(index))}
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  requiredIndicator: {
    color: Colors.red[400],
  },
  errorText: {
    color: Colors.red[400],
    fontSize: 12,
  },
});
