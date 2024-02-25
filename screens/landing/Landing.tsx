import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import CustomBottomSheetModal from "../../components/bottomSheet/CustomBottomSheetModal";
import TextInput from "../../components/input/TextInput";
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
  const { dismiss } = useBottomSheetModal();
  const [searchText, setSearchText] = useState<string>("");
  const [region, setRegion] = useState<RegionType>();
  const [isSearch, setSearch] = useState<boolean>(false);

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

  const handlePresentModalPress = useCallback(() => {
    if (searchText.length > 0) {
      bottomSheetRef.current?.present();
    }
  }, [searchText]);

  const handleTextInputChange = (text: string) => {
    setSearch(text.length > 0);
    setSearchText(text);
    dismiss();
  };

  const searchIcon = useCallback(
    () => (
      <TouchableOpacity onPress={() => handleTextInputChange("")}>
        <MaterialIcons
          name={isSearch ? "clear" : "search"}
          size={20}
          color={Colors.gray[800]}
          style={styles.icon}
        />
      </TouchableOpacity>
    ),
    [isSearch]
  );

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
                withTitile={false}
                containerStyle={styles.searchContainer}
                textInputStyle={styles.searchInput}
                value={searchText}
                onChangeText={handleTextInputChange}
                placeholder={"Search"}
                onSubmitEditing={handlePresentModalPress}
                icon={searchIcon()}
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
    padding: 10,
  },
  searchInput: {
    paddingVertical: Platform.OS === "android" ? 3 : 0,
    fontSize: 14,
  },
  icon: {
    marginLeft: 5,
  },
});
