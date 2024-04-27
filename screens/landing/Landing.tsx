import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { isAfter, isBefore } from "date-fns";
import * as Location from "expo-location";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import CustomBottomSheetModal from "@/components/bottomSheet/CustomBottomSheetModal";
import PrimaryButton from "@/components/button/PrimaryButton";
import ParkingSpaceCard from "@/components/card/ParkingSpaceCard";
import RangeInput from "@/components/input/RangeInput";
import ParkingBasicInfo from "@/components/parking/ParkingBasicInfo";
import StatusDetail from "@/components/parking/StatusDetail";
import BodyText from "@/components/text/BodyText";
import SubHeaderText from "@/components/text/SubHeaderText";
import ImageContainer from "@/components/ui/ImageContainer";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import ModalOverlay from "@/components/ui/ModalOverlay";
import Colors from "@/constants/color";
import { ParkingLotStatus } from "@/enum/ParkingLot";
import { GG_PLACE_API_KEY } from "@/store/api/google-maps/place";
import { useGetParkingSpacesByLatLong } from "@/store/api/parking-lot/useGetNearParkingLotByPostalCodeAndLatLong";
import { useAuth } from "@/store/context/auth";
import {
  AuthenticatedStackParamList,
  MainPageBottomTabParamList,
} from "@/types";
import { ParkingLot } from "@/types/parking-lot";
import { estimateDistance } from "@/utils/address";
import { getBusinessHours, getDateFromTime, getDayInAWeek } from "@/utils/date";

export type LandingProps = CompositeScreenProps<
  NativeStackScreenProps<MainPageBottomTabParamList, "Landing">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

