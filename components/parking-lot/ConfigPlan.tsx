import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { ScrollView, View, StyleSheet, Pressable, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import ParkingZoneInput from "../input/ParkingZoneInput";
import MyTextInput from "../input/TextInput";
import SubHeaderText from "../text/SubHeaderText";
import IconButton from "../button/IconButton";

import BodyText from "@/components/text/BodyText";
import Colors from "@/constants/color";
import { InputType } from "@/enum/InputType";
import { ParkingLotRequest, Plan } from "@/types/parking-lot";
import { ZoneType } from "@/enum/ParkingLot";

export type ConfigPlanProps = {
  form: UseFormReturn<ParkingLotRequest, any, undefined>;
};

const IMAGE_SIZE = { width: 350, height: 200 };

const ConfigPlan: React.FC<ConfigPlanProps> = ({ form }) => {
  const {
    setValue,
    getValues,
    control,
    clearErrors,
    formState: { errors },
  } = form;

  const [plans, setPlans] = useState<Plan[]>();

  useEffect(() => {
    setPlans(getValues("plan"));
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      aspect: [4, 3],
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const newPlans: Plan[] = plans ? [...plans] : [];

      result.assets.forEach((img, index) => {
        const planIndex = plans ? plans.length + index : index;
        if (img.base64 && img.fileName) {
          newPlans.push({
            floor: planIndex + 1,
            zones: [{ name: "", type: ZoneType.NORMAL }],
            image: {
              content: img.base64,
              filename: img.fileName,
            },
          });
        }
        clearErrors("plan");
      });
      setPlans(newPlans);
    }
  };

  useEffect(() => {
    if (plans) {
      setValue("plan", plans);
    }
  }, [plans]);

  const onInputChange = (key: string, value: any, index: number) => {
    if (plans) {
      const editPlan: Plan = {
        ...plans[index],
        [key]: value,
      };
      const newPlans: Plan[] = [
        ...plans.slice(0, index),
        editPlan,
        ...plans.slice(index + 1),
      ];
      setPlans(newPlans);
    }
  };

  const onDelete = (index: number) => {
    if (plans) {
      setPlans([...plans.slice(0, index), ...plans.slice(index + 1)]);
    }
  };

  const isDuplicateFloor = (floor: number, idx: number): boolean => {
    return (
      !!plans &&
      plans.filter((plan, index) => plan.floor === floor && index !== idx)
        .length !== 0
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
      {plans &&
        plans.map((plan, index) => (
          <View style={styles.planContainer} key={`plan_${index}`}>
            <IconButton
              icon={"close"}
              size={0}
              color={""}
              buttonStyle={styles.closeButton}
              onPress={() => onDelete(index)}
            />
            <View style={{ zIndex: -1 }}>
              <Image
                source={{
                  uri: "data:image/jpeg;base64," + plan.image.content,
                }}
                height={IMAGE_SIZE.height}
                width={IMAGE_SIZE.width}
                style={styles.image}
              />
              <Controller
                name={`plan.${index}.floor`}
                control={control}
                rules={{
                  required: "Please enter floor number for this plan",
                  validate: (value) =>
                    !isDuplicateFloor(value, index) ||
                    "Please enter different floor number",
                }}
                render={() => (
                  <MyTextInput
                    title="Floor"
                    placeholder={"Floor"}
                    value={plan.floor ? plan.floor.toString() : ""}
                    onChangeText={(value) =>
                      onInputChange("floor", parseInt(value), index)
                    }
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
              <ParkingZoneInput
                value={plan.zones}
                onChange={(value) => onInputChange("zones", value, index)}
                floor={index}
                control={control}
                errors={errors}
              />
            </View>
          </View>
        ))}
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
  planContainer: {
    marginBottom: 10,
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
  closeButton: {
    position: "absolute",
    zIndex: -1,
    backgroundColor: Colors.gray[400],
    opacity: 0.8,
    top: 0,
    right: 5,
  },
});
