import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import CustomBottomSheetModal from "../../components/bottomSheet/CustomBottomSheetModal";
import RangeInput from "../../components/input/RangeInput";
import TextInput from "../../components/input/TextInput";
import SubHeaderText from "../../components/text/SubHeaderText";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import ModalOverlay from "../../components/ui/ModalOverlay";
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
  const [showFilterOption, setShowFilterOption] = useState<boolean>(false);
  const [priceRange, setPriceRange] = React.useState<number[]>([20, 50]);

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
              <View style={styles.headerContainer}>
                <TextInput
                  containerStyle={styles.searchContainer}
                  value={searchText}
                  onChangeText={handleTextInputChange}
                  placeholder={"Search"}
                  onSubmitEditing={handlePresentModalPress}
                  icon={searchIcon()}
                />
                <TouchableOpacity onPress={() => setShowFilterOption(true)}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons
                      name="more-vert"
                      size={20}
                      color={Colors.gray[800]}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <ModalOverlay
                visible={showFilterOption}
                closeModal={() => setShowFilterOption(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.filterContainer}>
                    <View style={styles.closeContainer}>
                      <MaterialIcons
                        name="clear"
                        size={20}
                        color={Colors.gray[800]}
                      />
                    </View>
                    <SubHeaderText text="Filter options" />
                    <RangeInput
                      values={priceRange}
                      onChange={setPriceRange}
                      title="Parking fee (per hour)"
                      snapped
                      allowOverlap
                    />
                  </View>
                </View>
              </ModalOverlay>
              <CustomBottomSheetModal
                ref={bottomSheetRef}
                title="Recommended place"
              />
            </SafeAreaView>
          </View>
        </>
      ) : (
        <LoadingOverlay />
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  searchContainer: {
    flex: 1,
    padding: 10,
    marginBottom: 0,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 5,
  },
  icon: {
    marginLeft: 5,
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  filterContainer: {
    backgroundColor: Colors.white,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  closeContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
