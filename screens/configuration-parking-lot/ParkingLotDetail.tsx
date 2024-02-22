import { View, StyleSheet } from "react-native";
import HeaderText from "../../components/text/HeaderText";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../../types";
import Colors from "../../constants/color";
import Body from "../../components/body/Body";
import IconButton from "../../components/button/IconButton";
import BodyText from "../../components/text/BodyText";
import SectionAppForm from "../../components/ui/SectionAppForm";
import BodyContainer from "../../components/ui/BodyContainer";

export type ParkingLotDetailProps = {} & NativeStackScreenProps<
  RootParamList,
  "ParkingLotDetail"
>;

const ParkingLotDetail: React.FC<ParkingLotDetailProps> = ({ navigation }) => {
  const handleRequestParkingSpacePress = () => {
    navigation.replace("ParkingLotsList");
  };

  return (
    <BodyContainer>
      <HeaderText
        text="PolSci's Parking building"
        textStyle={{ color: Colors.gray[900] }}
      />
      <View style={styles.buttonContainer}>
        <IconButton
          title={"Info"}
          icon={"information-outline"}
          onPress={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <IconButton
          title={"Plan"}
          icon={"floor-plan"}
          onPress={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <IconButton
          title={"Pricing"}
          icon={"bank"}
          onPress={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <IconButton
          title={"Role"}
          icon={"head-cog-outline"}
          onPress={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </View>
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
