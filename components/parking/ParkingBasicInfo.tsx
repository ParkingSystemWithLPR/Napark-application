import { StyleSheet, View } from "react-native";

import DetailText from "../text/DetailText";
import SectionAppForm from "../ui/SectionAppForm";

import Colors from "@/constants/color";
import { ParkingLot } from "@/types/parking-lot/ParkingLot";
import { formatAddress } from "@/utils/address";

export type ParkingBasicInfoProps = {
  parkingLot: ParkingLot;
};

const ParkingBasicInfo: React.FC<ParkingBasicInfoProps> = ({ parkingLot }) => {
  return (
    <>
      <SectionAppForm title={"Location"} icon={"google-maps"}>
        <DetailText
          textStyle={styles.text}
          text={formatAddress(parkingLot.address)}
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
    </>
  );
};

export default ParkingBasicInfo;

const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: Colors.gray[900],
  },
});
