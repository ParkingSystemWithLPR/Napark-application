import { useLayoutEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import * as Location from "expo-location";

import Colors from "@/constants/color";
import { ParkingLotRequest } from "@/types/parking-lot";
import { InputType } from "@/enum/InputType";
import { RegionType } from "@/screens/landing/Landing";

import TextInput from "../input/TextInput";

export type ConfigAddressProps = {
  form: UseFormReturn<ParkingLotRequest, any, undefined>;
};

const ConfigAddress: React.FC<ConfigAddressProps> = ({ form }) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = form;
  const [region, setRegion] = useState<Region>();

  useLayoutEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setValue("coord", { latitude, longitude });
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0121,
      });
    } catch (error) {
      console.error("Error getting current location:", error);
    }
  };

  return (
    <ScrollView style={styles.bodyContainer}>
      <Controller
        name={"coord"}
        control={control}
        render={({ field: { onChange } }) => (
          <MapView
            style={styles.map}
            onPress={(event) => {
              const { latitude, longitude } = event.nativeEvent.coordinate;
              onChange(event.nativeEvent.coordinate);
              setRegion((prevRegion: RegionType | undefined) => {
                if (!prevRegion) {
                  return {
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0522,
                    longitudeDelta: 0.0121,
                  };
                }
                return {
                  ...prevRegion,
                  latitude: latitude,
                  longitude: longitude,
                };
              });
            }}
            onMarkerDragEnd={(event) => {
              const { latitude, longitude } = event.nativeEvent.coordinate;
              onChange(event.nativeEvent.coordinate);
              setRegion((prevRegion: RegionType | undefined) => {
                if (!prevRegion) {
                  return {
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0522,
                    longitudeDelta: 0.0121,
                  };
                }
                return {
                  ...prevRegion,
                  latitude: latitude,
                  longitude: longitude,
                };
              });
            }}
            initialRegion={region}
            region={region}
            showsUserLocation={true}
            followsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            zoomEnabled
          >
            <Marker.Animated
              coordinate={{
                latitude: region?.latitude || 0,
                longitude: region?.longitude || 0,
              }}
              draggable
            >
              <Image
                source={require("../../assets/images/parking-space-pin.png")}
              />
            </Marker.Animated>
          </MapView>
        )}
      />
      <Controller
        name={"address.address1"}
        control={control}
        rules={{ required: "Please enter your parking space address" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            title="address"
            placeholder={"Enter your address"}
            value={value}
            onChangeText={onChange}
            errorText={
              errors.address && errors.address.address1
                ? errors.address.address1.message
                : ""
            }
            isRequired
          />
        )}
      />
      <View style={styles.sameLineInputContainer}>
        <Controller
          name={"address.sub_district"}
          control={control}
          rules={{ required: "Please enter sub-district" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              title="Sub-district"
              placeholder={"Enter your sub-district"}
              value={value}
              onChangeText={onChange}
              containerStyle={{ flex: 1 }}
              errorText={
                errors.address && errors.address.sub_district
                  ? errors.address.sub_district.message
                  : ""
              }
              isRequired
            />
          )}
        />
        <Controller
          name={"address.district"}
          control={control}
          rules={{ required: "Please enter district" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              title="District"
              placeholder={"Enter your district"}
              value={value}
              onChangeText={onChange}
              containerStyle={{ flex: 1 }}
              errorText={
                errors.address && errors.address.district
                  ? errors.address.district.message
                  : ""
              }
              isRequired
            />
          )}
        />
      </View>
      <View style={styles.sameLineInputContainer}>
        <Controller
          name={"address.province"}
          control={control}
          rules={{ required: "Please enter province" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              title="Province"
              placeholder={"Enter your province"}
              value={value}
              onChangeText={onChange}
              containerStyle={{ flex: 1 }}
              errorText={
                errors.address && errors.address.province
                  ? errors.address.province.message
                  : ""
              }
              isRequired
            />
          )}
        />
        <Controller
          name={"address.zip_code"}
          control={control}
          rules={{ required: "Please enter zip-code" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              title="Zip-code"
              placeholder={"Enter your zip-code"}
              value={value}
              onChangeText={onChange}
              containerStyle={{ flex: 1 }}
              inputMode={InputType.Numeric}
              errorText={
                errors.address && errors.address.zip_code
                  ? errors.address.zip_code.message
                  : ""
              }
              isRequired
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

export default ConfigAddress;

const styles = StyleSheet.create({
  bodyContainer: {
    gap: 10,
    marginBottom: 15,
  },
  textWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: Colors.gray[900],
  },
  map: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
    height: 400,
  },
  sameLineInputContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
});