export type RegionType = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const Landing: React.FC<LandingProps> = ({ navigation }) => {
  const recommendedBottomSheetRef = useRef<BottomSheetModal>(null);
  const parkingSpaceDetailBottomSheetRef = useRef<BottomSheetModal>(null);
  const searchInputRef = useRef<GooglePlacesAutocompleteRef>(null);
  const { accessToken, authenticate } = useAuth();

  const { dismissAll } = useBottomSheetModal();

  const [region, setRegion] = useState<RegionType>();
  const [showFilterOption, setShowFilterOption] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<number[]>([20, 50]);
  const [parkingSpaces, setParkingSpaces] = useState<ParkingLot[]>();
  const [selectedParkingSpace, setSelectedParkingSpace] =
    useState<ParkingLot>();
  const [postalCode, setPostalCode] = useState<string>();

  const getParkingSpaces = useGetParkingSpacesByLatLong({
    queryParams: {
      postal_code: postalCode,
      lat: region?.latitude,
      long: region?.longitude,
    },
    auth: { accessToken, authenticate },
  });

  useLayoutEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (getParkingSpaces.isSuccess) {
      setParkingSpaces(getParkingSpaces.data);
    }
  }, [getParkingSpaces.data]);

  useEffect(() => {
    if (selectedParkingSpace)
      parkingSpaceDetailBottomSheetRef.current?.present();
  }, [selectedParkingSpace]);

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

  const handleChooseParkingSpace = (parkingSpace: ParkingLot) => {
    setSelectedParkingSpace(parkingSpace);
  };

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.headerContainer}>
        <GooglePlacesAutocomplete
          ref={searchInputRef}
          placeholder="Search"
          GooglePlacesDetailsQuery={{ fields: "address_components,geometry" }}
          query={{
            key: GG_PLACE_API_KEY,
            language: "th",
            components: "country:th",
          }}
          fetchDetails={true}
          onPress={(data, details = null) => {
            if (details) {
              const postalCode = details.address_components.find((component) =>
                component.types.includes("postal_code")
              )?.long_name;
              const { lat, lng } = details.geometry.location;
              setRegion({
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.0522,
                longitudeDelta: 0.0121,
              });
              setPostalCode(postalCode);
              recommendedBottomSheetRef.current?.present();
            }
          }}
          textInputProps={{
            autoCorrect: false,
            onChangeText: (text: string) => {
              if (text.length === 0) {
                searchInputRef.current?.blur();
                dismissAll();
              } else {
                recommendedBottomSheetRef.current?.present();
              }
            },
          }}
        />
        {/* <TouchableOpacity onPress={() => setShowFilterOption(true)}>
          <View style={styles.iconContainer}>
            <MaterialIcons
              name="more-vert"
              size={20}
              color={Colors.gray[800]}
            />
          </View>
        </TouchableOpacity> */}
      </View>
    );
  }, []);

  const renderfilterOptionsModal = useCallback(() => {
    return (
      <ModalOverlay
        visible={showFilterOption}
        closeModal={() => setShowFilterOption(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.filterContainer}>
            <View style={styles.closeContainer}>
              <MaterialIcons name="clear" size={20} color={Colors.gray[800]} />
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
    );
  }, [showFilterOption]);

  const renderRecommendedParkingSpaces = useCallback(() => {
    return (
      <CustomBottomSheetModal
        ref={recommendedBottomSheetRef}
        title="Recommended place"
        startIndex={0}
      >
        {parkingSpaces && parkingSpaces.length > 0 ? (
          <FlatList
            data={parkingSpaces}
            renderItem={({ item }) => {
              const businessDay = item.business_days.find((businessday) => {
                return businessday.weekday == getDayInAWeek(new Date());
              });
              return (
                <ParkingSpaceCard
                  parkingSpaceName={item.name}
                  parkingImage={item.images[0]}
                  businessHours={
                    businessDay
                      ? getBusinessHours(businessDay)
                      : "Not available"
                  }
                  availabilty={item.available_slots_count ?? 0}
                  onPress={() => handleChooseParkingSpace(item)}
                />
              );
            }}
            overScrollMode="never"
          />
        ) : (
          <BodyText
            text="Sorry! There is no parking space nearby the destination 🥹"
            containerStyle={{
              padding: 10,
              alignItems: "center",
            }}
          />
        )}
      </CustomBottomSheetModal>
    );
  }, [recommendedBottomSheetRef, parkingSpaces]);

  const renderParkingSpaceDetail = useCallback(() => {
    if (selectedParkingSpace) {
      const now = new Date();
      const businessDay = selectedParkingSpace.business_days.find(
        (businessday) => businessday.weekday === getDayInAWeek(now)
      );
      const isOpen =
        isAfter(now, getDateFromTime(businessDay?.open_time)) &&
        isBefore(now, getDateFromTime(businessDay?.close_time));
      const availableSlotsCount = selectedParkingSpace.available_slots_count;
      const totalSlots = selectedParkingSpace.slots.length;
      const trafficPercentage =
        isNaN(availableSlotsCount) || isNaN(totalSlots) || totalSlots === 0
          ? 0
          : Math.floor(((totalSlots - availableSlotsCount) * 100) / totalSlots);
      return (
        <CustomBottomSheetModal
          ref={parkingSpaceDetailBottomSheetRef}
          title={selectedParkingSpace.name}
          modalContainerStyle={styles.parkingDetailContainer}
          onDismiss={() => setSelectedParkingSpace(undefined)}
        >
          <PrimaryButton
            title="Book"
            onPress={() => {
              searchInputRef.current?.setAddressText("");
              dismissAll();
              navigation.navigate("BookingsStack", {
                screen: "BookingDetail",
                params: { parkingLot: selectedParkingSpace },
              });
            }}
          />
          <ScrollView
            contentContainerStyle={styles.informationContainer}
            overScrollMode="never"
          >
            <View style={styles.statusContainer}>
              <StatusDetail
                title="Status"
                value={isOpen ? ParkingLotStatus.OPEN : ParkingLotStatus.CLOSE}
                bodyTextStyle={{
                  color: isOpen ? Colors.green[700] : Colors.red[400],
                }}
              />
              <View style={styles.verticalSeparator}></View>
              <StatusDetail
                title="Traffic"
                value={`${trafficPercentage}% (${availableSlotsCount} slots left)`}
                bodyTextStyle={{
                  color:
                    trafficPercentage < 80
                      ? Colors.green[700]
                      : Colors.red[400],
                }}
              />
              <View style={styles.verticalSeparator}></View>
              <StatusDetail
                title="Distance"
                value={`${estimateDistance(
                  {
                    latitude: region?.latitude ?? 0,
                    longitude: region?.longitude ?? 0,
                  },
                  selectedParkingSpace.coord
                )} km`}
              />
            </View>
            <View style={styles.horizontalSeparator}></View>
            <View>
              <ImageContainer images={selectedParkingSpace.images} />
            </View>
            <View style={styles.horizontalSeparator}></View>
            <View>
              <ParkingBasicInfo parkingLot={selectedParkingSpace} />
            </View>
          </ScrollView>
        </CustomBottomSheetModal>
      );
    }
  }, [parkingSpaceDetailBottomSheetRef, selectedParkingSpace]);

  return (
    <View style={styles.container}>
      {region ? (
        <>
          <MapView
            style={styles.map}
            initialRegion={region}
            region={region}
            provider={PROVIDER_GOOGLE}
          >
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              title="Your Location"
              pinColor={Colors.blue[600].toString()}
              style={{ zIndex: 1 }}
            >
              <Image
                source={require("../../assets/images/destination-pin.png")}
              />
            </Marker>
            {parkingSpaces &&
              parkingSpaces.map((parkingSpace: ParkingLot) => (
                <Marker
                  key={parkingSpace._id}
                  coordinate={{
                    latitude: parkingSpace.coord.latitude,
                    longitude: parkingSpace.coord.longitude,
                  }}
                  title={parkingSpace.name}
                  onPress={() => handleChooseParkingSpace(parkingSpace)}
                  style={{ zIndex: 0 }}
                >
                  <Image
                    source={require("../../assets/images/parking-space-pin.png")}
                  />
                </Marker>
              ))}
          </MapView>
          <View style={{ position: "absolute", width: "100%" }}>
            <SafeAreaView>
              {renderHeader()}
              {renderfilterOptionsModal()}
              {renderRecommendedParkingSpaces()}
              {renderParkingSpaceDetail()}
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
    alignItems: "flex-start",
    marginHorizontal: 10,
    flex: 1,
  },
  iconContainer: {
    paddingTop: 12,
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
  parkingDetailContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
    gap: 10,
    justifyContent: "space-between",
  },
  informationContainer: {
    gap: 20,
  },
  statusContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  verticalSeparator: {
    height: "100%",
    width: 1,
    backgroundColor: Colors.gray[800],
  },
  horizontalSeparator: {
    height: 1,
    width: "100%",
    backgroundColor: Colors.gray[800],
  },
});
