import * as Location from "expo-location";
import { useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { RegionType } from "../landing/Landing";

import LoadingOverlay from "@/components/ui/LoadingOverlay";

const Arriving: React.FC = () => {
  const [region, setRegion] = useState<RegionType>();

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
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.error("Error getting current location:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {region ? (
        <>
          <MapView
            style={styles.map}
            initialRegion={region}
            provider={PROVIDER_GOOGLE}
          ></MapView>
        </>
      ) : (
        <LoadingOverlay />
      )}
    </View>
  );
};
export default Arriving;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
