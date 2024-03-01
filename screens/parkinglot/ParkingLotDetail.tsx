import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";

import IconButtonWithTitle from "../../components/button/IconButtonWithTitle";
import DetailText from "../../components/text/DetailText";
import HeaderText from "../../components/text/HeaderText";
import BodyContainer from "../../components/ui/BodyContainer";
import ImageContainer from "../../components/ui/ImageContainer";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import SectionAppForm from "../../components/ui/SectionAppForm";
import Colors from "../../constants/color";
import { useGetParkingLot } from "../../store/api/useGetParkingLotById";
import { useAuth } from "../../store/context/auth";
import { RootParamList } from "../../types";
import { mockParkingLot } from "../../types/parking-lot/mock";
import { ParkingLot } from "../../types/parking-lot/ParkingLot";
import { formatAddress } from "../../utils/address";

export type ParkingLotDetailProps = NativeStackScreenProps<
  RootParamList,
  "ParkingLotDetail"
>;

const ParkingLotDetail: React.FC<ParkingLotDetailProps> = ({ navigation }) => {
  const [parkingLot, setParkingLot] = useState<ParkingLot>(mockParkingLot);
  const [isLoading, setLoading] = useState<boolean>(true);
  const { accessToken, authenticate } = useAuth();

  const getParkingLot = useGetParkingLot({
    queryParams: { parkingLotId: "65db2487548c61ff2ee3f9e1" },
    auth: { accessToken, authenticate },
  });

  useLayoutEffect(() => {
    if (getParkingLot.data) {
      if (getParkingLot.data[0]) setParkingLot(getParkingLot.data[0]);
      setLoading(false);
    }
  }, [getParkingLot.data]);
  if(isLoading) return <LoadingOverlay message={"Loading..."} />;

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
              ...parkingLot.coord,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
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
              title={"Role"}
              icon={"head-cog-outline"}
              onPress={() => {
                navigation.navigate("OtherStack", { screen: "RoleList" });
              }}
            />
          </View>
          <SectionAppForm title={"Photos"} icon={"camera"}>
            <ImageContainer images={["image1", "image2"]} />
          </SectionAppForm>
          <SectionAppForm title={"Location"} icon={"google-maps"}>
            <DetailText
              textStyle={styles.text}
              text={formatAddress({
                address: parkingLot.address,
                sub_distict: parkingLot.sub_distict,
                distict: parkingLot.distict,
                province: parkingLot.province,
                zip_code: parkingLot.zip_code,
              })}
            />
          </SectionAppForm>
          <SectionAppForm title={"Traffic"} icon={"car"}>
            <View style={styles.textWrapper}>
              <DetailText text={"1st floor"} textStyle={styles.text} />
              <DetailText text={"20/20"} />
            </View>
            <View style={styles.textWrapper}>
              <DetailText text={"2st floor"} textStyle={styles.text} />
              <DetailText text={"19/20"} />
            </View>
            <View style={styles.textWrapper}>
              <DetailText text={"3st floor"} textStyle={styles.text} />
              <DetailText text={"20/20"} />
            </View>
            <View style={styles.textWrapper}>
              <DetailText text={"4st floor"} textStyle={styles.text} />
              <DetailText text={"11/12"} />
            </View>
          </SectionAppForm>
          <SectionAppForm title={"Business hours"} icon={"clock"}>
            <View style={styles.textWrapper}>
              <DetailText text={"Monday - Friday"} textStyle={styles.text} />
              <DetailText text={"06:30 - 23.59"} />
            </View>
          </SectionAppForm>
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
