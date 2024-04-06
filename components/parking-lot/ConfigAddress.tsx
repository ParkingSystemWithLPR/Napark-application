import { Control, Controller, FieldValues, UseFormReturn } from "react-hook-form";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import * as Location from "expo-location";

import BusinessDayInput from "../input/BusinessDayInput";
import ImageUploader from "../input/ImageUploader";
import TextInput from "../input/TextInput";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import Colors from "@/constants/color";
import { useLayoutEffect, useState } from "react";

export type ConfigAddressProps = {
  form: UseFormReturn<FieldValues, any, undefined>;
};

const ConfigAddress: React.FC<ConfigAddressProps> = ({ form }) => {
  const { control } = form;
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
              setRegion({
                latitude,
                longitude,
                latitudeDelta: 0.0522,
                longitudeDelta: 0.0121,
              });
            }}
            onMarkerDragEnd={(event) => {
              const { latitude, longitude } = event.nativeEvent.coordinate;
              onChange(event.nativeEvent.coordinate);
              setRegion({
                latitude,
                longitude,
                latitudeDelta: 0.0522,
                longitudeDelta: 0.0121,
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
              onDragEnd={(e) => {
                console.log("dragEnd", e.nativeEvent.coordinate);
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
        render={({ field: { onChange, value } }) => (
          <TextInput
            title="address"
            placeholder={"Enter your address"}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <View style={styles.sameLineInputContainer}>
        <Controller
          name={"address.sub_district"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              title="Sub-district"
              placeholder={"Enter your sub-district"}
              value={value}
              onChangeText={onChange}
              containerStyle={{ flex: 1 }}
            />
          )}
        />
        <Controller
          name={"address.district"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              title="District"
              placeholder={"Enter your district"}
              value={value}
              onChangeText={onChange}
              containerStyle={{ flex: 1 }}
            />
          )}
        />
      </View>
      <View style={styles.sameLineInputContainer}>
        <Controller
          name={"address.province"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              title="Province"
              placeholder={"Enter your province"}
              value={value}
              onChangeText={onChange}
              containerStyle={{ flex: 1 }}
            />
          )}
        />
        <Controller
          name={"address.zip_code"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              title="Zip-code"
              placeholder={"Enter your zip-code"}
              value={value}
              onChangeText={onChange}
              containerStyle={{ flex: 1 }}
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
