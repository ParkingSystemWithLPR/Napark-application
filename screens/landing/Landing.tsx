import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootStackParamList } from "../../types";
import { useAuth } from "../../store/context/auth";

export type LandingProps = {} & NativeStackScreenProps<
  RootStackParamList,
  "Landing"
>;

export type RegionType = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const Landing: React.FC<LandingProps> = () => {
  const { logout } = useAuth();
  const [region, setRegion] = useState<RegionType>();

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      // Request permission to access the device's location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      // Fetch the current location
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      // Handle the error appropriately, such as displaying an error message to the user
      console.error("Error getting current location:");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {region ? (
        <>
          <MapView style={{ flex: 1 }} initialRegion={region} zoomEnabled>
            <Marker
              draggable
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              title="Your Location"
            />
          </MapView>
          <View style={{ position: "absolute", width: "100%" }}>
            <SafeAreaView>
              <TextInput
                style={{
                  borderRadius: 10,
                  margin: 10,
                  color: "#000",
                  borderColor: "#666",
                  backgroundColor: "#FFF",
                  borderWidth: 1,
                  height: 45,
                  paddingHorizontal: 10,
                  fontSize: 18,
                }}
                placeholder={"Search"}
                placeholderTextColor={"#666"}
              />
              <Button title="logout" onPress={logout} />
            </SafeAreaView>
          </View>
        </>
      ) : (
        <SafeAreaView>
          <Text>Loading...</Text>
        </SafeAreaView>
      )}
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
