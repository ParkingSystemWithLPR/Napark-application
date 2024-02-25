import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomBottomSheetModal from "../../components/bottomSheet/CustomBottomSheetModal";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import Colors from "../../constants/color";
import { RootParamList } from "../../types";

export type LandingProps = NativeStackScreenProps<RootParamList, "Landing">;

export type RegionType = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const Landing: React.FC<LandingProps> = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [region, setRegion] = useState<RegionType>();

  useLayoutEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      // Request permission to access the device's location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      // Fetch the current location
      const location = await Location.getCurrentPositionAsync({});
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

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <View style={styles.container}>
      {region ? (
        <>
          <MapView style={styles.map} initialRegion={region} zoomEnabled>
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
                style={styles.searchContainer}
                placeholder={"Search"}
                placeholderTextColor={"#666"}
                onSubmitEditing={handlePresentModalPress}
              />
              <CustomBottomSheetModal
                ref={bottomSheetRef}
                title="Recommended place"
              />
            </SafeAreaView>
          </View>
        </>
      ) : (
        <SafeAreaView>
          <LoadingOverlay message="Loading" />
        </SafeAreaView>
      )}
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    borderRadius: 10,
    margin: 10,
    color: "#000",
    borderColor: "#666",
    backgroundColor: Colors.white,
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 10,
    fontSize: 18,
  },
});
