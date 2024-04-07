import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import IconButtonWithTitle from "@/components/button/IconButtonWithTitle";
import ParkingBasicInfo from "@/components/parking/ParkingBasicInfo";
import HeaderText from "@/components/text/HeaderText";
import BodyContainer from "@/components/ui/BodyContainer";
import ImageContainer from "@/components/ui/ImageContainer";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import SectionAppForm from "@/components/ui/SectionAppForm";
import Colors from "@/constants/color";
import { useGetParkingLot } from "@/store/api/parking-lot/useGetParkingLotById";
import { useAuth } from "@/store/context/auth";
import { OtherStackParamList, AuthenticatedStackParamList } from "@/types";
import { ParkingLot } from "@/types/parking-lot";

export type ParkingLotDetailProps = CompositeScreenProps<
  NativeStackScreenProps<OtherStackParamList, "ParkingLotDetail">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const ParkingLotDetail: React.FC<ParkingLotDetailProps> = ({
  navigation,
  route,
}) => {
  const parkingLotId = route.params.parkingLotId;
  const [parkingLot, setParkingLot] = useState<ParkingLot>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const { accessToken, authenticate } = useAuth();

  const getParkingLot = useGetParkingLot({
    queryParams: { parkingLotId },
    auth: { accessToken, authenticate },
  });

  useLayoutEffect(() => {
    if (getParkingLot.data) {
      setParkingLot(getParkingLot.data);
      setLoading(false);
    }
  }, [getParkingLot.data]);
  if (isLoading) return <LoadingOverlay message={"Loading..."} />;

  if (!parkingLot) return <></>;

  return (
    <BodyContainer innerContainerStyle={styles.bodyContainer}>
      <ScrollView overScrollMode="never">
        <View style={styles.bodyContainer}>
          <HeaderText
            text={parkingLot.name}
            textStyle={{ color: Colors.gray[900], fontSize: 24 }}
          />
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: parkingLot.coord.latitude,
              longitude: parkingLot.coord.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            provider={PROVIDER_GOOGLE}
            zoomEnabled
          >
            <Marker
              coordinate={{
                latitude: parkingLot.coord.latitude,
                longitude: parkingLot.coord.longitude,
              }}
              title="Your Parking Space Location"
            />
          </MapView>
          <View style={styles.buttonContainer}>
            <IconButtonWithTitle
              title={"Info"}
              icon={"information-outline"}
              onPress={() => {}}
            />
            <IconButtonWithTitle
              title={"Plan"}
              icon={"floor-plan"}
              onPress={() => {}}
            />
            <IconButtonWithTitle
              title={"Pricing"}
              icon={"bank"}
              onPress={() => {}}
            />
            <IconButtonWithTitle
              title={"Config"}
              icon={"account-settings"}
              onPress={() => {
                navigation.navigate("OtherStack", {
                  screen: "ManagingCategory",
                });
              }}
            />
          </View>
          {parkingLot.images && (
            <SectionAppForm title={"Photos"} icon={"camera"}>
              <ImageContainer imageUrls={parkingLot.images} />
            </SectionAppForm>
          )}
          <ParkingBasicInfo parkingLot={parkingLot} />
        </View>
      </ScrollView>
    </BodyContainer>
  );
};

export default ParkingLotDetail;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 8,
    paddingTop: 8,
    paddingBottom: 20,
    gap: 15,
    paddingLeft: -10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[300],
  },
  bodyContainer: {
    gap: 10,
    paddingBottom: 15,
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
    borderColor: Colors.red[400],
    height: 130,
  },
});
