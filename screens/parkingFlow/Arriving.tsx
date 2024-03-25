import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useLayoutEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Platform } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { Attribute } from "../booking/BookingSummary";
import { RegionType } from "../landing/Landing";

import BodyText from "@/components/text/BodyText";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import Colors from "@/constants/color";
import {
  AuthenticatedStackParamList,
  ParkingFlowStackParamList,
} from "@/types";
import { formatHumanReadableDateFromDateString } from "@/utils/date";

export type ArrivingProps = CompositeScreenProps<
  NativeStackScreenProps<ParkingFlowStackParamList, "Arriving">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;
const Arriving: React.FC<ArrivingProps> = ({ route }) => {
  const [region, setRegion] = useState<RegionType>();
  const { bookingRequest, parkingLot } = route.params;
  useLayoutEffect(() => {
    getLocation();
  }, [parkingLot]);

  const getLocation = () => {
    const { latitude, longitude } = parkingLot.coord;
    setRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const renderAttribute = useCallback(({ attribute, value }: Attribute) => {
    return (
      <View style={styles.attributeContainer}>
        <BodyText
          text={attribute + ":"}
          containerStyle={styles.attributeField}
          textStyle={styles.attributeTextColor}
        />
        <BodyText text={value ?? ""} containerStyle={styles.valueField} />
      </View>
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {region ? (
        <>
          <MapView
            style={styles.map}
            initialRegion={region}
            provider={PROVIDER_GOOGLE}
          ></MapView>
          <View style={{ position: "absolute", width: "100%" }}>
            <SafeAreaView>
              <View
                style={{
                  paddingHorizontal: 20,
                  marginTop: 20,
                }}
              >
                <View style={styles.locationContainer}>
                  <BodyText
                    text={parkingLot.name}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    containerStyle={styles.locationTextContainer}
                  />
                  <MaterialIcons
                    name="location-pin"
                    size={25}
                    style={styles.pin}
                  />
                </View>
              </View>
            </SafeAreaView>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              width: "100%",
              height: "50%",
            }}
          >
            <View style={styles.bookingDetailContainer}>
              <BodyText
                text="Parking Details"
                containerStyle={styles.headerStyle}
              />
              {renderAttribute({
                attribute: "Space",
                value: bookingRequest.slot,
              })}
              {renderAttribute({
                attribute: "Check-in Date",
                value:
                  bookingRequest.checkInDate &&
                  formatHumanReadableDateFromDateString(
                    bookingRequest.checkInDate
                  ),
              })}
              {renderAttribute({
                attribute: "Check-in Time",
                value: bookingRequest.checkInTime,
              })}
              {renderAttribute({
                attribute: "Check-out Date (Est)",
                value:
                  bookingRequest.checkOutDate &&
                  formatHumanReadableDateFromDateString(
                    bookingRequest.checkOutDate
                  ),
              })}
              {renderAttribute({
                attribute: "Check-out Time (Est)",
                value: bookingRequest.checkOutTime,
              })}
            </View>
          </View>
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
  locationSection: {
    flex: 1,
    justifyContent: "center",
  },
  locationContainer: {
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: Platform.OS === "android" ? 4 : 2,
    flex: 1,
  },
  locationTextContainer: { flex: 1, marginHorizontal: 5 },
  pin: {
    marginHorizontal: 5,
    color: Colors.red[400],
  },
  bookingDetailSection: {
    flex: 5,
    gap: 15,
  },
  bookingDetailContainer: {
    flex: 1,
    margin: 20,
    backgroundColor: Colors.white,
    borderRadius: 5,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: Platform.OS === "android" ? 4 : 2,
  },
  headerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  attributeContainer: {
    flex: 1,
    flexDirection: "row",
  },
  attributeField: {
    flex: 4,
    marginLeft: 10,
  },
  attributeTextColor: {
    color: Colors.gray[800],
  },
  valueField: {
    flex: 2,
  },
});
