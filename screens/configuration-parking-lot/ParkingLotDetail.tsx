import { View, StyleSheet, ScrollView } from "react-native";
import HeaderText from "../../components/text/HeaderText";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../../types";
import Colors from "../../constants/color";
import BodyText from "../../components/text/BodyText";
import SectionAppForm from "../../components/ui/SectionAppForm";
import BodyContainer from "../../components/ui/BodyContainer";
import IconButtonWithTitle from "../../components/button/IconButtonWithTitle";
import MapView, { Marker } from "react-native-maps";
import { mockParkingLot } from "./mock";
import ImageContainer from "../../components/ui/ImageContainer";
import { getParkingLots } from "../../store/api/useGetParkingLots";

export type ParkingLotDetailProps = {} & NativeStackScreenProps<
  RootParamList,
  "ParkingLotDetail"
>;

const ParkingLotDetail: React.FC<ParkingLotDetailProps> = ({ navigation }) => {

  return (
    <BodyContainer innerContainerStyle={styles.bodyContainer}>
      <ScrollView>
        <View style={styles.bodyContainer}>
          <HeaderText
            text="PolSci's Parking building"
            textStyle={{ color: Colors.gray[900] }}
          />
          <MapView style={{ borderWidth: 1, borderColor: Colors.red[400], height: 130  }} initialRegion={mockParkingLot.Region} zoomEnabled>
            <Marker
              coordinate={{
                latitude: mockParkingLot.Region.latitude,
                longitude: mockParkingLot.Region.longitude,
              }}
              title="Your Parking Space Location"
            />
          </MapView>
          <View style={styles.buttonContainer}>
            <IconButtonWithTitle
              title={"Info"}
              icon={"information-outline"}
              onPress={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
            <IconButtonWithTitle
              title={"Plan"}
              icon={"floor-plan"}
              onPress={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
            <IconButtonWithTitle
              title={"Pricing"}
              icon={"bank"}
              onPress={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
            <IconButtonWithTitle
              title={"Role"}
              icon={"head-cog-outline"}
              onPress={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </View>
          <SectionAppForm title={"Photos"} icon={"camera"}>
            <ImageContainer images={['1', '2']}/>
          </SectionAppForm>
          <SectionAppForm title={"Location"} icon={"google-maps"}>
            <BodyText
              text={
                "888 ซอย ประชาอุทิศ 91 ถนน ประชาอุทิศ แขวง ทุ่งครุ เขต ทุ่งครุ กรุงเทพ 10140"
              }
            />
          </SectionAppForm>
          <SectionAppForm title={"Traffic"} icon={"car"}>
            <View style={styles.textWrapper}>
              <BodyText text={"1st floor"} />
              <BodyText text={"20/20"} />
            </View>
            <View style={styles.textWrapper}>
              <BodyText text={"2st floor"} />
              <BodyText text={"19/20"} />
            </View>
            <View style={styles.textWrapper}>
              <BodyText text={"3st floor"} />
              <BodyText text={"20/20"} />
            </View>
            <View style={styles.textWrapper}>
              <BodyText text={"4st floor"} />
              <BodyText text={"11/12"} />
            </View>
          </SectionAppForm>
          <SectionAppForm title={"Business hours"} icon={"clock"}>
            <View style={styles.textWrapper}>
              <BodyText text={"Monday - Friday"} />
              <BodyText text={"06:30 - 23.59"} />
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
    paddingVertical: 8,
    gap: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bodyContainer: {
    gap: 10,
  },
  textWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
